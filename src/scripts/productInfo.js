var tacocat = []
var promise = Promise.resolve($.ajax({
  url: 'https://galvanize-student-apis.herokuapp.com/gcommerce/products/',
  method: 'GET'
})).then(function (data) {
  tacocat = data
  for(var i = 0; i < data.length; i++){
    tacocat[i].productImages = imgs[i]
    tacocat[i].productNames = Names[i]
  }
  return tacocat
})

var imgArr = ["./src/images/Ping-Pong-HD-2.jpg", "./src/images/ping-pong-table.jpg", "./src/images/2699170.jpg"]
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


var cartNumber = 0
