export const postItem = async (table,item)=>{
    const response = await fetch("http://localhost:5000/"+table,{
        method:"POST",
        header:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(item)
    });

    const data = await response.json();
    return data;
}

export const getItems = async (table)=>{
    const response = await fetch("http://localhost:5000/"+table);
    const data = await response.json();

    return data;
}