
export function numToStr(num) {
    return num.toFixed(2).replace('.', ',');
}

export function strToNum(str) {
    return parseFloat(str.replace(',', '.'));
}