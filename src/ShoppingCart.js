/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */
export default class ShoppingCart{

    constructor(){

        console.log("creating shopping cart");
       
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.\
        

        
    }

    addItemToCart(sku){
        console.log("hell yeah");
         if (typeof(Storage) !== "undefined") {
            console.log(sku);
            console.log(sessionStorage.getItem(sku.toString()));
            if (sessionStorage.getItem(sku.toString()) !== null){
                console.log("there is a sku");
                let currentValue = sessionStorage.getItem(sku);
                currentValue = parseInt(currentValue);
                currentValue = currentValue +1;
                currentValue = currentValue.toString();
                sessionStorage.setItem(sku, currentValue);



            }else{
                console.log("there is no sku");
                sessionStorage.setItem(sku.toString(),"1");

            }

        } else {
            console.error("Error! SessionStorage not supported in your browser!");
        }
    //     this.items = [];

    //     if (items === undefined || items == null){
    //         return ; // do not do anything! there is no data
    //     }


    //     for (let i=0; i<item.length ; i++){
        
    //         let item = items[i];
    //         console.log(item);
    //         // each product is a product object
    //         // use it to create the element

    //         // create the DIV tag with class 'product-wrapper'
    //         // let newDiv = document.createElement("p");
    //         // // newDiv.setAttribute("class","product-wrapper");
    //         // console.log()



    // }
}
    createCartView(products){
        console.log(" I am in create cart view");
        console.log(products);
        // retrieve the sessionStorage (stores skus and quantities);
        // loop through all the skus (keys) in sessionStorage
        // for (var key in sessionStorage);
        // get the sku number
        // let currentKey = key;
        // console log it

        for (let sku in sessionStorage){
            let currentSku = sku;
            console.log(currentSku);

            // from the sku, get the product
            for (let product in products){
                let currentProduct = product;
                
                if (products[currentProduct].sku.toString() == currentSku ){
                    console.log(products[currentProduct]);//actual products
                    let actualProduct = products[currentProduct];
                    //build div/tags here
                }

            }
            //append bla bla bla
        } //show popup of cart



    }
    removeItemFromCart(sku){

    }

    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        // clear the entire cart
    }


}
