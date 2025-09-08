const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export function encode(num) {
  if (num === 0) return '0'
  let s = ''
  while (num > 0) {
    s = chars[num % 62] + s
    num = Math.floor(num / 62)
  }
  return s
}
export function randomCode(len = 6) {
  let s = ''
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)]
  }
  return s
}
