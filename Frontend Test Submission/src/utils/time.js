export function minutesFromNow(min) {
  const now = Date.now()
  return now + min * 60 * 1000
}
export function formatDateTime(ms) {
  try {
    return new Date(ms).toLocaleString()
  } catch { return '-' }
}
