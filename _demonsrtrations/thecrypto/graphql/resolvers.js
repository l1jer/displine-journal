const Currency = require('../models/Currency');

module.exports = {
	Query: {
		// async getCurrency() {
		// 	try {
		// 		const coin = await Currency.find().sort({ Date: -1 }); // Descending order
		// 		return coin;
		// 	} catch (err) {
		// 		throw new Error(err);
		// 	}
		// },
		async getBitcoin() {
			try {
				const bitcoin = await Currency.find({ Currency: 'bitcoin' }).sort({
					Date: -1,
				}); // Descending order
				return bitcoin;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getTezos() {
			try {
				const tezos = await Currency.find({ Currency: 'tezos' }).sort({
					Date: -1,
				}); // Descending order
				return tezos;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getBnb() {
			try {
				const bnb = await Currency.find({ Currency: 'bnb' }).sort({
					Date: -1,
				}); // Descending order
				return bnb;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getBitcoincash() {
			try {
				const bitcoinCash = await Currency.find({
					Currency: 'bitcoin-cash',
				}).sort({
					Date: -1,
				}); // Descending order
				return bitcoinCash;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getCardano() {
			try {
				const cardano = await Currency.find({ Currency: 'cardano' }).sort({
					Date: -1,
				}); // Descending order
				return cardano;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getEos() {
			try {
				const eos = await Currency.find({ Currency: 'eos' }).sort({
					Date: -1,
				}); // Descending order
				return eos;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getEthereum() {
			try {
				const ethereum = await Currency.find({ Currency: 'ethereum' }).sort({
					Date: -1,
				}); // Descending order
				return ethereum;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getLitecoin() {
			try {
				const litecoin = await Currency.find({ Currency: 'litecoin' }).sort({
					Date: -1,
				}); // Descending order
				return litecoin;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getStellar() {
			try {
				const stellar = await Currency.find({ Currency: 'stellar' }).sort({
					Date: -1,
				}); // Descending order
				return stellar;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getTether() {
			try {
				const tether = await Currency.find({ Currency: 'tether' }).sort({
					Date: -1,
				}); // Descending order
				return tether;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getXrp() {
			try {
				const xrp = await Currency.find({ Currency: 'xrp' }).sort({
					Date: -1,
				}); // Descending order
				return xrp;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
