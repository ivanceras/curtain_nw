##Disguise the static app as html app

## Files:
* Procfile

```
cat Procfile
web: vendor/bin/heroku-php-apache2 www/

```
* composer.json


```
cat composer.json
{}

```

* web/index.php

```

<?php include_once("index.html");?>

```

## Create the app with no buildpack
heroku create curtain-ui

## add heroku
git remote add heroku git@heroku.com:curtain-ui.git

## if there is an existing remote url configured
git remote set-url heroku git@heroku.com:curtain-ui.git

## force push to heroku
git push --force heroku master


## Deployed to

https://curtain-ui.herokuapp.com
