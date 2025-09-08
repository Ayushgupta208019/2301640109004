import React from 'react'
import { Stack, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material'
import urlService from '../services/url.service'
import { formatDateTime } from '../utils/time'

export default function StatsPage() {
  const data = urlService.listAll().sort((a,b) => b.createdAt - a.createdAt)

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Short URLs (this browser)</Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Short</TableCell>
              <TableCell>Long URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.code}>
                <TableCell>
                  <a href={`/${r.code}`}>{window.location.origin}/{r.code}</a>
                </TableCell>
                <TableCell style={{ maxWidth: 360, overflowWrap: 'anywhere' }}>{r.longUrl}</TableCell>
                <TableCell>{formatDateTime(r.createdAt)}</TableCell>
                <TableCell>{formatDateTime(r.expiresAt)}</TableCell>
                <TableCell>
                  <Chip label={r.clicks} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6">Click details</Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Location (coarse)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.flatMap(r => r.clicksDetail.map((c, i) => (
              <TableRow key={r.code + '_' + i}>
                <TableCell>{r.code}</TableCell>
                <TableCell>{formatDateTime(c.ts)}</TableCell>
                <TableCell>{c.source || 'direct'}</TableCell>
                <TableCell>
                  {c.geo ? `${c.geo.lat.toFixed(3)}, ${c.geo.lng.toFixed(3)}` : 'unknown'}
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  )
}
