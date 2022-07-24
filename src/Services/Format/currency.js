export function priceFormat(price){
    let formatter = new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'})
    return formatter.format(price);
}