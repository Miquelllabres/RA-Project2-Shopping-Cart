/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */
export default class ShoppingCart{

    constructor(){
        this.viewcart = document.getElementsByClassName("viewCart");
        // console.log("creating shopping cart");
        this.getCartTotal();
        console.log("here");
       
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.\
        

        
    }

    addItemToCart(sku){
         if (typeof(Storage) !== "undefined") {
            if (sessionStorage.getItem(sku.toString()) !== null){


                // console.log("there is a sku");
                let currentValue = sessionStorage.getItem(sku);
                currentValue = parseInt(currentValue);
                currentValue = currentValue +1;
                currentValue = currentValue.toString();
                sessionStorage.setItem(sku, currentValue);

                let totalQuantity = 0;
                for (let i=0; i<sessionStorage.length; i++){
                    // console.log(sessionStorage.key(i));
                    let currentKey = sessionStorage.key(i);

                    if (sessionStorage.getItem('quantity') === null){
                    sessionStorage.setItem('quantity',0);

                } 

                    if (currentKey == "quantity"){

                    

                  
                } else {
                    let productQty = parseInt(sessionStorage.getItem(currentKey));
                    // console.log("currentKey = " + currentKey + "productQty = " + productQty);
                    let currentQty = parseInt(sessionStorage.getItem('quantity'));
                    // console.log("currentQty =" + currentQty);
                
                    totalQuantity = totalQuantity + productQty;

                    
                    // productQty = parseInt(productQty);
                    // currentQty = currentQty + productQty;
                    //sessionStorage.setItem("quantity",currentQty);
                    // sessionStorage.setItem( parseInt(productQty) + 1);
                }
                    sessionStorage.setItem("quantity",totalQuantity);
                    

                
                }
                
                
                


            }

            else{


                console.log("your cart is empty");
                sessionStorage.setItem(sku.toString(),"1");

            }

        } else {
            console.error("Error! SessionStorage not supported in your browser!");
        }
                    $(document).ready(function(){

                        $('.cartText').hide();
                    });
                    
                    console.log(this.getCartTotal());
                    $(".addtocart").on("click", function (){
                    $("#cartQty").val(this.getCartTotal);
                    $("#cartQty").show();
                    // $(".show").hide();
                    


                });
}
    getCartTotal (){
        if (typeof(Storage) !== "undefined") {
            if (sessionStorage !== null){
                return sessionStorage.quantity;
            }
        }
        }


    createCartView(products){
        // console.log(" I am in create cart view");
        // console.log(products);
        // retrieve the sessionStorage (stores skus and quantities);
        // loop through all the skus (keys) in sessionStorage
        // for (var key in sessionStorage);
        // get the sku number
        // let currentKey = key;
        // console log it
        
        $(".viewCart").html("");
        console.log(sessionStorage);


        for (let sku in sessionStorage){
            let currentSku = sku;
            // console.log(currentSku);

            // from the sku, get the product
            for (let product in products){
                let currentProduct = product;
                
                if (products[currentProduct].sku.toString() == currentSku ){
                    // console.log(products[currentProduct]);//actual products
                    let actualProduct = products[currentProduct];
                    //build div/tags here
                    // let newWindow = document.createElement("window");
                    // newWindow.setAttribute("class","cartView");


                    
                    let newDiv = document.createElement("div");
                    newDiv.setAttribute("class","CartDiv");
                    

                    let idDiv = document.createElement("div");
                    idDiv.setAttribute('id', `${actualProduct.sku}`)
                    idDiv.setAttribute("class","shoppingcart");
            

                    let newImg = document.createElement("div");
                    newImg.setAttribute("class", "cartImages")
                    newImg.setAttribute("src", `${actualProduct.image}`);
                    newImg.setAttribute("style",`background-image: url('${actualProduct.image}');height:100px; background-size:contain;background-repeat:no-repeat;background-position:center;`)
                
                    let newH3Tag = document.createElement("h3");
                    newH3Tag.setAttribute("class","productManufaturer");
                    let newH3TagTextNode = document.createTextNode(`${actualProduct.manufacturer}`);
                    newH3Tag.appendChild(newH3TagTextNode);

                    let newPara = document.createElement("p");
                    newPara.setAttribute("class","productPrice");
                    let newParaTextNode = document.createTextNode("$" + `${actualProduct.regularPrice}`);
                    newPara.appendChild(newParaTextNode);

                    let qty = document.createElement("input");
                    qty.setAttribute("class","qty greytext");
                    qty.setAttribute("type", "number");
                    qty.setAttribute("value",`${sessionStorage[sku]}`);
                    let qtyTextNode = document.createTextNode("Quantity");
                    qty.appendChild(qtyTextNode);

                    let newDiv1 = document.createElement("div");
                    newDiv1.setAttribute("class","buttonscart");

                    let removeBtn = document.createElement("button");
                    removeBtn.setAttribute("class","remove");
                    removeBtn.setAttribute("type","button");
                    console.log(actualProduct.sku);
                    removeBtn.setAttribute("data-sku", `${actualProduct.sku}`)
                    let removeTextNode = document.createTextNode("remove");
                    removeBtn.appendChild(removeTextNode);
                    console.log(removeBtn.addEventListener);
                    console.log(actualProduct.sku);
                    
                    removeBtn.addEventListener("click",this.beforeItemIsDeleted(actualProduct.sku,this),false);//new line
                    

                    let update = document.createElement("button");
                    update.setAttribute("class","update");
                    update.setAttribute("type","button");
                    let updateTextNode = document.createTextNode("update");
                    update.appendChild(updateTextNode);
                    // update.addEventListener("click",this.updateQuantityofItemInCart,false);

                    
                    // let total = document.getElemenyById("cartQty");
                    // total.setAttribute("value",`${sessionStorage[totalQuantity]}`);


                
                    newDiv.appendChild(idDiv)
                    idDiv.appendChild(newImg);
                    idDiv.appendChild(newH3Tag);
                    idDiv.appendChild(newPara);
                    idDiv.appendChild(qty);
                    idDiv.appendChild(newDiv1);
                    newDiv1.appendChild(update);
                    newDiv1.appendChild(removeBtn);

                    

                    this.viewcart[0].appendChild(newDiv);
                    // $('.remove').on('click', this.removeItemFromCart(actualProduct.sku));

                }

            }
            
        } 
                $('.cartcontainer').toggle();
                $('#clear').on('click', function(){
                    $('.cartcontainer').hide();
                    $('.cartText').show();
                // $('#cartQty').on('click',function(){

                // });

                
                });

                
                

                
     


    }
    
    beforeItemIsDeleted(sku,thisShoppingCart){

        return function(e){
            thisShoppingCart.removeItemFromCart(sku);
        }
        
    }

    removeItemFromCart(sku,theApp,btn){
            console.log('i am in the function')
            // let deleteQty = document.getElemenyById(actualProduct.sku);
            // console.log(deleteQty);
            
            $("[data-sku='"+sku+"']").closest(".CartDiv").remove();
            
           sessionStorage.removeItem(sku);
    // }
    }            
    
    updateQuantityofItemInCart(sku,qty){

      

    }

    clearCart(){
        sessionStorage.clear();
        $(".viewCart").html("");

        
    }


}
