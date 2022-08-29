
export const getTime = ()=>{
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2,"0");
    const minutes =String(currentDate.getMinutes()).padStart(2,"0");

    return `${hours}:${minutes}`;
}

export const getDate = ()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear;
    const month = String(currentDate.getMonth()).padStart(2,"0");
    const day = String(currentDate.getDay()).padStart(2,"0");
    

    return `${year}-${month}-${day}`;

}
