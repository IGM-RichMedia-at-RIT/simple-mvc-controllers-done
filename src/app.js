/* Now that we are using Express.js (https://expressjs.com/) our server is now abstracted
   into an "application" or "app". This app is an encapsulation of all the server code that
   we are writing, and it allows express to do a ton of work for us. app.js is essentially
   the new version of our older server.js. This file is largely responsible for all the
   initial setup that way other files can worry about the handling of requests, etc.
*/

// Import our libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

// Import our "router" function from our router.js file.
const router = require('./router.js');

// Setup our port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Using express, create our logical "app". Remember, this is the
// encapsulated version of our server.
const app = express();

/* Our first exposure to the benefits of using a framework like express is shown on the
   line below. In the past, if we wanted our server to host 100 images, we would need to
   write 100 handler functions that could handle requests to urls to serve those images.
   However, with express (the express static file hosting function) we can do just that.

   First, we say app.use, to say "our server will use the following". We then provide the
   function with a valid url. This means any requests that are made to that url will be
   handled by the function passed in as the second parameter.

   Our second parameter is the built in express.static function, which is for static
   file hosting. We pass to this function a folder path. Express.static will essentially
   loop through that entire folder and create endpoints for every single file contained
   within that folder and host them at the /assets root endpoint. For example, our client
   folder contains an image called internet.png. After the following line of code executes,
   I can go to my server and go to /assets/img/internet.png and the image will load without
   me having to write my own handler function for that url.
*/
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));

/* Express apps make use of a middleware plugin system that allows us to leverage many
   powerful and helpful npm packages to do a ton of work for us. It is important to note
   that express doesn't innately support every npm package, only ones built to work with it.
   Luckily, express is wildly popular and do there are many plugins that work with it.

   Here, we are telling our app to use the compression() middleware plugin
   (https://www.npmjs.com/package/compression). The compression plugin will attempt to
   compress all outgoing traffic from our server. This means our server should have faster
   response times because the packages it sends to the client through the internet are as small
   as possible. With just the following line of code, all our responses will automatically be
   compressed if possible. The browser knows how to uncompress these responses.
*/
app.use(compression());

/* The next plugin we use is called bodyParser. In the past, we had to write a number of async
   event handlers and functions to turn a POST request body or GET request query params into
   a usable object. The bodyParser library automatically does this work for us.

   This specific line parses data in the x-www-form-urlencoded format. There are also
   functions like bodyParser.json(), which parse other formats (like json).
   https://www.npmjs.com/package/body-parser

   When our app recieves a request with query params or a body, the bodyParse library will
   automatically take that information and store it in req.body or req.query. Additionally
   it's extended: true option makes it convert types (since by default everything would be
   a string). We do not need to do anything additional to get this to work.
*/
app.use(bodyParser.urlencoded({ extended: true }));

/* We also make use of the serve-favicon library. https://www.npmjs.com/package/serve-favicon.
   This library handles all of the annoying favicon requests that the browser will make over
   and over again. Simply give it an image, and it does all the optimization and caching
   to stop the browser from agressively asking for the favicon.
*/
app.use(favicon(`${__dirname}/../client/img/favicon.png`));

/* After setting up all our plugins, we are almost done configuring our application. The
   last thing we need to do before starting the application is tell it how to handle all
   our various endpoints and urls. In an attempt to organize our code, we have moved those
   concerns into the router function in router.js. We pass our app in there to continue
   configuring it.
*/
router(app);

/* Once our app has been configured and our routes have been added by our router
   function, we can start up our application. We simply tell it to listen to our port,
   and then either throw an error if it fails or print out that we are listening on that port.
*/
app.listen(port, (err) => {
  if (err) { throw err; }
  console.log(`Listening on port ${port}`);
});
