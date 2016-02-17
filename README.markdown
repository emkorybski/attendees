# Attendees app

Created using Slim PHP micro-framework for the API part and Materialize CSS UI library for the API-consuming page.

### Quick install
Grab the .zip or clone repository in your web server root.
You can put it alongside your other projects - this is what I did, accessing the app UI with `localhost/attendees/index.html`, where `/attendees` part of the URL path corresponds to the name of your folder in server root.
Development has been done on Windows machine with IIS but there is `.htaccess` set up for Apache too.
Hopefully line endings will not be a problem.

## Features
* The API is RESTful and returns results in JSON format
* The API has an endpoint to return a list of all conference attendees, using `localhost/attendees/attendees`
* It also returns details for each attendee, e.g `localhost/attendees/attendees/9649`
* Pagination implemented
* BONUS: Interleaving results by interest implemented, they get highlighted at the top of results listing. There is an API endpoint `localhost/attendees/interests/` to return list of interests to populated dropdown of a UI control

## A few screen grabs
* http://screencast.com/t/zlCsRmIArNB
* http://screencast.com/t/K8s1u0ofdHp
* http://screencast.com/t/bxTb9Knf0f2
* http://screencast.com/t/8oaC3DMxH

### System requirements

You need **PHP >= 5.3.0**.
New, standards-supporting browser such as Chrome or Opera.


### Setup your web server
If you are using Wordpress then I presume your Apache has mod_rewrite module enabled or your IIS has url_rewrite module installed.
Necessary respective `.htaccess` or `Web.config` files are already present in the project folder.


