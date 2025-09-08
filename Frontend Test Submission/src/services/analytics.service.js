import urlService from './url.service'
import geo from './geo.service'
import Logger from './logger'

async function trackClick(code) {
  const source = document.referrer || 'direct'
  let geoData = null
  try {
    geoData = await geo.getCoarseLocation(2000)
  } catch (_) {}
  urlService.registerClick(code, { source, geo: geoData || undefined })
  Logger.log('TRACK_CLICK', { code })
}

export default { trackClick }
