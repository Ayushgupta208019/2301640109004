import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  IconButton, TextField, Stack, Button, Alert, Tooltip, Paper, Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { validateBatch } from '../utils/validation'

const emptyRow = () => ({ longUrl: '', minutes: '', code: '' })

export default function UrlTable({ onSubmit }) {
  const [rows, setRows] = useState([emptyRow()])
  const [error, setError] = useState(null)

  const addRow = () => { if (rows.length < 5) setRows(r => [...r, emptyRow()]) }
  const removeRow = (i) => setRows(r => r.length === 1 ? r : r.filter((_, idx) => idx !== i))

  const update = (i, field, value) => {
    setRows(r => r.map((row, idx) => idx === i ? { ...row, [field]: value } : row))
  }

  const submit = (e) => {
    e.preventDefault()
    const { ok, message, payload } = validateBatch(rows)
    if (!ok) {
      setError(message)
      return
    }
    setError(null)
    onSubmit(payload)
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }} component="form" onSubmit={submit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="subtitle1">You can shorten up to 5 URLs at once.</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Long URL *</TableCell>
              <TableCell width={160}>Validity (min)</TableCell>
              <TableCell width={200}>Custom Shortcode</TableCell>
              <TableCell align="right">
                <Tooltip title="Add row">
                  <span>
                    <IconButton onClick={addRow} disabled={rows.length >= 5}><AddIcon /></IconButton>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>
                  <TextField
                    value={r.longUrl}
                    onChange={e => update(i, 'longUrl', e.target.value)}
                    placeholder="https://example.com/some/very/long/link"
                    fullWidth size="small" required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={r.minutes}
                    onChange={e => update(i, 'minutes', e.target.value)}
                    placeholder="(default 30)"
                    type="number" inputProps={{ min: 1 }}
                    fullWidth size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={r.code}
                    onChange={e => update(i, 'code', e.target.value)}
                    placeholder="optional, a-z A-Z 0-9 - _"
                    fullWidth size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Remove row">
                    <span>
                      <IconButton onClick={() => removeRow(i)} disabled={rows.length === 1}><DeleteIcon /></IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained">Shorten</Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
