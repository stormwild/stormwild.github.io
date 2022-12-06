import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import HomeIcon from '@mui/icons-material/Home'
import { ReactNode, useState } from 'react'
import Head from 'next/head'

interface LayoutProps {
  children?: ReactNode
  title: string
}

export function Layout({ title, children }: LayoutProps) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{title} - Stormwild</title>
        <meta name='description' content='Stormwild (Alexander R. Torrijos)' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => {
              setOpen(true)
              console.log({ open })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>Stormwild</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: 1,
            paddingBottom: 1,
            paddingRight: 1,
          }}
        >
          <IconButton
            onClick={() => {
              setOpen(false)
              console.log({ open })
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Container component='main' sx={{ mt: 8 }}>
        {children}
      </Container>
    </>
  )
}

export default Layout
