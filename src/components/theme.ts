import createCache from '@emotion/cache'
import { createTheme } from '@mui/material'

export const emotionCache = createCache({
  key: 'css',
  prepend: true,
})

const theme = createTheme({})

export default theme
