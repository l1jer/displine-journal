import gql from 'graphql-tag';

export const FETCH_CURRENCY_QUERY = gql`
	{
		# getCurrency {
		# 	Currency
		# 	Date
		# 	Open
		# 	High
		# 	Low
		# 	Close
		# 	Volume
		# 	MarketCap
		# }
		getBitcoin {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getTezos {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getBnb {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getBitcoincash {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getCardano {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getEos {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getEthereum {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getLitecoin {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getStellar {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getTether {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
		getXrp {
			Currency
			Date
			Open
			High
			Low
			Close
			Volume
			MarketCap
		}
	}
`;
