const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
	{
		$match: {
			Currency: 'bitcoin',
		},
	},
	{
		$sort: {
			MarketCap: -1,
		},
	},
	{
		$limit: 2,
	},
];

MongoClient.connect(
	'',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (connectErr, client) {
		assert.equal(null, connectErr);
		const coll = client.db('').collection('');
		coll.aggregate(agg, (cmdErr, result) => {
			assert.equal(null, cmdErr);
		});
		client.close();
	}
);
