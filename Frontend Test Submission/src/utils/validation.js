import Logger from '../services/logger'

const CODE_RE = /^[a-zA-Z0-9_-]{3,20}$/
function isValidUrl(value) {
  try { new URL(value); return true } catch { return false }
}

export function validateBatch(rows) {
  // rows: [{ longUrl, minutes, code }]
  const cleaned = []
  const seenCodes = new Set()
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    if (!r.longUrl) continue // skip empty rows
    if (!isValidUrl(r.longUrl)) {
      Logger.warn('VALIDATION_BAD_URL', { row: i })
      return { ok: false, message: `Row ${i+1}: Invalid URL format.` }
    }
    let minutes = 30
    if (r.minutes !== '' && r.minutes !== undefined) {
      const n = Number(r.minutes)
      if (!Number.isInteger(n) || n <= 0) {
        return { ok: false, message: `Row ${i+1}: Validity must be a positive integer (minutes).` }
      }
      minutes = n
    }
    let code = r.code?.trim()
    if (code) {
      if (!CODE_RE.test(code)) {
        return { ok: false, message: `Row ${i+1}: Shortcode must be 3-20 chars (a-z, A-Z, 0-9, '-', '_').` }
      }
      if (seenCodes.has(code)) {
        return { ok: false, message: `Row ${i+1}: Duplicate shortcode in this batch.` }
      }
      seenCodes.add(code)
    }
    cleaned.push({ longUrl: r.longUrl.trim(), minutes, code })
  }
  if (cleaned.length === 0) return { ok: false, message: 'Please fill at least one URL.' }
  return { ok: true, payload: cleaned }
}
