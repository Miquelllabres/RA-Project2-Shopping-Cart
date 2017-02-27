export default class StripePayment {
	constructor() {
		this.token = {};
		
	}

	newToken(theApp){
		let $form = $('#payment-form');
		let thisStripePayment = this;
		$form.submit(function(e){
			event.preventDefault();
	    
	    $form.find('.submit').prop('disabled', true);

	    let error = false;
	  	let ccNum = $('.Cnumber').val();
	  	let cvcNum = $('.cvc').val();
	  	let expMonth = $('.exMon').val();
	  	let expYear = $('.exYear').val();
	  	let total = $('#totalamount').val();

	  	if (!Stripe.card.validateCardNumber(ccNum)) {
	  		error = true;
	  		thisStripePayment.reportError('The credit card number is invalid');
	  	}

	  	if (!Stripe.card.validateCVC(cvcNum)) {
	  		error = true;
	  		thisStripePayment.reportError('The CVC number is invalid');
	  	}
	  	if (!Stripe.card.validateExpiry(expMonth, expYear)) {
	  		error = true;
	  		thisStripePayment.reportError('The expiration date is invalid');
	  	}

	  	if (!error) {
	  		let token = Stripe.card.createToken({
	  			number: ccNum,
	  			cvc: cvcNum,
	  			exp_month: expMonth,
	  			exp_year: expYear,
	  			total: total
	  		}, thisStripePayment.stripeResponseHandler);
	  		   // }, thisStripePayment.dataProcessor(this));
	  		thisStripePayment.success();
	  		
	  		// console.log(token);
	  		// thisStripePayment.token = token;
	  		// console.log(thisStripePayment.token);
	  		console.log('token created');
	  	}


	    // Prevent the form from being submitted:
	    
	    console.log('submitting...');
	    return false;
	  });

		}
	}

