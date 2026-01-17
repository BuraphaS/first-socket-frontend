export interface IFilters {
  numberFormatWithDecimal (_number?: number | string, min?: number, max?: number): string
  numberFormat2Decimal (_number?: number | string): string
  numberFormatNoDecimal (_number?: number): string
}

function numberParseFloat (_number: string | number = 0): number {
  return typeof _number === 'string'
    ? parseFloat(_number)
    : _number
}

export function numberFormatWithDecimal (_number: number | string = 0, min: number = 0, max: number = 4): string {
  const num = numberParseFloat(_number)
  if (num === 0 || num) {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: min,
      maximumFractionDigits: min > max ? min : max
    })
  }
  return '-'
}

export function numberFormatNoDecimal (_number: number = 0): string {
  return numberFormatWithDecimal(_number, 0, 0)
}

export function numberFormat2Decimal (_number: number | string = 0): string {
  return numberFormatWithDecimal(_number, 2, 2)
}

export const filters: IFilters = {
  numberFormatWithDecimal,
  numberFormat2Decimal,
  numberFormatNoDecimal
}
