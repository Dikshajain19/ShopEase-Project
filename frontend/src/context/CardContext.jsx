import { createContext,useContext,useState } from "react";

const CartContext=createContext()
export const CartProvider=({children})=>{
    const [cartItems,setcartItems]=useState([]);
    const addToCart=(product)=>{
        const existing=cartItems.find((item)=> item.id===product.id);
        if(existing){
            setcartItems(
                cartItems.map((item)=>
                item.id == product.id ? {...item,quantity:item.quantity+1}:item)
            );
        }
        else{
            setcartItems([...cartItems,{...product,quantity:1}]);
        }
    };

    const removeFromCart=(id)=>{
        setcartItems(cartItems.filter((item)=>item.id !== productId));

    }
    const updateItems = (id, quantity) => {
        if (quantity < 1) return;

        setcartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    return(
        <CartContext.Provider value={{cartItems,addToCart,removeFromCart,updateItems}}>{children}</CartContext.Provider>
    )

}

export const useCart=()=>useContext(CartContext);