import React from 'react'
import { Alert, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Alert severity="info" action={<Button component={RouterLink} to="/">Home</Button>}>
      Page not found.
    </Alert>
  )
}
