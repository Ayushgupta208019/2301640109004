// Simple logging middleware (no console).
// Stores logs in localStorage under __affordmed_logs and exposes a tiny API.
// Replace this with your Pre-Test logging middleware if you already have one.
const KEY = '__affordmed_logs'

function save(entry) {
  try {
    const logs = JSON.parse(localStorage.getItem(KEY) || '[]')
    logs.push({ ...entry, at: Date.now() })
    localStorage.setItem(KEY, JSON.stringify(logs))
  } catch (_) {}
}

const Logger = {
  log(type, payload) { save({ level: 'info', type, payload }) },
  warn(type, payload) { save({ level: 'warn', type, payload }) },
  error(type, payload) { save({ level: 'error', type, payload }) },
  getAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
  },
  clear() { localStorage.removeItem(KEY) }
}

export default Logger
