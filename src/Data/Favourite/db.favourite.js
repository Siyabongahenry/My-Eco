export let favourite = [];

export const add = (item)=>{
    favourite.push(item);
    return favourite;
}

export const remove =(id)=>{
    favourite = favourite.filter(({id:favId})=> favId !== id);
    return favourite;
}

