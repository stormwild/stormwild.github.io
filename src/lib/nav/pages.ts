export interface Page {
  href: string
  text: string
  subpages: Page[]
}

export const pages = [
  {
    href: '/',
    text: 'Home',
    subpages: [],
  },
  {
    href: '/profile',
    text: 'Profile',
    subpages: [],
  },
  {
    href: '/blog',
    text: 'Blog',
    subpages: [],
  },
]
