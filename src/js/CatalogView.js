/**
 * CTemplate by Edward_J_Apostol finished by Miguel LLabres.
 */

// this class is responsible for displaying the product data...
// Perhaps in a carousel.
export default class CatalogView{

    constructor(){
        this.carousel = document.getElementsByClassName("owl-carousel");
        
       

    }

    initCarousel(){

    // console.log("hi there");
    // console.log("initializing carousel");
    $(document).ready(function(){
     $('.owl-carousel').owlCarousel({
    rtl:true,
    // loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1054:{
            items:4
        }
    }
});
 });
             
    }

    clickQuickView(theApp,products){
        // console.log('middle guy');
        return function(e){
            let theSku = e.target.getAttribute("data-sku");
            // console.log(theApp.products);
            theApp.shoppingCart.quickViewItems(theSku,theApp.products,theApp);
        }
     
}

    onClickCartButton(theApp){
       
        return function(e){
        let theSku = e.target.getAttribute("data-sku");
        theApp.shoppingCart.addItemToCart(theSku);   

    }
}

    addProductsToCarousel(products,theApp){

        this.theApp = theApp;


        if (products === undefined || products == null){
            return ; // do not do anything! there is no data
        }

        /* the loop creates all the elements for each item in the carousel.
         * it recreates the following structure
         * <div class="product-wrapper">
         * <img src="images/stretch-knit-dress.jpg" alt="Image of stretch knit dress" />
         * <p class="product-type">Dresses</p>
         * <h3>Stretch Knit Dress</h3>
         * <p class="price">$169.00</p>
         * </div>
          * */
        for (let p=0; p<products.length; p++){
            let product = products[p];
            console.log(product);
            // each product is a product object
            // use it to create the element

            // create the DIV tag with class 'product-wrapper'
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","product-wrapper");
            // newDiv.setAttribute("class","owl-item");

            // create a new IMG tag. Suggest to add data-sku attribute here too
            // so that if you 'click' on the image, it would pop up a quick-view
            // window and you can use the sku.
            let newImg = document.createElement("div");
            newImg.setAttribute("style",`background-image: url('${product.image}');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;`);
            newImg.setAttribute("alt", `${product.name}`); // this works too
            newImg.setAttribute("data-sku",product.sku);

            let newHr = document.createElement("hr");


            // create a new H3 tag to show the name
            let newH3Tag = document.createElement("h3");
            newH3Tag.setAttribute("class","marginxs greytext uppercase")
            let newH3TagTextNode = document.createTextNode(product.manufacturer);
            newH3Tag.appendChild(newH3TagTextNode);

            // create a new Paragraph to show a description
            let newPara = document.createElement("p");
            newPara.setAttribute("class","product-type");
            let newParaTextNode = document.createTextNode(product.name);
            newPara.appendChild(newParaTextNode);

            

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class","price greentext");
            let newPriceParaTextNode = document.createTextNode("$" + product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            /* you will need similar code to create
            an add to cart and a quick view button
            remember that each button you create should have
            a data-sku attribute that corresponds to the sku
            of each product.
            */
            let quickView = document.createElement("button");
            quickView.setAttribute("class","quickview");
            quickView.setAttribute("data-sku",product.sku);
            quickView.setAttribute("id",`qv_${product.sku}`);
            quickView.setAttribute("type","button");
            let quickViewTextNode = document.createTextNode("Quick View");
            quickView.appendChild(quickViewTextNode);
            quickView.addEventListener("click",this.clickQuickView(this.theApp),false);



            let addToCart = document.createElement("button");
            addToCart.setAttribute("class","addtocart");
            addToCart.setAttribute("data-sku",product.sku);
            addToCart.setAttribute("id",`cart_${product.sku}`);
            addToCart.setAttribute("type", "button");
            let addToCartTextNode = document.createTextNode("Add To Cart");
            addToCart.appendChild(addToCartTextNode);
            addToCart.addEventListener("click",this.onClickCartButton(this.theApp),false);

            


            newDiv.appendChild(newImg);
            newDiv.appendChild(newHr);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPara);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(addToCart);
            newDiv.appendChild(quickView);
            this.carousel[0].appendChild(newDiv);
        }


         this.initCarousel();

    }

}
