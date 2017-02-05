
export default class ShoppingCart{



    constructor(){
        this.viewcart = document.getElementsByClassName("viewCart");
        this.quickview = document.getElementById("myModal");
        // console.log("creating shopping cart");
        this.getCartTotal();
        console.log("here");
       
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.\
        

        
    }

    addItemToCart(sku){

            

$('.cartText').hide();
        //session storage//

         if (typeof(Storage) !== "undefined") {
            if (sessionStorage.getItem(sku.toString()) !== null){
                 

                
                let currentValue = sessionStorage.getItem(sku);
                console.log(currentValue);
                currentValue = parseInt(currentValue);
                currentValue = currentValue + 1;
                currentValue = currentValue.toString();
                sessionStorage.setItem(sku, currentValue);

                //session storage total quantity

                let totalQuantity = 0;
                for (let i=0; i<sessionStorage.length; i++){
                    console.log(sessionStorage.key(i));
                    let currentKey = sessionStorage.key(i);

                    if (sessionStorage.getItem('quantity') === null){
                    sessionStorage.setItem('quantity',1);

                } 

                    if (currentKey == "quantity"){

                    

                  
                } else {
                    let productQty = parseInt(sessionStorage.getItem(currentKey));
                    console.log("currentKey = " + currentKey + "productQty = " + productQty);
                    let currentQty = parseInt(sessionStorage.getItem('quantity'));
                    // console.log("currentQty =" + currentQty);
                
                    totalQuantity = totalQuantity + productQty;

                
                }
                    sessionStorage.setItem("quantity",totalQuantity);
                
                }

            }

            else{


                console.log("This is a new sku");
               sessionStorage.setItem(sku.toString(),"1");
                // total = total + total;
                $('.cartText').show();

            }

        } else {
            console.error("Error! SessionStorage not supported in your browser!");
        }
                    

                    $(document).ready(function(){

                        $('.cartText').hide();
                    });
                    
                    //*********************
                    //displays total items on Icon cart
                    //*********************

                    let counterQuantity = this.getCartTotal();
                    
                    $(".addtocart").on("click", function (){
                    $("#cartQty").val(counterQuantity);
                    $("#cartQty").show();
                    // $(".show").hide();
                    


                    });
                 }

    quickViewItems(theApp,products){
        $('#myModal').fadeIn();
        $('.closep').on('click', function(){
            $('#myModal').fadeOut();
        });
        // 

        console.log('i am here')
        console.log(products);

        
}

    //gets total on session storage
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
        // console.log(sessionStorage);


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
                    qty.setAttribute("data-sku", `${actualProduct.sku}`);
                    qty.setAttribute("value",`${sessionStorage[sku]}`);
                    let qtyTextNode = document.createTextNode("Quantity");
                    qty.appendChild(qtyTextNode);

                    let newDiv1 = document.createElement("div");
                    newDiv1.setAttribute("class","buttonscart");

                    let removeBtn = document.createElement("button");
                    removeBtn.setAttribute("class","remove");
                    removeBtn.setAttribute("type","button");
                    removeBtn.setAttribute("data-sku", `${actualProduct.sku}`)
                    let removeTextNode = document.createTextNode("remove");
                    removeBtn.appendChild(removeTextNode);
                    // console.log(actualProduct.sku);
                    
                    removeBtn.addEventListener("click",this.beforeItemIsDeleted(actualProduct.sku,this),false);//new line
                    

                    let update = document.createElement("button");
                    update.setAttribute("class","update");
                    update.setAttribute("type","button");
                    let updateTextNode = document.createTextNode("update");
                    update.appendChild(updateTextNode);
                    update.addEventListener("click",this.updateQuantityofItemInCart,false);

                    
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


        //Closes Cart when clear
                $('.cartcontainer').toggle();
                $('#clear').on('click', function(){
                    $('.cartcontainer').hide();
                    $('.cartText').show(); 
                });

        //Close cart when X
            $('.close').on('click',function(){
                $('.cartcontainer').fadeOut();
            });

                
     


    }

    //the middle guy
    
    beforeItemIsDeleted(sku,thisShoppingCart){

        return function(e){
            thisShoppingCart.removeItemFromCart(sku);
        }
        
    }

    //remove items from cart and session storage

    removeItemFromCart(sku,theApp,btn){
            console.log('i am in the function')
            // let deleteQty = document.getElemenyById(actualProduct.sku);
            // console.log(deleteQty);
            
            $("[data-sku='"+sku+"']").closest(".CartDiv").remove();


            
           sessionStorage.removeItem(sku);
    }            
    
    updateQuantityofItemInCart(sku,theApp,products){
                    let product = sessionStorage;
                    console.log(product);
                    

                }
                
                


                // sessionStorage.getItem(sku);
   
       
        
                

    
        ///clears session storage

    clearCart(){
        sessionStorage.clear();
        $(".viewCart").html("");

        
    }


}
