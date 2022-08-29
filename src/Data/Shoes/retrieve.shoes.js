//This file act as a server
import {shoes,addShoeToDb as addShoe} from "./db.shoes";
//getting shoes from a database
export const getShoes = (count = 100000,search_value = null)=>{
    //using a promise to make this function to work asynchronous just like in a server
    const promise = new Promise((accept,reject)=>{
        //use setTimeout to delay the feedback to fake a server response
        setTimeout(()=>{
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
        },3000);
        
    });
    return promise;
}
//get shoes from a database by filtering out shoes that are already present in the front end
//_skip is equal to the number shoes displayed in the front end
//_items is the number of shoes that would be return pr append in the front end
export const getMore = (_skip,_category,_items=3)=>{
    const promise = new Promise((accept,reject)=>{
        let shoeList = _category ==="All"?[...shoes].splice(_skip,_items):
        shoes.filter(({category})=> category === _category).splice(_skip,_items);
        setTimeout(()=>{
            if(shoeList.length > 0)
            {
                accept(shoeList);
            }
            else{
                reject("shoes not found");
            }
        },2000)
    });
    return promise;
}
//get full shoe details using the shoe id 
//this is useful in a detail page
export const getShoe = (_id)=>{
    const promise = new Promise((accept,reject)=>{
        let shoe = shoes.find(({id})=> id === _id);
        setTimeout(()=>{
            if(shoe !== undefined)
            {
                accept(shoe);
            }
            else{
                reject(null);
            }
        },2000);
    });
    return promise;
}
//get shoes of a specific category in a database
//count is the number of shoes that would be display in the front-end
export const getByCategory = (_category,count)=>{
    const promise = new Promise((accept,reject)=>{
        let shoesList = _category ==="All"?[...shoes].splice(0,count):
        shoes.filter(({category})=> category === _category);
        setTimeout(()=>{
            if(shoesList.length > 0)
            {
                accept(shoesList);
            }
            else{
                reject("Items could not be found");
            }
        },2000)
       
    });
    return promise;
}
//filter shoe by price and sort from lowest to highest
export const getByPriceRange = (_lowest,_highest,_category)=>{
    const promise = new Promise((accept,reject)=>{
        setTimeout(() => {
            //if category is all, take all shoes else filter the shoes using order categories
            let shoesList = _category ==="All"?shoes:shoes.filter(({category})=> category ===_category);
            //filter shoes by the price range and sort them in ascending order
            shoesList =  shoesList.filter(({price})=> price >= _lowest && price < _highest ).sort((a,b)=> a.price - b.price);
            if(shoesList.length > 0)
            {
                accept(shoesList);
            }
            else{
                reject("Items could not be found");
            }
        }, 2000);
        
    });
    return promise;
}
//adding shoes to the database
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
