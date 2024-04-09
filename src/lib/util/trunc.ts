export const trunc = (str: string, max: number) =>
  str.length > max ? `${str.slice(0, max)}...` : str
