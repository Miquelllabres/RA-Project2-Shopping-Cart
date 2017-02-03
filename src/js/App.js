/**
 * Created by Edward_J_Apostol on 2017-01-28.
 */

import BestBuyWebService from './BestBuyWebService';
import CatalogView from './CatalogView'
import ShoppingCart from './ShoppingCart'

export default class App {

    constructor(){
        this.productData = null; // this will store all our data
        this.products = null; // stores specifically the products
        this.catalogView = new CatalogView(); // this will display our data
        this.shoppingCart = new ShoppingCart();
        // call the initBestBuyWebService to initialize the
        // BestBuy Web Service and return the data
        this.initBestBuyWebService();
        // console.log(document.getElementById("cartIcon"));
         this.cartIcon = document.getElementById("cartIcon");
         this.cartIcon.addEventListener("click",this.clickCart(this),false);
         this.clear = document.getElementById("clear");
         this.clear.addEventListener("click",this.clickClear(this),false);
    }
    //*******************************************
    //Calls the function to clear session storage
    //*******************************************
    clickClear(theApp){
        return function(e){
            theApp.shoppingCart.clearCart(theApp.products);
        }
    }
    //****************************
    //creates a shopping cart viev
    //****************************
    clickCart(theApp){
        return function(e){
            // console.log("i clicked the button");
            // console.log(theApp);
            theApp.shoppingCart.createCartView(theApp.products);
        }


    }

    initBestBuyWebService(){
        this.bbws = new BestBuyWebService();
        // use your own API key for this (the one from Cody)
        this.bbws.apiKey = "8ccddf4rtjz5k5btqam84qak";

        // this uses 'backticks' for long multi-line strings
        this.bbws.url = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=${this.bbws.apiKey}&format=json`;

        // pass the reference to this app to store the data
        this.bbws.getData(this); //(this) takes the entire app and send it to getdata.

    }

    prepCatalog(){
        // use this console.log to test the data
        // console.log(this.productData);

        if(this.productData!=null){
            // only get the products property (for now)
            // this code was copied from SimpleHTTPRequest.html
            this.products = this.bbws.getProducts();

        }

        this.showCatalog();
    }

    showCatalog() {

        // populate the catalog only if there are products
        if (this.productData != null) {
            this.catalogView.addProductsToCarousel(this.products,this);
            // this.catalogView.showCatalog();
            
        }


    }

}




