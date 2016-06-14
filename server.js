// loads in http
var http = require('http')
// loads in file system for loading exterior html files
var fs = require('fs')
// router object for routing page views
var route = {
  home: 'index.html',
  about: 'about.html',
  contact: 'contact.html',
  error: '404.html'
}
// registers new route
function registerRoute(name, file) {
  route[name] = file
}
// counter for page views
var counter = 0
// functions that the server runs in the background
var server = http.createServer(function(req, res){
  // rendering function to reduce redundancy
  function render(route){
    fs.readFile(route, function(err, data){
      if (err) {
        console.log(err)
      } else {
        res.end(data)
      }
    })
  }
  // conditionals that route to different pages
  if (req.url === '/') {
    counter++
    render(route.home)
    console.log(counter)
  } else if (req.url === '/about') {
    render(route.about)
  } else if (req.url === '/contact') {
    render(route.contact)
  } else {
    render(route.error)
  }
})
// initializes the server
server.listen(3000, function(){console.log('welcome!');})
registerRoute('show', 'show.html');
console.log(route)
