import {useState,useEffect,createContext} from "react";
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
} from "./Data/Shoes/retrieve.shoes";
import {getCart as getCartFromDb,
    getCartItems as getCartItemsFromDb,
    addCartItem as addCartItemToDb,
    removeCartItem as rvCartItemFromDb,
    addCartItem
} from "./Data/Cart/retrieve.cart";
import {get as getFavFromDb,
 add as addFavToDb,
 remove as removeFavFromDb,
 count as countFavItems
} from "./Data/Favourite/retrieve.favourites";

const UserContext = createContext();

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
        getShoes();
        getCart();
        getCartItems();
        getFav();

    },[]);
    //update cart when cart items changes
    useEffect(()=>{
        const updateCart= ()=>{
            getCartFromDb()
            .then(setCart)
            .catch((e)=>{
                console.log(e);
            });
        }
        updateCart();
    },[cartItems]);

    const getShoes = ()=>{
        getShoesFromDb(4)
        .then(setShoes)
        .catch((e)=>{
            console.log(e);
        });
    }
    const getCart = ()=>{
        getCartFromDb()
        .then(setCart)
        .catch((e)=>{
            console.log(e);
        });
    }
    const getCartItems = ()=>{
        getCartItemsFromDb()
        .then(setCartItems)
        .catch((e)=>{
            console.log(e);
        });
    }
    
    const filterByCategory = (category)=>{
        getShoeByCategory(category)
        .then(setShoes)
        .catch((e)=>{
            console.log(e);
        });
    }
    const filterByPrice =(lowest,highest)=>{
         getShoeByPriceRange(lowest,highest)
         .then(setShoes)
         .catch((e)=>{
            console.log(e);
         });
    }

    const filterByItems =(_total)=>{
        getShoesFromDb(_total)
        .then(setShoes)
        .catch((e)=>{
            console.log(e);
        });
    }
    const addToCart =(_shoe,_size)=>{
        addCartItemToDb(_shoe,_size).
        then(setCartItems)
        .catch((e)=>{
            console.log(e);
        })
    }
    const delCartItem=(_id)=>{
       rvCartItemFromDb(_id)
        .then(setCartItems)
        .catch((e)=>{
         console.log(e);
       });
    }
    const getFav = ()=>{
        getFavFromDb()
        .then((response)=>{
            setFavourite([...response]);
        })
        .catch((e)=>{
            console.log(e);
        }); 
    }
    const removeFromFav = (id)=>{
        removeFavFromDb(id)
        .then((response)=>{
            setFavourite([...response]);
        })
        .catch((e)=>{
            console.log(e);
        });
    }
    const addToFav = (item)=>{
        addFavToDb(item)
        .then((response)=>{
            setFavourite([...response]);
        })
        .catch((e)=>{
            console.log(e);
        });
    }
    const store_props = {
        shoes,
        cartItems,
        favourite,
        "addToCart":addToCart,
        "addToFav":addToFav,
        "removeFromFav":removeFromFav,
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
        <UserContext.Provider value={user}>
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
        </UserContext.Provider>
    );
}


export default App;