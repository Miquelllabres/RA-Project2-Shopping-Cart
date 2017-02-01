/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if (typeof(Storage) !== "undefined") {

                let item = `${"product.sku"}`;

                if(sessionStorage.getItem(item) === null){
                        sessionStorage.setItem(item, 1);

                        
                } else {
                    let quantity = sessionStorage.getItem(item);
                    sessionStorage.setItem(item, parseInt(quantity)+1);
                }

        } else {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.\
        

        
    }

    addItemToCart(sku){



    }
    
    removeItemFromCart(sku){

    }

    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        // clear the entire cart
    }


}
