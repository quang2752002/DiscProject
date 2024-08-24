export function formatDate(date: Date, type: number = 1): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')
  if (type == 1) return `${year}-${month}-${day}`
  return `${month}/${day}/${year}`
}
