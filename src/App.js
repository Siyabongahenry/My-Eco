import {useState,useEffect,createContext} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./Components/Footer/index";
import Store from "./Components/Store/index";
import Details from "./Components/Details";
import Navigation from "./Components/Navigation/index";
import Cart from "./Components/Cart/index";
import Login from "./Components/Login/index";
import Logout from "./Components/Logout";
import Chat from "./Components/Chat";
import Favourite from "./Components/Favourite";
import Profile from "./Components/Profile";
import Order from "./Components/Order";
import Payment from "./Components/Payment";
import Register from "./Components/Register";
import {getShoes as getShoesFromDb,
    getMore as getMoreShoesFromDb,
    getByCategory as getShoeByCategory,
    getByPriceRange as getShoeByPriceRange
} from "./Data/Shoes/retrieve.shoes";
import {getCart as getCartFromDb,
    getCartItems as getCartItemsFromDb,
    addCartItem as addCartItemToDb,
    removeCartItem as rvCartItemFromDb,
    clearCartItems, updateCartItemQuantity as updateItemQuantity
} from "./Data/Cart/retrieve.cart";
import {get as getFavFromDb,
 add as addFavToDb,
 remove as removeFavFromDb,
 count as countFavItems
} from "./Data/Favourite/retrieve.favourites";


export const UserContext = createContext();

function App()
{

    const[store,setStore] = useState({
        items:24,
        displayItems:3,
        category:"All",
    })
    const[user,setUser] = useState({
        role:"user",
        login:false,
        details:{
            "firstName":"My-Eco",
            "lastName":"User",
            "email":"user@myeco.com",
            "password":"2022*MyEco",
            "address":"365 Earth",
            "cellNo":"+27 61 456 8926"
        }
    });
    const[shoes,setShoes] = useState(null);
    const[cart,setCart] = useState(null);
    const[cartItems,setCartItems] = useState(null);

    const[favourite,setFavourite] =useState(null);
    const[sortAsc,setSortAsc] = useState(false);
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

    const userLogin =(_email,_password)=>{
        if(_email === user.details.email && _password === user.details.password)
        {
            setUser({...user,"login":true});
            return true;
        }
        return false;
    }
    const registerUser = (_details)=>{
        console.log(_details);
        setUser({...user,details:{..._details}});
    }

    const userLogout = ()=>{
        setUser({...user,"login":false});
    }
    //search items
    const searchItem = (value)=>{
        getShoesFromDb(store.displayItems,value)
        .then(setShoes)
        .catch((e)=>{
            console.log(e);
        });
    }
    //get shoes from a shoes table in a database
    const getShoes = ()=>{
        getShoesFromDb(store.displayItems)
        .then(setShoes)
        .catch((e)=>{
            console.log(e);
        });
    }
    //show more shoes in store by appending more
    const getMoreShoes =()=>{
        getMoreShoesFromDb(store.displayItems,store.category)
        .then((response)=>{
            setShoes([...shoes,...response]);
            setStore({...store,displayItems:store.displayItems+response.length});
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    //get a cart from a database
    const getCart = ()=>{
        getCartFromDb()
        .then(setCart)
        .catch((e)=>{
            console.log(e);
        });
    }
    //get cart items from a cartItem table in a database
    const getCartItems = ()=>{
        getCartItemsFromDb()
        .then(setCartItems)
        .catch((e)=>{
            console.log(e);
        });
    }
    //filter store items by category
    const filterByCategory = (_category)=>{
        getShoeByCategory(_category,store.displayItems)
        .then((response)=>{
            if(sortAsc)
            {
                setShoes(response.sort((a,b)=>a.price-b.price));
            }
            else{
                setShoes(response);
            }
            setStore({...store,category:_category,displayItems:response.length});
        })
        .catch((e)=>{
            console.log(e);
        });
    }
    //filter store items by price
    const filterByPrice =(lowest,highest)=>{
        setSortAsc(true);
         getShoeByPriceRange(lowest,highest,store.category)
         .then(setShoes)
         .catch((e)=>{
            console.log(e);
         });
    }
    //add item to cart
    const addToCart = (_shoe,_size)=>{
        addCartItemToDb(_shoe,_size).
        then((response)=>{
            setCartItems(response);
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    const clearCart=()=>{
        setCartItems(clearCartItems());
    }
    const delCartItem=(_id)=>{
       rvCartItemFromDb(_id)
        .then(setCartItems)
        .catch((e)=>{
         console.log(e);
       });
    }

    //this function update the quantity of the cart item in the state
    //it takes to parameters, the item id and a boolean value that identify if the quantity increase or decrease
    const changeCartItemQuantity =(_itemId,_increaseQuantity=true)=>{
        setCartItems([
            ...cartItems.map((item)=>{

                if (_itemId === item.id)
                {
                    item.quantity = _increaseQuantity? 
                    item.quantity+1:item.quantity > 1? //increase quantity by one
                    item.quantity-1:item.quantity; //reduce quantity by one if quantity is > 1
                }
                return item;
            })
        ]);
    }

    const saveQuantChanges =(_itemId,_quantity)=>{
        updateItemQuantity(_itemId,_quantity)
        .then(setCartItems)
        .catch((e)=>{
            console.log(e);
        })
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
        "getMoreShoes":getMoreShoes,
        "addToCart":addToCart,
        "addToFav":addToFav,
        "removeFromFav":removeFromFav,
        "filterByPrice":filterByPrice,
        "filterByCategory":filterByCategory,
        "searchItem":searchItem
    }
    const cart_props={
        "delCartItem":delCartItem,
        cart,
        cartItems,
        "clearCart":clearCart,
        "changeCartItemQuantity":changeCartItemQuantity,
        "saveQuantChanges":saveQuantChanges
    }
    return (
        <UserContext.Provider value={user}>
            <Router>
                <div className="main-container">
                    <Navigation user={user} cart={cart} favourite={favourite} searchItem ={searchItem}/> 
                    <div className="inner-container">
                        <Routes>
                            <Route path="/My-Eco/"
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
                            <Route path="/favourite"
                                element={
                                    <Favourite shoes={favourite} removeFromFav={removeFromFav} addToCart={addToCart}/>      
                                }
                            />    
                            <Route path="/profile"
                                element={
                                    <Profile user={user}/>      
                                }
                            />   
                            <Route path="/order"
                                element={
                                    <Order/>      
                                }
                            />     
                            <Route path="/payment"
                                element={
                                    <Payment cart={cart} cartItems={cartItems} clearCart={clearCart}/>      
                                }
                            />    
                            <Route path="/register"
                                element={
                                    <Register registerUser={registerUser}/>      
                                }
                            />      
                            <Route path="/login/:returnUrl"
                                element={
                                    <Login userLogin={userLogin}/>      
                                }
                            />    
                            <Route path="/logout"
                                element={
                                    <Logout userLogout={userLogout}/>      
                                }
                            />    
                            <Route path="/chat"
                                element={
                                    <Chat/>      
                                }
                            />    

                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </UserContext.Provider>
    );
}


export default App;