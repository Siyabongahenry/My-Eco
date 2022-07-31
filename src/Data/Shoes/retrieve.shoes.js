import {shoes,addShoeToDb as addShoe} from "./db.shoes";

export const getShoes = (count = null)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList =count === null?shoes:shoes.slice(0,count);
        if(shoesList === null)
        {
            reject();
        }
        else{
            accept(shoesList);
        }
    });
    return promise;
}

export const getShoe = (_id)=>{
    const promise = new Promise((accept,reject)=>{
        let shoe = shoes.find(({id})=> id.toString() === _id);
        if(shoe !== undefined)
        {
            accept(shoe);
        }
        else{
            reject(null);
        }
    });
    return promise;
}
export const getByCategory = (_category)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList = _category ==="All"?shoes:shoes.filter(({category})=> category === _category);
        if(shoesList.length > 0)
        {
            accept(shoesList);
        }
        else{
            reject("Items could not be found");
        }
    });
    return promise;
}
export const getByPriceRange = (lowest,highest)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList = shoes.filter(({price})=> price >= lowest && price < highest);
        if(shoesList.length > 0)
        {
            accept(shoesList);
        }
        else{
            reject("Items could not be found");
        }
    });
    return promise;
}
export const addShoeToDb = (shoe)=>{
    const promise = new Promise((accept,reject)=>{
        if(shoe === null)
        {
            reject("Shoe could not be added");
        }
        else{
            accept(addShoe(shoe));
        }
    });

    return promise;
}