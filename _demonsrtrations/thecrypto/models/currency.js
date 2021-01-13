const { model, Schema } = require('mongoose');

const currencySchema = new Schema({
	_id: String,
	Currency: String,
	Date: String,
	Open: String,
	High: String,
	Low: String,
	Close: String,
	Volume: String,
	MarketCap: String,
});

module.exports = model('Currency', currencySchema);
