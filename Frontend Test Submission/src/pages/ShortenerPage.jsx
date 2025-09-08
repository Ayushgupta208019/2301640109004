import React, { useState } from 'react'
import { Stack, Typography, Divider } from '@mui/material'
import UrlTable from '../components/UrlTable'
import UrlResultCard from '../components/UrlResultCard'
import urlService from '../services/url.service'
import Logger from '../services/logger'

export default function ShortenerPage() {
  const [results, setResults] = useState([])

  const handleSubmit = async (batch) => {
    const created = []
    for (const item of batch) {
      try {
        const rec = await urlService.createShortUrl(item)
        created.push(rec)
        Logger.log('CREATE_SHORT_URL_OK', { code: rec.code })
      } catch (e) {
        Logger.error('CREATE_SHORT_URL_FAIL', { message: e?.message })
        alert(e?.message || 'Something went wrong') // friendly message
      }
    }
    setResults(created)
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Create short links</Typography>
      <UrlTable onSubmit={handleSubmit} />
      {results.length > 0 && (
        <>
          <Divider />
          <Typography variant="h6">Result</Typography>
          <Stack spacing={2}>
            {results.map(r => <UrlResultCard key={r.code} record={r} />)}
          </Stack>
        </>
      )}
    </Stack>
  )
}
