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
		id: ID!
		Currency: String!
		Date: String!
		Open: String!
		High: String!
		Low: String!
		Close: String!
		Volume: String!
		MarketCap: String!
	}
`;
