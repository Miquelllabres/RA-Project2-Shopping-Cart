// $(document).ready(function(){
// //      $('.owl-carousel').owlCarousel({
// //     rtl:true,
// //     loop:true,
// //     margin:10,
// //     nav:true,
// //     responsive:{
// //         0:{
// //             items:1
// //         },
// //         600:{
// //             items:2
// //         },
// //         1054:{
// //             items:4
// //         }
// //     }
// // })
$(document).ready(function(){
      $(".addtocart").on("click", function (){
        var inputField = parseInt($("#cartQty").val()); // increaSE VALUE BY WHEN CLICK THE BUTTON
            $("#cartQty").val(inputField + 1);

    });
     $(".addtocart").click(function(){ //shows the input for cart quantities
    $("#cartQty").show();
})
     $("input.button").on("click",function() {
         alert('Thank you for Subscribing');
     })
 });

// var msg = 'Thank you for Subscribing!!!';
// function updateMessage(){
  
//   var el = document.getElementsByClassName ('sub-form');
//   el.textContent = msg;
// }
// updateMessage();
// button.addEventListener("click",updateMessage, false)



