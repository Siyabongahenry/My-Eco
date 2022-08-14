import { useEffect, useState } from "react";

export function useFetch(url)
{
    const[data,setData] = useState(null);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);
    useEffect(()=>{
       (
        async ()=>{
            try{
                setLoading(true);
                const response = await fetch(url);
                const response_data = await response.json();
                setData(response_data);
            }
            catch(err)
            {
                setError(err);
            }
            finally{
                setLoading(false);
            }
        }
       )();

    },[url]);
    return {data,error,loading}
}