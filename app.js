const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
    console.log('Database connected');
    })
    .catch(err => {
    console.error('Mongo connection error:', err);
    });


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/makecampground', async(req, res) => {
    const camp = new Campground({title: 'Rocky Hill', price: '59.99', description: 'A scenic hill with rocky terrain', location: 'Hill Valley'});
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});