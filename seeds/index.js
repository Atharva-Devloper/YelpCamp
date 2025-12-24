const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
    console.log('Database connected');
    })
    .catch(err => {
    console.error('Mongo connection error:', err);
    });

const app = express();

//to pick a random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];    

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) { 
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});