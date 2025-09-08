import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Affordmed URL Shortener
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            disabled={pathname === '/'}
          >
            Shorten
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/stats"
            disabled={pathname === '/stats'}
          >
            Stats
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>{children}</Container>
      <Box component="footer" sx={{ textAlign: 'center', py: 2, opacity: 0.7 }}>
        <Typography variant="caption">Runs on http://localhost:3000 • MUI only • No console logs</Typography>
      </Box>
    </Box>
  )
}
