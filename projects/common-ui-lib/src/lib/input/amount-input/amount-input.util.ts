export const regexAmountInputPattern = {
  amountThousandSeparator: new RegExp('(\\-?\\d)(?=(\\d{3})+(?!\\d))', 'g'),
};

export function getThousandSeparatedAmount(val: string | number, decimalLength?: number) {
  decimalLength = decimalLength ? decimalLength : 2;
  if (val === '-') {
    return val;
  }

  if (!!!val) {
    return;
  }
  const tmp = +val.toString();
  let value = val;

  const res = val.toString().split('.');

  if (res.length > 0 || (res.length > 1 && res[1].length < decimalLength + 1)) {
    value = tmp.toFixed(decimalLength);
  }

  let convertedValue = value.toString().split('.');
  return convertedValue[0].replace(regexAmountInputPattern.amountThousandSeparator, '$1,') + '.' + convertedValue[1];
}

export function getThousandSeparatedForAmountFilter(val: string | number) {
  if (val === '-') {
    return val;
  }
  const res = val.toString().split('.');
  if (res.length > 1 && res[1].length > 2) {
    return res[0].replace(regexAmountInputPattern.amountThousandSeparator, '$1,') + '.' + res[1];
  }

  return val.toString().replace(regexAmountInputPattern.amountThousandSeparator, '$1,');
}
