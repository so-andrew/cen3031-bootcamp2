'use strict';
/* Import modules/files you may need to correctly run the script. */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/* Instantiate a mongoose model for each listing object in the JSON file, and then save it to your Mongo database */
var listingData;
 fs.readFile('listings.json', 'utf8', function(err, data){
    if(err) throw err;
    listingData = JSON.parse(data);
    listingData.entries.forEach(function(element){
        var listingElement = new Listing({ code: element.code, name: element.name, coordinates: element.coordinates, address: element.address});
        listingElement.save(function(err){
            if(err) throw err;
        });
    });
 });