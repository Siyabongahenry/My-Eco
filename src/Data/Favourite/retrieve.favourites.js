import { favourite,add as addToDb,remove as removeFromDb} from "./db.favourite";
export const get = ()=>{
    let promise = new Promise((accept,reject)=>{
        if(favourite != undefined && favourite != null)
        {
            accept(favourite);
        }
        else{
            reject("favourite not found");
        }
    });
    return promise;
}
export const add = (item)=>{
     const promise = new Promise((accept,reject)=>{
        //confirm if item exist
        const itemExist = favourite.some(({id})=>id===item.id);
        if(itemExist)
        {
            reject("Item already exist..");
        }
        else{
            let items = addToDb(item);
            accept(items);
        }
     });
     return promise;
}

export const remove = (id)=>{
    const promise = new Promise((accept,reject)=>{
        //confirm if item exist 
        const itemExist = favourite.some(({id:itemId})=>itemId === id);
        if(itemExist)
        {
            let items = removeFromDb(id);
            accept(items);
        }
        else{
            reject("Item does not exist...");
        }
    });
    return promise;
}

export const count = ()=>{
    return favourite.length;
}