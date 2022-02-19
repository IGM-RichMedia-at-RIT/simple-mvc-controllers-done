/* This router file exists to add endpoint handlers to our app that we started
   making in app.js.

   First thing we do is import the ./controllers folder. Note that we are not
   specifically importing a code file but instead are importing an entire folder.
   When you do this, node will look for a file in that folder called index.js.
   That file serves as an "interface" for the entire folder.

   We will see this used in a more robust way in future demos.
*/
const controllers = require('./controllers');

/* This file exports one thing: the router function. It accepts our express app,
   and adds various endpoint routes to it. This is similar to something like the
   urlStruct that we used in older demos. Unlike those demos, we no longer have an
   "onRequest" function that we must write. Express now maintains that for us. Instead,
   we simply tell it what urls and methods map to which handler functions.
*/
const router = (app) => {
    /* To create one of these maps, express apps expose some very easy to use
       functions for us. A function exists for each http request method. For example,
       we have looked at GET, HEAD, and POST requests thoroughly in the past. Express
       has an app.get(), app.head(), and app.post() function. The first parameter for
       these is always the url endpoint that we want to handle. The second parameter in
       these examples is the handler function that will be called for that method and url.

       For example, the following line of code routes all GET requests to /page1 to the
       controllers.page1 function. The following line routes all GET requests to /page2 to
       the controllers.page2 function.
    */
    app.get('/page1', controllers.page1);
    app.get('/page2', controllers.page2);

    // Handler for GET /getName that maps to controllers.getName
    app.get('/getName', controllers.getName);

    // Handler for GET / that maps to controllers.index
    app.get('/', controllers.index);

    /* When express sets up all of these routing functions, it logically organizes them
       in the order that we set them up. The line below is our last GET request handler.
       You'll notice that the url looks a little strange: /*. The * in this case is a
       wildcard character. That means anything that follows the / will match with this url.
       Because it is the last GET request handler we are setting up, it will first check the
       urls above. If none of them match, everything will match with this. Think of it
       as our "fallback" or "default" statement. We will route everything else to our notFound.
    */
    app.get('/*', controllers.notFound);

    /* All the handlers above are for GET requests, but the following handler is for POST
       requests to /setName. While the comment above mentions that the requests are checked
       against the endpoints in the order they are added to the app, it only checks endpoints
       that match the correct request method. Even though there is a wildcard above this line,
       it is for GET requests, so our setName POST request will still make it to this function.
    */
    app.post('/setName', controllers.setName);
};

// export the router function
module.exports = router;
