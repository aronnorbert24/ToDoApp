export function formatDate(formattingDate: Date, comp: string) {
  const date = new Date(formattingDate)
  const year = date.getFullYear()
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  if (comp === 'form') {
    return `${year}-${month}-${day}`
  } else {
    return `${day}.${month}.${year}`
  }
}

export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export function setItems(firstName: string, lastName: string, userId: string, token: string) {
  localStorage.setItem('firstName', firstName)
  localStorage.setItem('lastName', lastName)
  localStorage.setItem('_id', userId)
  localStorage.setItem('token', token)
}
