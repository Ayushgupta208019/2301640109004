import React from 'react'
import { Card, CardContent, Typography, Stack, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { formatDateTime } from '../utils/time'
import Logger from '../services/logger'

export default function UrlResultCard({ record }) {
  const shortUrl = `${window.location.origin}/${record.code}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      Logger.log('COPY_SHORT_URL', { code: record.code })
      alert('Copied!') // Using alert, not console
    } catch (e) {
      Logger.error('COPY_FAILED', { message: e?.message })
      alert('Copy failed')
    }
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Original</Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{record.longUrl}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8, mt: 1 }}>Short URL</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>{shortUrl}</Typography>
            <Tooltip title="Copy">
              <IconButton onClick={copy} size="small"><ContentCopyIcon fontSize="inherit" /></IconButton>
            </Tooltip>
          </Stack>
          <Typography variant="body2">Expires: {formatDateTime(record.expiresAt)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
