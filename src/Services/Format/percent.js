const calcPercent = (numerator,denominator)=>{
    return Math.round((numerator/denominator)*100);
}
export const discountFormat = (discount_price,actual_price)=>{
        return calcPercent(discount_price,actual_price)+ "% off";
}

