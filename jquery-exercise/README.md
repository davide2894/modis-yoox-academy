# Post Manager
This project has two versions:
* **development**, based in `src/`. This is what you can work on.
* **production**, based in `dist/`. This contains the project live version


## Installing
To start working, you need to install all the `gulp` dependencies listed in `package.json`.

On command line, execute the following:
`npm install`

Now you can just run the `gulp` command to start the default task. This will do the following:
* start the local development server
* listen for changes in all `.html`, `.js`, and `.css` files, and refresh the browser page.

Now you can enjoy a faster workflow. No more manual refreshes! 

To style the page, use Sass. You can find the `scss/` folder to work on it.


## Production
To build the production version of the file, run the following command:
`gulp build`

When you run it, this is what happens:
* if there is an existing `dist/` folder, gulp deletes it
* a new, empty `dist/` folder is created. This will contain the production version of this project
* `js` files are concatenated in one unique file, `all.js`. This gets minified
* css files are concatenated into one as well, `all.css`. This get minified too
* for both `.js` and `.css` files it creates sourcemaps 
* all images are compressed
* if there is any `fonts/` folder, it gets copied into `dist/`
