export function getItem(key, defaultValue) {
  const value = localStorage.getItem(key)
  if (value === null) { return defaultValue }
  return JSON.parse(value)
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
