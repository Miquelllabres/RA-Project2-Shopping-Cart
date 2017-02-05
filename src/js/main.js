            //*********
            //OVERLAY
            //*********
            $('#cartIcon').click(function(){
            $('#overlay').fadeIn()
            });


            $('.close').click(function(){
            $('#overlay').fadeOut();

            });
            $('#clear').click(function(){
            $('#overlay').fadeOut()
            });

            // $(window).on("click", function(){
            //     $('#overlay').fadeOut();
            // });

            //smooth scroll

            $("a").on('click', function(event) {

            if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;


             $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 800, function(){                    
                    window.location.hash = hash;
                  });
                } 
              });

            $('.button').on('click', function(){
                  $('#form').hide();
                  $('.message').show();
            });

            // $('.addtocart').on("click", function(){
            //       $('.addedProductCart').show();
            //         });