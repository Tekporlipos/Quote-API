const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res) => {
    if (req.query.person) {
        const person = req.query.person
        const filtered = quotes.filter(quote => quote.person === person);
        res.status(200).send({quotes: filtered})
    } else {
        res.status(200).send({quotes: quotes})
    }
})

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
})

app.post('/api/quotes', (req, res) => {
    if (req.query.quote && req.query.person) {
        const newQuote = req.query;
        quotes.push(newQuote);
        res.status(200).send({quote: newQuote});
    } else {
        res.status(400).send();
    };
})


app.listen(PORT, () => {
    console.log("Server is listening...")
});