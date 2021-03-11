export const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "")
  })
}

export const parseParam = (s: string) => {
  return s.split("/").pop() || ""
}

export const toPercentage = (value: number) => {
  const percent = value * 100
  return `${percent.toFixed(1)}%`
}
