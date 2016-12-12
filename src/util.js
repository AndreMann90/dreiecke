
export const decimals = 2;

export function numToStr(num) {
    return num.toFixed(decimals).replace('.', ',');
}

export function strToNum(str) {
    return parseFloat(str.replace(',', '.'));
}

export function atLeastTwoDecimals(str) {
    const comma = str.indexOf(',');
    if(comma === -1) {
        return str + ",00";
    } else if(str.length - comma < decimals + 1) {
        return str + "0".repeat(decimals - (str.length - comma) + 1)
    } else {
        return str
    }
}