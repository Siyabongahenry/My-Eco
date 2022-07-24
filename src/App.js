import {useState,useEffect,createContext,useContext} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./Components/Footer/index";
import Store from "./Components/Store/index";
import Details from "./Components/Details";
import Navigation from "./Components/Navigation/index";
import Cart from "./Components/Cart/index";
import Login from "./Components/Login/index";
import Chat from "./Components/Chat";

function App()
{
    const storeContext = createContext();
    const[currentUser,setCurrentUser] = useState({
        role:"admin",
        login:true,
        user:""
    });
    const[shoes,setShoes] = useState([]);
    const[cart,setCart] = useState({});
    const[cartItems,setCartItems] = useState([]);

    useEffect(()=>{
        const getShoes = async ()=>{
            const rShoes = await fetchItems("shoes");
            setShoes(rShoes);
        }
        const getCart = async ()=>{
            const rCart = await fetchItems("cart");
            setCart(rCart);
        }
        const getCartItems = async ()=>{
            const items = await fetchItems("cart_items");
            setCartItems(items);
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
    
    const filterByCategory =async (category)=>{
        let data =null;
        if(category === "All")
        {
          data = await fetchItems("shoes");
        }
        else{
          data = await fetchItems(`shoes?category=${category}`)
        }
        setShoes(data);  
    }
    const filterByPrice =async (lowest,highest)=>{
         let shoeList = await fetchItems("shoes");
        setShoes(shoeList.filter(shoe=>shoe.price >= lowest && shoe.price < highest));
    }


    const addToCart =async (shoe)=>{
        let shoeOnCart = cartItems.find(({shoe:{id}})=>id === shoe.id);
        if(shoeOnCart === undefined)
        {
            let newCartItem = {
                "cartId":0,
                "shoe":shoe,
                "quantity":1,
                "subtotal":shoe.price
            }
            
            const item = await postItems("cart_items",newCartItem);
            setCartItems([...cartItems,item]);
            await updateCart(item);
        }
        else{
            let{quantity} = shoeOnCart;
            quantity ++;
            let newCartItem = {...shoeOnCart,"quantity":quantity}

            //const item = await postItems("cart_items",newCartItem,"POST");

            setCartItems(cartItems.map((cartItem)=>{
                if(cartItem.id == newCartItem.id)
                {
                    cartItem = newCartItem;
                }
                return cartItem;
            }));

            await updateCart(newCartItem);

        }
    }
    const updateQuantity =async (_cartItem,_quantity)=>{
        let cartItem = {..._cartItem,"quantity":_quantity};
        const item = await postItems("cart_items",cartItem);
    }
    const updateCart=async (newCartItem)=>{
        let totalPrice = cartItems.reduce((acc,curr)=>acc+curr.subtotal,0)+newCartItem.subtotal;
        let quantity = cartItems.reduce((acc,curr)=>acc+curr.quantity,0)+newCartItem.quantity;
        
        let newCart = {
            ...cart,
            "total":totalPrice,
            "quantity":quantity
        };
        await postItems("cart",newCart);
        setCart({...newCart});
    }

    const delCartItem=(id)=>{
        setCartItems(cartItems.filter((item)=>item.id != id))
    }
    const[favourite,setFavourite] =useState([]);

    const addToFavourite= async (shoe)=>{
        const favItem = await postItems("favourite",shoe);
        setFavourite([...favourite,favItem]);
    }
    const store_props = {
        "filterByPrice":filterByPrice,
        "filterByCategory":filterByCategory,
        "shoes":shoes,
        "addToCart":addToCart,
        "cartItems":cartItems,
        "addToFavourite":addToFavourite,
        "favourite":favourite
    }

    const cart_props={
        "delCartItem":delCartItem,
        "cart":cart,
        "cartItems":cartItems
    }
    return (
        <Router>
            <div className="main-container">
                <Navigation currentUser={currentUser} cart={cart} favourite={favourite}/> 
                <Routes>
                    <Route path="/"
                        element={
                            <Store {...store_props}/>     
                        }
                    />    
                    <Route path="/details/:id"
                        element={
                            <Details shoes={shoes}/>      
                        }
                    />    
                     <Route path="/cart"
                        element={
                            <Cart {...cart_props}/>
                        }
                    />   
                     <Route path="/login"
                        element={
                            <Login currentUser={currentUser}/>      
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