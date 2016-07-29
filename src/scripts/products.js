$(function () {
  fadeInAll()
  console.log($('#testing').attr('href'));
  $('.badge').text(window.location.search.split('=')[1])
  console.log($('#testing').attr('href'));
  var promise = Promise.resolve($.ajax({
    url:'https://galvanize-student-apis.herokuapp.com/gcommerce/products/',
    method: 'GET'
  }))
  .then(function (data) {
    var AustinData = data
    for(var i = 0; i < data.length; i++) {
      products.push('<div class="productDiv text-center" id="product' + i + '"><img class="austinImg" src="' + imgs[i] +'"/><h3>' + Names[i] + '</h3> <p>' + data[i].description + '</p><p class="valueOf">' + data[i].price + '</p><div class="rating"><div class="bar b1"></div><div class="bar b2"></div><div class="bar b3"></div><div class="bar b4"></div><div class="bar b1"></div></div><div class="AddCart">Add to Cart</div>')
      $('.productHolder').append(products[i])
      AustinData[i].productImages = imgs[i]
      AustinData[i].productNames = Names[i]
      loadLow(data)
      barHover()
      DivHover()
      AddCartNum()
    }
    var allProducts = $('.productDiv')

    $('#highorlow').change(function() {
      var arrhigLow = $('.productDiv')
      $('.productHolder').empty()
      for(var i = 0; i < arrhigLow.length; i++) {
        $('.productHolder').prepend(arrhigLow[i])
      }
      barHover()
      DivHover()
      AddCartNum()
    })

    $('#filtereds').change(function() {
      var firstNum = parseFloat($('input[name=filtered]:radio:checked').val().split('-')[0])
      var secNum = parseFloat($('input[name=filtered]:radio:checked').val().split('-')[1])
      var products = []
      if($('#lowHigh').is(':checked')) {
      for(var i = 0; i < allProducts.length; i++) {
        console.log();
        if(firstNum < parseFloat($(allProducts[i]).children()[3].textContent.substr(1)) && parseFloat($(allProducts[i]).children()[3].textContent.substr(1)) < secNum ) {
          products.push(allProducts[i])
        }
      }
      $('.productHolder').empty()
      products.forEach(function(divsWPic) {
        $('.productHolder').append(divsWPic)
      })
      barHover()
      DivHover()
      AddCartNum()
    } else {
      for(var i = 0; i < allProducts.length; i++) {
        console.log();
        if(firstNum < parseFloat($(allProducts[i]).children()[3].textContent.substr(1)) && parseFloat($(allProducts[i]).children()[3].textContent.substr(1)) < secNum ) {
          products.push(allProducts[i])
        }
      }
      $('.productHolder').empty()
      products.reverse()
      products.forEach(function(divsWPic){
        $('.productHolder').append(divsWPic)
      })
      barHover()
      DivHover()
      AddCartNum()
    }
    })
  })

  function barHover(){
    $('.bar').hover(function(){
      $(this).css('background-color', 'black')
      $(this).prevAll().css('background-color', 'black')
      $(this).nextAll().css('background-color', 'white')
    })
  }

  function DivHover(){
    $('.productDiv').hover(function(){
      $(this).children().last().fadeIn()
    }, function(){
      $(this).children().last().fadeOut()
    })
  }

  function AddCartNum() {
    $('.AddCart').click(function() {
      var productPrice = parseFloat(this.parentNode.getElementsByClassName('valueOf')[0].textContent.substr(1))
      var productName = this.parentNode.getElementsByTagName('h3')[0].textContent
      $(this).fadeOut(100).fadeIn(10)
      // cartNumber += 1
      // $('.badge').text(parseInt($('.badge').text())+1)
      cartContents.push({[productName]: productPrice})
      // createTable(cartContents)
      // console.log(cartNumber);
      // window.Location += '?checkout=0'
      // console.log(window);
      var newURL = $('#testing').attr('href').substr(0,23)
      var newNum = parseInt($('#testing').attr('href').substr(23)) +1
      $('#testing').attr('href', newURL + newNum)
      console.log($('#testing').attr('href'));
      $('.badge').text($('#testing').attr('href').substr(23))
    })

  }

  function sortNumber(a,b) {
    return a - b;
  }

  function loadLow(data) {

    var arrLowHigh = []
    var objLowHigh = {}
    data.forEach(function(obj) {
      arrLowHigh.push(obj.price.substr(1))
    })

    $('.productHolder').empty()
    for(var i = 0; i < arrLowHigh.length; i++){
      objLowHigh[arrLowHigh[i]] = i+1
    }
    arrLowHigh = arrLowHigh.sort(sortNumber)
    arrLowHigh.forEach(function(price){
      $('.productHolder').append(products[objLowHigh[price]-1])
    })
  }

  function createTable(data){
    $('.idk').empty()
    $('.idk').append('<table>  <thead>  <th>Item</th> <th>Quantity</th> <th>Price</th>  </thead> <tbody class="realData"> </tbody>  </table>')

    for(var i = 0; i < data.length; i++){
      $('.realData').append('<tr id="row'+i+'"> </tr>')
    }
    for(var i = 0; i < 3; i++){
      $('tr').append('<td></td>')
    }
    for(var i = 0; i < data.length; i++){
      for(key in data[i]){
        $('#row' + i +' td:nth-child(1)').html(key)
        $('#row' + i +' td:nth-child(2)').html('1')
        $('#row' + i +' td:nth-child(3)').html(data[i][key])
      }
      // $('#row' + i +' td:nth-child(2)').html(data[i].productNames)
    }
  }
})


var imgs = ['https://s-media-cache-ak0.pinimg.com/236x/f7/de/ed/f7deedb246866ed4b0b2aab9bd3b7676.jpg',
'http://2.bp.blogspot.com/-u66toyzKzUo/VCStwUNksjI/AAAAAAAABH0/h2WAJYGiasY/s1600/Rainbow%2Blighted%2Bping%2Bpong%2Btable.jpg',
'http://assets.nydailynews.com/polopoly_fs/1.2155594.1426789136!/img/httpImage/image.jpg_gen/derivatives/landscape_1200/glass-ping-pong-table.jpg',
'http://slippedydodah.com/images/table/Poly%20Pong%204way-ping%20pong.jpg',
'https://www.iwantmoretoys.com/images/products/floating-pool-ping-pong-table.jpg',
'http://www.toxel.com/wp-content/uploads/2009/08/pingpong02.jpg',
'https://playenthusiast.files.wordpress.com/2011/06/table-tennis-003.jpg',
'http://odditymall.com/includes/content/table-tennis-door-thumb.jpg',
'http://www.earthlymission.com/wp-content/uploads/2015/03/circular-ping-pong-table-1.jpg',
'https://metrouk2.files.wordpress.com/2016/07/ad213894936pic_shows_ping_.jpg',
'http://static4.businessinsider.com/image/4fb129d3eab8ea9c09000002-900/were-not-sure-if-this-is-just-a-regular-table-or-if-its-a-six-person-ping-pong-table.jpg',
'http://67.media.tumblr.com/50df10f236e47183738231880d5f4c12/tumblr_mx65t2QSjW1rouua1o6_1280.jpg', 'http://tabletennisnation.com/wp-content/uploads/2013/09/Full-table+Medium.jpg', 'http://tabletennisnation.com/wp-content/uploads/2012/01/52ac18c78972137508a9a48dd702df84-677x385.jpg']
var Names = ['Tube Table','Glowing Table','Glass Table', 'WTF Table', 'Pool Table', 'Wall Table', 'Figure 8', 'Door Table', 'Round Table', 'Car Table', 'Pie Table', 'Multi Table', 'Wing Table', 'WhoDoesThis Table']

var products = []
var cartContents = []

function productImgs() {
  return imgs
}

function NamesOf() {
  return Names
}

function productsContent() {
  return products
}

function productArray(data){
  return data
}

function getCartContents(){
  return cartContents
}

function fadeInAll () {
  $('#fade').delay(200).fadeIn(800)
  }
