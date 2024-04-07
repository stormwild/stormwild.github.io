import type { NavItem } from '@lib/nav/nav-item'
import { isDropdown } from './helpers'

// if (isDropdown(navItem)) {
//   classes.push('dropdown')
// }

export const clsx = (classes: string[] = []) => classes.join(' ')
