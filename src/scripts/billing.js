$(document).on('ready', function() {
  fadeInAll()
    //sanity check
    console.log('sanity check with billing js');

    //Stripe Public Keys
    //  test publishable: pk_test_hs0sBTr45jm1KOmFEE4bDAOU
    //  test secret: sk_test_C6yqB06zrJzrwQRDNDFVtl8T

    buildStatesSelector();
 
    checkShoppingCart();


    $('#purchaseButton').click('submit', function( event ) {
      //ensure that the submit doesn't go to a server
      event.preventDefault();

      var error = false;

      // Get the values:
      var ccNum = $('.creditCardNumber').val(),
          cvcNum = $('.cvc').val(),
          expMonth = $('.expMonth').val(),
          expYear = $('.expYear').val();

      // Validate the number:
      if (!Stripe.card.validateCardNumber(ccNum)) {
          error = true;
          //reportError('The credit card number appears to be invalid.');
          var message = 'credit card number is invalid';
      }

      // Validate the CVC:
      if (!Stripe.card.validateCVC(cvcNum)) {
          error = true;
          //reportError('The CVC number appears to be invalid.');
          var message = 'The CVC number appears to be invalid.';
      }

      // Validate the expiration:
      if (!Stripe.card.validateExpiry(expMonth, expYear)) {
          error = true;
          var message = 'The expiration date appears to be invalid.';

          console.log('in the validate expiration');

      }

      if (error === true) {
          console.log('in the response.error handler');
          $('#valid-callout').css('background-color', 'red');
          $('#valid-callout').text(message);
          $('#valid-callout').css('visibility', 'visible');
        } else {

          if (!error) {
            // Get the Stripe token:
            Stripe.card.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
          }
     }

     function stripeResponseHandler(status, response) {
       console.log('in stripe response handler');
          if (response.error) {
              console.log('in the response.error handler');
              $('#valid-callout').css('background-color', 'red');
              $('#valid-callout').text(message);
              $('#valid-callout').css('visibility', 'visible');
            } else { // No errors, submit the form.
              console.log('no errors submit the form.');
              var message = "Payment Complete - Thank You!"
              $('#valid-callout').css('background-color', 'green');
              $('#valid-callout').text(message);
              $('#valid-callout').css('visibility', 'visible');

              return;
          }
      }

    });

    //ensure that shipping copies to billing
    //ensure that when uncheck billing is left blank
    $("#isSameAsShipping").click(function(){
      if(this.checked) {
        //populate billing info fields
        $('.billingFirstName').val($('.shippingFirstName').val());
        $('.billingLastName').val($('.shippingLastName').val());
        $('.billingCompany').val($('.shippingCompany').val());
        $('.billingAddressLine1').val($('.shippingAddressLine1').val());
        $('.billingAddressLine2').val($('.shippingAddressLine2').val());
        $('.billingCity').val($('.shippingCity').val());
        $('.billingState').val($('.shippingState').val());
        $('.billingZip').val($('.shippingZip').val());
      } else {
        //clear all billing info fields
        $('.billingFirstName').val('');
        $('.billingLastName').val('');
        $('.billingCompany').val('');
        $('.billingAddressLine1').val('');
        $('.billingAddressLine2').val('');
        $('.billingCity').val('');
        $('.billingState').val('');
        $('.billingZip').val('');
      }
    });




});


function buildStatesSelector() {
    usStates.forEach(function(s){
      //limit the window of the state list
      $('.shippingState').attr('size', '1');
      $('.billingState').attr('size', '1');
      $('.shippingState').append('<option>' + s.abbreviation + '</option>');
      $('.billingState').append('<option>' + s.abbreviation + '</option>');
    });

    return;
  }

  function checkShoppingCart() {
    $('#shoppingCartTable').append('<thead>');
    $('#shoppingCartTable').append('<th id="item">Items</th>');
    $('#shoppingCartTable').append('<th id="item">Quantity</th>');
    $('#shoppingCartTable').append('<th></th>');
    $('#shoppingCartTable').append('<th id="cost">Cost</th>');
    $('#shoppingCartTable').append('<th></th>');
    $('#shoppingCartTable').append('</thead>');
    $('#shoppingCartTable').append('<tbody>');
    $('#shoppingCartTable').append('</tbody>');
  }

  function fadeInAll () {
    $('#fade').fadeIn(800)
  }
