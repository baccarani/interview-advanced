const colors = [
  'rgba(69, 123, 157, 0.5)', //blue
  'rgba(230, 57, 70, 0.5)', //red
  'rgba(88, 129, 87, 0.5)', //green
]

export const getColor = (index: number) => {
  return colors[index % colors.length]
}
