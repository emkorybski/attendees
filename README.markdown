# Attendees app

Created using Slim PHP micro-framework for the API part and Materialize CSS UI library for the API-consuming page.

## Features

* The API is RESTful and returns results in JSON format
* The API has an endpoint to return a list of all conference attendees, using /attendees
* It also returns details for each attendee, e.g /attendees/9649
* Pagination remains a TODO


### Install
Grab the .zip or clone repository in your web server root.
Development has been done on Windows machine with IIS but there is .htaccess set up for Apache too.
Hopefully line endings will not be a problem.

### System Requirements

You need **PHP >= 5.3.0**.
New, standards-supporting browser such as Chrome or Opera.


### Setup your web server

#### Apache

Ensure the `.htaccess` and `index.php` files are in the same public-accessible directory. The `.htaccess` file
should contain this code:

    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [QSA,L]


#### IIS

Ensure the `Web.config` and `index.php` files are in the same public-accessible directory. The `Web.config` file should contain this code:

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <system.webServer>
            <rewrite>
                <rules>
                    <rule name="slim" patternSyntax="Wildcard">
                        <match url="*" />
                        <conditions>
                            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        </conditions>
                        <action type="Rewrite" url="index.php" />
                    </rule>
                </rules>
            </rewrite>
        </system.webServer>
    </configuration>

