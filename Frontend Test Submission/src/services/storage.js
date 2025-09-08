// LocalStorage wrapper with JSON parse/stringify + namespacing
const NS = '__affordmed_url_records'

const storage = {
  load() {
    try { return JSON.parse(localStorage.getItem(NS) || '[]') } catch { return [] }
  },
  save(arr) {
    localStorage.setItem(NS, JSON.stringify(arr))
  }
}

export default storage
