export const capitalize = (text: string) => {
  return text
    .split(' ')
    .map((node) => node[0].toUpperCase() + node.slice(1).toLowerCase())
    .join(' ')
}
