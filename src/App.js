import {useState,useEffect} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./Components/Footer/index";
import Store from "./Components/Store/index";
import Details from "./Components/Details";
import Navigation from "./Components/Navigation/index";
import Cart from "./Components/Cart/index";
import Login from "./Components/Login/index";
import Chat from "./Components/Chat";

import {getShoes as getShoesFromDb,
    getByCategory as getShoeByCategory,
    getByPriceRange as getShoeByPriceRange
} 
from "./Data/Shoes/retrieve.shoes";

import {getCart as getCartFromDb,
    getCartItems as getCartItemsFromDb,
    addCartItem as addCartItemToDb,
    removeCartItem as rvCartItemFromDb,
    addCartItem
} 
from "./Data/Cart/retrieve.cart";

function App()
{
    const[store,setStore] = useState({
        "pages":4,
        "itemsPerPage":4
    });
    const[user,setUser] = useState({
        role:"user",
        login:false,
        user:""
    });
    const[shoes,setShoes] = useState([]);
    const[cart,setCart] = useState({});
    const[cartItems,setCartItems] = useState([]);

    const[favourite,setFavourite] =useState([]);


    useEffect(()=>{
        const getShoes = ()=>{
            getShoesFromDb(4)
            .then((data)=>{
                setShoes(data);
            })
            .catch((e)=>{
                console.log(e);
            });
        }
        const getCart = ()=>{
            getCartFromDb()
            .then((response)=>{
                setCart(response);
            })
            .catch((e)=>{
                console.log(e);
            });
        }
        const getCartItems = ()=>{
            getCartItemsFromDb()
            .then((response)=>{
                setCartItems(response);
            })
            .catch((e)=>{
                console.log(e);
            });
        }
        const getFavourite = async ()=>{
            const items = await fetchItems("favourite");
            setFavourite(items);
        }

        getShoes();
        getCart();
        getCartItems();
        getFavourite();

    },[]);
    //update cart when cart items changes
    useEffect(()=>{
        const updateCart= ()=>{
            getCartFromDb()
            .then((response)=>{
                setCart(response);
            })
            .catch((e)=>{
                console.log(e);
            });
        }
        updateCart();
    },[cartItems]);
    const fetchItems = async (url)=>{
        const response = await  fetch(`http://localhost:5000/${url}`);
        const data = await response.json();

        return data;
    }

    const postItems = async (url,item,method=null)=>{
        const response = await fetch(`http://localhost:5000/${url}`,{
            method:method===null?'POST':method,
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(item)
        });
        const data = await response.json();
        
        return data;
    }
    
    const filterByCategory = (category)=>{
        getShoeByCategory(category)
        .then((response)=>{
        setShoes(response);
        }).catch((e)=>{
            console.log(e);
        });
    }
    const filterByPrice =(lowest,highest)=>{
         getShoeByPriceRange(lowest,highest)
         .then((response)=>{
            setShoes(response);
         })
         .catch((e)=>{
            console.log(e);
         });
    }

    const filterByItems =(_total)=>{
        getShoesFromDb(_total)
        .then((response)=>{
            setShoes(response);
        })
        .catch((e)=>{
            console.log(e);
        });
    }
    const addToCart =(_shoe,_size)=>{
        addCartItemToDb(_shoe,_size).
        then((response)=>{
            setCartItems(response);
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    const delCartItem=(_id)=>{
        rvCartItemFromDb(_id)
        .then((response)=>{
            setCartItems(response);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    const addToFavourite= async (shoe)=>{
        const favItem = await postItems("favourite",shoe);
        setFavourite([...favourite,favItem]);
    }
    const store_props = {
        "shoes":shoes,
        "addToCart":addToCart,
        "cartItems":cartItems,
        "addToFavourite":addToFavourite,
        "favourite":favourite,
        "filterByPrice":filterByPrice,
        "filterByCategory":filterByCategory,
        "filterByItems":filterByItems
    }

    const cart_props={
        "delCartItem":delCartItem,
        "cart":cart,
        "cartItems":cartItems
    }
    return (

        <Router>
            <div className="main-container">
                <Navigation user={user} cart={cart} favourite={favourite}/> 
                <Routes>
                    <Route path="/"
                        element={
                            <Store {...store_props}/>     
                        }
                    />    
                    <Route path="/details/:id"
                        element={
                            <Details addToCart={addToCart}/>      
                        }
                    />    
                    <Route path="/cart"
                        element={
                            <Cart {...cart_props}/>
                        }
                    />   
                    <Route path="/login"
                        element={
                            <Login user={user}/>      
                        }
                    />    
                    <Route path="/chat"
                        element={
                            <Chat/>      
                        }
                    />    

                </Routes>
                <Footer/>
            </div>
        </Router>

    );
}


export default App;