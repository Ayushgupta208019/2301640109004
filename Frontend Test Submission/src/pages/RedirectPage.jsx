import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Alert, CircularProgress, Stack, Typography, Button } from '@mui/material'
import urlService from '../services/url.service'
import analytics from '../services/analytics.service'
import Logger from '../services/logger'

export default function RedirectPage() {
  const { code } = useParams()
  const [status, setStatus] = useState('loading') // loading | ok | expired | missing
  const [target, setTarget] = useState(null)

  useEffect(() => {
    const rec = urlService.findByCode(code)
    if (!rec) {
      setStatus('missing')
      Logger.warn('REDIRECT_NOT_FOUND', { code })
      return
    }
    const now = Date.now()
    if (now > rec.expiresAt) {
      setStatus('expired')
      Logger.warn('REDIRECT_EXPIRED', { code })
      return
    }
    setTarget(rec.longUrl)
    setStatus('ok')
    // Fire-and-forget click logging, then redirect
    analytics.trackClick(rec.code).finally(() => {
      window.location.replace(rec.longUrl)
    })
  }, [code])

  if (status === 'loading') {
    return <Stack alignItems="center" spacing={2}><CircularProgress /><Typography>Redirecting...</Typography></Stack>
  }

  if (status === 'expired') {
    return (
      <Alert severity="warning" action={<Button component={RouterLink} to="/">Create new</Button>}>
        This short link has expired.
      </Alert>
    )
  }

  if (status === 'missing') {
    return (
      <Alert severity="error" action={<Button component={RouterLink} to="/">Back</Button>}>
        Sorry, no such short URL exists.
      </Alert>
    )
  }

  return null
}
