

export default class ShoppingCart{



    constructor(){
        this.viewcart = document.getElementsByClassName("viewCart");
        this.quickview = document.getElementById("#myModal");
        this.getCartTotal();
       
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        
    }

    addItemToCart(sku){

        //session storage//

         if (typeof(Storage) !== "undefined") {

            if (sessionStorage.getItem(sku.toString()) !== null){
                 
                let currentValue = sessionStorage.getItem(sku);
                // console.log(currentValue);
                currentValue = parseInt(currentValue);
                currentValue = currentValue + 1;
                currentValue = currentValue.toString();
                sessionStorage.setItem(sku, currentValue);

            }

            else{


                // console.log("This is a new sku");
               sessionStorage.setItem(sku.toString(),"1");
                // total = total + total;
                $('.cartText').hide();

            }

        } else {
            console.error("Error! SessionStorage not supported in your browser!");
        }
                    
                    if( sessionStorage.getItem("quantity") == undefined){
            sessionStorage.setItem("quantity",1);
        }
        else{
            let newQuantity = sessionStorage.getItem("quantity");
            newQuantity = parseInt(newQuantity);
            newQuantity +=1;
            sessionStorage.setItem("quantity",newQuantity);
        }
                    this.getCartTotal();
                    $("#cartQty").show();
            
                 }

    quickViewItems(sku, products,theApp){
        // this.addItemToCart(sku)
        let output = "";
        $('#myModal').fadeIn();
        $('.closep').on('click', function(){
            $('#myModal').fadeOut();
        });
       
            for (let p=0; p<products.length; p++){
            let product = products[p];
            let productSku = product.sku;
            console.log(product);


                if (product.sku.toString() == sku.toString() ){
                    // console.log(products[currentProduct]);//actual products
                    let img = product.image;
                    let name = product.longDescription;
                    let price = product.regularPrice;
                    let info = product.manufacturer;

                    output = `<div class="Item-content flex">
                   
                      <img class='cartimage' height="250" width="300" src=${img}>
                    <hr>
                   <div class=" textcenter">
                        <p class="greytext marginxs">${info}</p>
                       <h3 class="black"> ${name}</h3>  
                       <p class="greentext marginxs">$ ${price}</p>
                       <button class="addtocart" id="QVaddtoCart" type="button" data-sku=${productSku} >Add to cart</button>
                   </div>
                 </div>`;
           }

   }
   $("#content").html(output);

        let QVaddtoCart = document.getElementById("QVaddtoCart");

        QVaddtoCart.addEventListener("click",theApp.catalogView.onClickCartButton(theApp),false);


}


    //gets total on session storage and display on the cart icon
    getCartTotal (){
        if (sessionStorage.getItem('quantity') !== "undefined") {
            // $("#cartQty").hide();
            let currentVal = sessionStorage.getItem('quantity');
            $("#cartQty").val(currentVal);

            
                
            }else {
                $("#cartQty").hide();
            }
        }
        
        


    createCartView(products){
       
        if (typeof(Storage) === null) {
            

            $('.cartText').show();
        }
                 
        
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
                    qty.setAttribute("id",`qty_${actualProduct.sku}`)
                    qty.setAttribute("class","qty greytext");
                    qty.setAttribute("type", "number");
                    qty.setAttribute("style",`border:1px solid green;`)
                    qty.setAttribute("data-sku", `${actualProduct.sku}`);
                    qty.setAttribute("value",`${sessionStorage[sku]}`);
                    let qtyTextNode = document.createTextNode("Quantity");
                    qty.appendChild(qtyTextNode);



                    let total = document.createElement('p');
                    total.setAttribute("class","greentext");
                    let totalTextNode = document.createTextNode("total " + "$" + `${sessionStorage[sku]}` * `${actualProduct.regularPrice}`);
                    total.appendChild(totalTextNode);


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
                    update.addEventListener("click",this.beforeUpdateQuantityofItemInCart(actualProduct.sku,products),false);

                    
                    // let total = document.getElemenyById("cartQty");
                    // total.setAttribute("value",`${sessionStorage[totalQuantity]}`);


                
                    newDiv.appendChild(idDiv)
                    idDiv.appendChild(newImg);
                    idDiv.appendChild(newH3Tag);
                    idDiv.appendChild(newPara);
                    idDiv.appendChild(qty);
                    idDiv.appendChild(total);
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

    removeItemFromCart(sku,theApp){
            

            
            $("[data-sku='"+sku+"']").closest(".CartDiv").remove();


            
           sessionStorage.removeItem(sku);
    }            

    beforeUpdateQuantityofItemInCart(sku,products){
            console.log(this);
            let self = this;

        return function(e){
            self.updateQuantityofItemInCart(sku,products);
            // console.log(products);
        }
        
    }
    
    updateQuantityofItemInCart(sku,products){
        // console.log(products);

        for (let p=0; p<sessionStorage.length; p++){
            let currentSku = sessionStorage.key(p);
            let actualqty = sessionStorage.getItem(currentSku);
            // console.log(actualqty);

            if(currentSku !== "quantity"){
                let inputSku = document.getElementById("qty_"+currentSku);
                let inputVal = document.getElementById("qty_"+currentSku).value;
                // console.log(inputVal);

                if(inputVal.toString()!== actualqty.toString()){
                    sessionStorage.setItem(currentSku,inputVal);

                    let newQuantity = sessionStorage.getItem("quantity");
                    newQuantity = parseInt(newQuantity);
                    inputVal = parseInt(inputVal);
                    actualqty = parseInt(actualqty);
                    newQuantity = newQuantity + inputVal - actualqty;
                    // console.log(newQuantity);
                    sessionStorage.setItem("quantity",newQuantity);
                }
            }


        

        // let value = document.getElementById(`qty_${product.sku}`);
        // console.log(value);


                    // let product = $("[data-sku='"+sku+"']");
                    // console.log(product);
                    

         }   
         
         this.createCartView();
         this.getCartTotal();
         $('#overlay').fadeOut();




         

                
                
    }


        ///clears session storage

    clearCart(){
        sessionStorage.clear();
        $(".viewCart").html("");

        
    }


}
