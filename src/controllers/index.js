/* Read this file after reading app.js and router.js.

   This is our index.js for the controllers folder. As discussed at the top of
   router.js, the index.js file is a special file in any folder. If someone
   writes code that requries an entire folder, what they are really doing is
   importing the index.js file from that folder. It serves as an interface for
   the folder.

   Normally this controllers folder would have many other files in it, all of
   which would be imported and exported through index.js. However, for now we
   will just put everything in this file.
*/

// Pull in the path library.
const path = require('path');

// There is no reason for the name here except an arbitary example
// of updating the server data based on a client request.
let name = 'unknown';

/* Here we see a basic express-style handler function. In this case, we want
   to send back the index.html file. We accept req and res (request and response).
   We then use the built in response.sendFile() function to send a file back.
   We could potentially just use our static file hosting function from app.js to
   serve all these static html files, but our next demo will look into using views
   and we will want our code broken out like this.

   Functions like res.sendFile() are convenience functions built into the response
   by express. They work similarly to our own respond() function from previous demos.
   They will properly read in the given file, set the headers (including the
   content-type based on the extension), write the response body, and send the response.
*/
const hostIndex = (req, res) => res.sendFile(path.resolve(`${__dirname}/../../views/index.html`));

// Same thing as hostIndex but for a different html page.
const hostPage1 = (req, res) => res.sendFile(path.resolve(`${__dirname}/../../views/page1.html`));

// Same thing as hostIndex but for a different html page.
const hostPage2 = (req, res) => res.sendFile(path.resolve(`${__dirname}/../../views/page2.html`));

/* Here we see another feature of express response functions. They can be chained together.
   For example, here we want to send back the notFound.html page with a 404 status code.
   By default, express sends everything with a 200 status code, but we can call the
   res.status() function to change that status code. After we do that, we can just chain on
   our sendFile function to send back the notFound.html file.

   res.status() is not a terminating function, meaning it does not immediately send the response.
   res.sendFile() is, however, a terminating function and it will send the response.
*/
const notFound = (req, res) => res.status(404).sendFile(path.resolve(`${__dirname}/../../views/notFound.html`));

/* Especially when making a data API, many of our handler functions won't send back a file.
   Instead, we want to send back a json object or other type of data. Here we see an example
   of the res.json() function. This function does everything we need to send an object back
   to the user as json including setting the content-type header to 'application/json',
   stringifying our object, putting it in the response body, and sending the response back.
*/
const getName = (req, res) => res.json({ name });

// Below is an example of a POST request handler for setName.
const setName = (req, res) => {
  /* First, we can see that req.body contains the firstname and lastname sent by the client.
     In the past, we would have had to parse this information out for ourselves but the
     express.urlencoded() middleware that we added in app.js has automatically parsed the body 
     and placed it in req.body for us before this function has even been called.
  */
  console.dir(req.body);

  /* Now that we have our req.body, we can confirm all the information we are expecting is
     there. If we don't have it, send back a 400 status code with an error message. Otherwise
     we will continue on.
  */
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({
      error: 'firstname and lastname are both required',
      id: 'setNameMissingParams',
    });
  }

  // If we have both, set the name.
  name = `${req.body.firstname} ${req.body.lastname}`;

  // And then return it to the user
  return res.json({ name });
};

// Export our handler functions
module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  notFound,
  getName,
  setName,
};
