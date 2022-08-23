import {shoes,addShoeToDb as addShoe} from "./db.shoes";

export const getShoes = (count = 100000,search_value = null)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList =search_value ===null?[...shoes]:
        shoes.filter(({name,description})=>name.toLowerCase()
        .search(search_value)>=0 || description.toLowerCase().search(search_value)>=0);

         shoesList = shoesList.splice(0,count);

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
export const getMore = (_skip,_category,_items=3)=>{
    const promise = new Promise((accept,reject)=>{
        let shoeList = _category ==="All"?[...shoes].splice(_skip,_items):
        shoes.filter(({category})=> category === _category).splice(_skip,_items);
        if(shoeList.length > 0)
        {
            accept(shoeList);
        }
        else{
            reject("shoes not found");
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
export const getByCategory = (_category,count)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList = _category ==="All"?[...shoes].splice(0,count):shoes.filter(({category})=> category === _category);
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
export const getByPriceRange = (_lowest,_highest,_category)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList = _category ==="All"?shoes:shoes.filter(({category})=> category ===_category);
        shoesList =  shoesList.filter(({price})=> price >= _lowest && price < _highest ).sort((a,b)=> a.price - b.price);
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
