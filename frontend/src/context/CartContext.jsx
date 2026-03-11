import { createContext,useContext,useState,useEffect } from "react";
import { authFetch,getAccessToken } from "../util/auth";
const CartContext=createContext()
export const CartProvider=({children})=>{
    const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems,setcartItems]=useState([]);
    const [total,setTotal]=useState(0)
    const fetchCart=async()=>{
        try{
            const res= await authFetch(`${BASEURL}/api/cart/`)
            if(!res.ok){
                throw new Error("Failed to fetch cart")
            }
            const data = await res.json();
            
            setcartItems(data.items || []);
            setTotal(data.total || 0)

          
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchCart()
    },[])


    //this is the logic for just state mgmt
    // const addToCart=(product)=>{
    //     const existing=cartItems.find((item)=> item.id===product.id);
    //     if(existing){
    //         setcartItems(
    //             cartItems.map((item)=>
    //             item.id == product.id ? {...item,quantity:item.quantity+1}:item)
    //         );
    //     }
    //     else{
    //         setcartItems([...cartItems,{...product,quantity:1}]);
    //     }
        
    // };

    //actual logic which will work for backend
    const addToCart=async(productid)=>{
        try{
            await authFetch(`${BASEURL}/api/cart/add/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({product_id:productid}),
            });
            fetchCart()
        }
        catch(err){
            console.log("Error adding to the cart  ",err)
        }
    }



    // const removeFromCart=(id)=>{
    //     setcartItems(cartItems.filter((item)=>item.id !== id));

    // }


    const removeFromCart=async(id)=>{
        try{

        
            await authFetch(`${BASEURL}/api/cart/remove/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({item_id:id})
            });
            fetchCart();
        }
        catch(err){
            console.log("erro removing from cart" , err)
        }
        
    }


    // const updateItems = (id, quantity) => {
    //     if (quantity < 1) return;

    //     setcartItems((prevItems) =>
    //         prevItems.map((item) =>
    //             item.id === id
    //                 ? { ...item, quantity }
    //                 : item
    //         )
    //     );
    // };
 
    const updateItems=async(id,qty)=>{
         if (qty < 1){
            await removeFromCart(id);
            return;
        }
        try{
            await authFetch(`${BASEURL}/api/cart/update/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({item_id:id,quantity:qty})
            })
            fetchCart();
        }
        catch(err){
            console.log("Error updating  ",err)
        }

    }
    const clearCart=()=>{
        setcartItems([]);
        setTotal(0);
        
    }
    return(
        <CartContext.Provider value={{cartItems,total,addToCart,removeFromCart,updateItems}}>{children}</CartContext.Provider>
    )

}

export const useCart=()=>useContext(CartContext);