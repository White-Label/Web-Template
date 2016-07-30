
# Getting Started Guide

Welcome to the getting start guide for the White Label website template. This guide and repo is meant to serve as a simple and easy way for you to get a website up and running connected to the White Label and Soundcloud APIs. 

**This template is currently in Alpha and under active development. Feel free to contribute with any optimizations/features/bug fixes via pull request.**

## Template

This open source template is a [Middleman](https://middlemanapp.com/) web app which uses the AngularJS framework. It comes configured with a live reloading development environment and a way to build a static website for production. This guide will show you how to quickly connect the website to the White Label API using your _client id_ and play your mixtape tracks through Soundcloud.

### Installation

Before we start, you need to have a few things already installed, Ruby and NodeJS. If you already have these, feel free to skip to step 3. 

1. Ruby is a programming language which runs Middleman, the static site generator we use. Download and install the latest version of Ruby for your platform by following the instructions [here](https://www.ruby-lang.org/en/documentation/installation/). Once you have Ruby set up, install the Ruby dependency manager bundler with `gem install bundler`.
2. NodeJS is a way to run JavaScript code locally. We use Node and its package manager, npm, to install some frontend dependencies. Download and install the latest stable release of NodeJS [here](https://nodejs.org/en/download/).
3. Clone this repo by running the following command in a terminal. `git clone https://github.com/NoonPacific/White-Label-Web-Template.git`.

### API Keys

This template requires you to have 2 API keys, White Label and Soundcloud.

#### White Label

The White Label API key is needed to connect to the White Label server to fetch your collections, mixtapes, and tracks. If you do not already have a WL client id, [please sign up](http://beta.whitelabel.cool/dashboard/join/).

[White Label API Documentation](http://whitelabel.cool/docs)

#### Soundcloud

A Soundcloud API key is needed to play your mixtape tracks in the browser. You can get a Soundcloud API key by [registering a new application](http://soundcloud.com/you/apps/). You will need the _*Client ID*_.

![Souncloud Client ID](http://i.imgur.com/yYbd0Y4.png)

### Setup

Now that you have Ruby, Node, API keys, and the template downloaded, you are ready to start running the website locally.

1. Open a terminal and navigate to the cloned repo. `cd White-Label-Web-Template`
2. Install all Node dependencies. `npm install`
3. Install all Ruby dependencies. `bundle install`
4. Open `source/js/app/config.js` in your favorite editor and replace `YOUR_WHITE_LABEL_CLIENT_ID_HERE` and `YOUR_SOUNDCLOUD_CLIENT_ID_HERE` with your White Label and Soundcloud client id's respectively.
5. Replace `YOUR_DEFAULT_COLLECTION_HERE` with the White Label collection you want to load when you visit the root of the website. `http://YOUR_DOMAIN_NAME/`
6. Run the website locally with the command `npm run dev`.
7. Open [localhost:4567](http://localhost:4567) in a browser. You should see the default collection mixtapes and be able to play tracks right in the browser.

### Customization

This template is only meant to serve as a starting point for your website. We encourage you to dig around and customize anything you want. Create something rad, then [email us](mailto:api@noonpacific.com) and we'll help promote it.

#### Project Structure

Before we start to customize your website, let's first go over how the project is structured.

```
White-Label-Web-Template/
  node_modules/
  source/
    css/
    img/
    js/
      app/
      controllers/
      lib/
      services/
      vendor/
    layouts/
    partials/
    views/
  Gemfile
  package.json
```

All of the source files for the website are located in `source/`.

- `source/js/app/`
  + Main Angular app and configuration
- `source/js/controllers/`
  + Angular controllers and logic to manage playback of audio, grid of mixtapes, and the currently playing mixtape and tracks
- `source/js/services/`
  + Angular collections and services to communicate with the network and pull in data.

The most important file is arguably `mix-service.js`. This service uses your `CLIENT_ID` to communicate with the White Label API to fetch your collections, mixtapes, and tracks.

#### Let's Customize

##### Logo

To change the logo that appears at the top of the website, simply replace `source/img/logo.svg` with another svg file. We recommend using an svg file to ensure the logo looks sharp on [all screen sizes](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

##### Font

[Google fonts](https://fonts.google.com) are open source and really easy to setup in this template. To change the font, open `source/css/_variables.sass` and edit these lines to your desired font.

```sass
@import 'https://fonts.googleapis.com/css?family=Open+Sans'
$font: 'Open Sans', serif
```

##### Colours

All main colours can be found in `source/css/_variables.sass` and edited to match your brand.

```sass
$black: #333
$grey: #adadad
$white: #fff
$selected: #3863FF

$facebook: #3b5998
$twitter: #55acee
$soundcloud: #ff8800
$instagram: #3f729b
$amazon: #FF9900
$spotify: #24CF5F

$text: $black
$footer: $white
$player: $white
```

##### Layout

The css for the main page layout is in `source/css/main.css.sass`

- Layout of the current mixtape and tracks
  + `source/views/playlist.html`
- Layout of the mixtape grid
  + `source/index.html.haml`

##### Html 5 Mode

You may have noticed that in `source/js/app/config.js` there is a field called `HTML_5_MODE`, which is set to `false` by default. Setting this to `true` will remove the **#** in the url path. One thing to note though, is that if this is `true` and your website is deployed, the server must be able to handle serving the same file for all paths.

### Deployment

To build the website for production, run `npm run build`. This will minify all JavaScript files into a `build/` directory. This directory can be uploaded to a server or service which can serve static websites, such as [Amazon S3](https://aws.amazon.com/documentation/s3/) or [Heroku](https://dashboard.heroku.com/).

#### Surge

If you do not already have a server setup and ready to use, an easy way to get your website online so the world can listen to your mixtapes, is by using a service called [surge.sh](). The free tier of Surge allows you serve static websites with a custom domain and free SSL. If that doesn't already sound amazing, it is also ridiculously easy to setup.

Now if you have `HTML_5_MODE` set to `true`, you will need to copy the `index.html` file to `200.html`. This ensures the Angular router picks up on all url paths.

`cp build/index.html build/200.html`

1. Install surge globally. `npm i -g surge`
2. Run `surge -p build` and follow the steps to register/login and choose a domain name.

[An example of the template running on surge](http://white-label-template.surge.sh/)

## JavaScript Library

If you do not want to use the Angular template, or want to incorporate White Label into your already existing website, there is a JavaScript library you can use to easily communicate with the White Label API. This way you do not have to worry about network requests or pagination.

The library [can be downloaded here](https://raw.githubusercontent.com/NoonPacific/White-Label-JS/master/lib/whitelabel.min.js?token=AC519TlDRq76HvWecpK3oa8Bu4xlyULzks5XpkqiwA%3D%3D) and added to your website through a `<script>` tag.

```html
<script src="whitelabel.min.js"></script>
```

This will expose the global class `WhiteLabel`. After the page has been loaded, initialize an instance providing your White Label **client id**.

```javascript
var wl = new WhiteLabel(CLIENT_ID);
```

### Example Usage

Getting array of all Mixtape objects in the collection with slug "collection-slug"

```javascript
wl.getCollectionMixtapes("collection-slug", {
    all: true, 
    results: true
}).then(function(mixtapes) {
  // Do something with array of mixtapes
});
```

Get array of Track objects for mixtape with slug "mixtape-slug"

```javascript
wl.getMixtapeTracks("mixtape-slug", {
    results: true
}).then(function(tracks) {
  // Do something with array of tracks
});
```

Get all mixtapes for a collection with slug "collection-slug" ordered by mixtape title descending.

```javascript
wl.getCollectionMixtapes("collection-slug", {
    all: true, 
    results: true, 
    filters: {
        ordering: "-title"
    }
}).then(function(mixtapes) {
    // Do something with array of mixtapes
});
```

Get array of all tracks from artist "Cool Artist"

```javascript
wl.getAllTracks({
    results: true,
    all: true,
    filters: {
        search: "Cool Artist"
    } 
});
```

[For the full documentation on the White Label JavaScript library please go here](https://github.com/NoonPacific/White-Label-JS#documentation).

#### Development on this template

This template is supposed to be easy to setup and customize. If you feel like you can improve this process with a pull request, please do so.

## Authors

The White Label platform was created and is maintained by [Clark Dinnison](https://github.com/cdinnison) and [Alex Givens](https://github.com/AlexGivens).

The development and usage of the JavaScript library was done by [Jake Runzer](https://github.com/coffee-cup).
