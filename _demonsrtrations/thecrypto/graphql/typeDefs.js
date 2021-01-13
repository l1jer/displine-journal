const { gql } = require('apollo-server');

module.exports = gql`
	type Query {
		# getCurrency: [coin]
		getBitcoin: [coin]
		getTezos: [coin]
		getBnb: [coin]
		getBitcoincash: [coin]
		getCardano: [coin]
		getEos: [coin]
		getEthereum: [coin]
		getLitecoin: [coin]
		getStellar: [coin]
		getTether: [coin]
		getXrp: [coin]
	}
	type coin {
		_id: ID!
		Currency: String!
		Date: String!
		Open: Float!
		High: Float!
		Low: Float!
		Close: Float!
		Volume: Float!
		MarketCap: Float!
	}
`;
