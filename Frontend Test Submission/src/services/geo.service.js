async function getCoarseLocation(timeout = 3000) {
  if (!('geolocation' in navigator)) return null
  return new Promise((resolve) => {
    const done = (value) => resolve(value || null)
    navigator.geolocation.getCurrentPosition(
      pos => done({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      _err => done(null),
      { enableHighAccuracy: false, timeout, maximumAge: 5 * 60 * 1000 }
    )
  })
}

export default { getCoarseLocation }
