import type { NavItem } from '@lib/nav/nav-item'

export const isDropdown = (navItem: NavItem): boolean => {
  return navItem.subpages.length > 0
}

export const isActive = (navItem: NavItem, path: string): boolean => {
  return navItem.href === path
}
