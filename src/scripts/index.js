$(function () {
  //promise to import data from productInfo.js
  promise.then(function (productInfo) {
    var data = productInfo;
    //set first carousel picture

    $('.carouselPic').attr('src', imgArr[0])

    //fn to fade in page
    fadeInAll()
    //fn to start the carousel rotation
    changeImg()

    //loop to dynamically generate random product names, images and prices
    for(var j = 0; j <= 2; j++) {
      var randomSelect = Math.floor(Math.random() * data.length)
      $('.prod' + j).attr('src', data[randomSelect].productImages)
      $('.description' + j + ' h3').text(data[randomSelect].productNames)
      $('.description' + j + ' p').text(data[randomSelect].price)
    }

    var i = 0



    $('#imgLeft').on('click', function () {
      $('.carouselPic').attr('src', imgArr[i]).fadeOut(10)
      i--
      if (i < 0) {
        i = imgArr.length - 1
      }
    $('.carouselPic').attr('src', imgArr[i]).delay(10).fadeIn(500)
    })

  $('#imgRight').on('click', function () {
    $('.carouselPic').attr('src', imgArr[i]).fadeOut(10)
    i++
    if (i > imgArr.length - 1) {
      i = 0
    }
    $('.carouselPic').attr('src', imgArr[i]).delay(10).fadeIn(500)
  })

  $('#input').on('input', function (event) {
    event.preventDefault()
      var input = $('#input').val()
      if(input.indexOf('@') >= 1 && input.indexOf('.com') > input.indexOf('@') + 1) {
        $('#input').css({ 'border': 'none', 'outline': 'none'
        })
        $('#input').css({ 'border': '1px solid blue', 'box-shadow': '0 0 5px blue' })
      } else {
        $('#input').css('outline', 'none')
        $('#input').css({ 'border': '1px solid red', 'box-shadow': '0 0 5px red' })
      }
    })
    $('#button').click(function () {
      var input = $('#input').val()
      if(input.indexOf('@') >= 1 && input.indexOf('.com') > input.indexOf('@') + 1) {
        $('form')[0].reset()
        $('#input').css({ 'outline': 'none', 'box-shadow': 'none', 'border': '1px solid lightgrey' })
      } else {
        $('form').animate({ 'marginLeft': '+=10px' }, 100).animate({ 'marginLeft': '-=10px' }, 100)
        $('#input').css({'border': '1px solid red', 'box-shadow': '0 0 5px red'})
      }
    })
  function changeImg () {
      $('.carouselPic').attr('src', imgArr[i])
    setTimeout(function () {
      if ((i < imgArr.length - 1) && (i >= 0)) {
          $('.carouselPic').attr('src', imgArr[i]).fadeOut(10)
          i++
          $('.carouselPic').attr('src', imgArr[i]).delay(10).fadeIn(800)
      } else {
          $('.carouselPic').attr('src', imgArr[i]).fadeOut(10)
          i = 0
          $('.carouselPic').attr('src', imgArr[0]).delay(10).fadeIn(800)
      }
        changeImg()
    }, 8000)
  }
  function fadeInAll () {
    $('#fade').fadeIn(800)
    $('#header').fadeIn(400)
    $('#main').fadeIn(400)
    setTimeout(function () {
      $('#site-heading h1').fadeIn(600)
      $('.nav').fadeIn(600)
      $('#cart').fadeIn(600)
      setTimeout(function () {
        $('.carouselPic').fadeIn(600)
        $('#imgLeft').fadeIn(600)
        $('#imgRight').fadeIn(600)
        }, 200)
      }, 300)
    }
  })
})
