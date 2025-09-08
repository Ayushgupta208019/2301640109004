import storage from './storage'
import { minutesFromNow } from '../utils/time'
import { randomCode } from '../utils/base62'
import Logger from './logger'

// URL record shape:
// {
//   code, longUrl, createdAt, expiresAt, clicks, clicksDetail: [{ ts, source, geo? }]
// }

function loadAll() {
  const all = storage.load()
  // purge expired silently
  const now = Date.now()
  const keep = all.filter(r => r.expiresAt > now)
  if (keep.length !== all.length) {
    storage.save(keep)
    Logger.log('PURGED_EXPIRED', { removed: all.length - keep.length })
  }
  return keep
}

function saveAll(arr) { storage.save(arr) }

function isCodeUnique(code) {
  return !loadAll().some(r => r.code === code)
}

function listAll() { return loadAll() }

function findByCode(code) {
  return loadAll().find(r => r.code === code)
}

async function createShortUrl({ longUrl, minutes = 30, code }) {
  // validate & generate
  let finalCode = code
  if (!finalCode) {
    // try up to 5 times to avoid collision
    for (let i = 0; i < 5; i++) {
      const c = randomCode(6)
      if (isCodeUnique(c)) { finalCode = c; break }
    }
    if (!finalCode) throw new Error('Could not allocate a unique shortcode. Please try again.')
  } else {
    if (!isCodeUnique(finalCode)) {
      throw new Error('Shortcode already in use. Please choose another.')
    }
  }

  const rec = {
    code: finalCode,
    longUrl,
    createdAt: Date.now(),
    expiresAt: minutesFromNow(minutes),
    clicks: 0,
    clicksDetail: []
  }
  const all = loadAll()
  all.push(rec)
  saveAll(all)
  Logger.log('CREATE_SHORT_URL', { code: rec.code, minutes })
  return rec
}

function registerClick(code, detail) {
  const all = loadAll()
  const idx = all.findIndex(r => r.code === code)
  if (idx === -1) return
  const r = all[idx]
  r.clicks += 1
  r.clicksDetail.push({ ts: Date.now(), ...detail })
  all[idx] = r
  saveAll(all)
  Logger.log('CLICK_TRACKED', { code })
}

const urlService = { listAll, findByCode, createShortUrl, registerClick, isCodeUnique }
export default urlService
