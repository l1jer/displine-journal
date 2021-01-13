import React from 'react';
import { useQuery } from '@apollo/client';
import { Table } from 'antd';

import { FETCH_CURRENCY_QUERY } from './util/graphql';
import './App.css';

const columns = [
	{
		title: 'Coin',
		dataIndex: 'Currency',
		onFilter: (value, record) => record.currency.indexOf(value) === 0,
		sortDirections: ['descend'],
	},
	{
		title: 'Date',
		dataIndex: 'Date',
	},
	{
		title: 'Open',
		dataIndex: 'Open',
	},
	{
		title: 'High',
		dataIndex: 'High',
	},
	{
		title: 'Low',
		dataIndex: 'Low',
	},
	{
		title: 'Close',
		dataIndex: 'Close',
	},
	{
		title: '30 days',
		dataIndex: 'thirtyDays',
	},
	{
		title: '24h Volume',
		dataIndex: 'Volume',
		sorter: (a, b) => a.Volume - b.Volume,
	},
	{
		title: 'MarketCap',
		dataIndex: 'MarketCap',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.MarketCap - b.MarketCap,
	},
];

// Calculation in percentage
function percentage(partialValue, totalValue) {
	return ((100 * partialValue) / totalValue).toFixed(2) + '%';
}

// Table pagination
function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
}

function App() {
	// Loading data from MongoDB
	const { loading, data } = useQuery(FETCH_CURRENCY_QUERY);
	let sevenDayOutput = '';
	let ThirtyDayOutput = '';

	// Array all data from raw data
	let arr = [];
	for (let i in data) {
		arr.push(data[i]);
	}

	// Get single currency close price
	function getClosedPrice(curIndex) {
		let day = [];

		let curName = arr.slice(curIndex, curIndex + 1) || {};
		for (let i in curName) {
			for (let j in curName[0]) {
				day.push(curName[i][j].Close);
			}
		}
		sevenDayOutput = percentage((day[0] * 100 - day[6] * 100) / 100, day[6]);
		ThirtyDayOutput = percentage((day[0] * 100 - day[29] * 100) / 100, day[29]);
		let output = [sevenDayOutput, ThirtyDayOutput];
		return output;
	}

	// Name all coins with its latest close price
	let bitcoinPrice = getClosedPrice(0);
	let tezosPrice = getClosedPrice(1);
	let bnbPrice = getClosedPrice(2);
	let bitcoincashPrice = getClosedPrice(3);
	let cardanoPrice = getClosedPrice(4);
	let eosPrice = getClosedPrice(5);
	let ethereumPrice = getClosedPrice(6);
	let litecoinPrice = getClosedPrice(7);
	let stellarPrice = getClosedPrice(8);
	let tetherPrice = getClosedPrice(9);
	let xrpPrice = getClosedPrice(10);

	let sevenArr = [];
	let thirtyArr = [];

	// Get 7 days difference for all coins
	sevenArr.push(
		bitcoinPrice[0],
		tezosPrice[0],
		bnbPrice[0],
		bitcoincashPrice[0],
		cardanoPrice[0],
		eosPrice[0],
		ethereumPrice[0],
		litecoinPrice[0],
		stellarPrice[0],
		tetherPrice[0],
		xrpPrice[0]
	);

	// Get 30 days difference for all coins
	thirtyArr.push(
		bitcoinPrice[1],
		tezosPrice[1],
		bnbPrice[1],
		bitcoincashPrice[1],
		cardanoPrice[1],
		eosPrice[1],
		ethereumPrice[1],
		litecoinPrice[1],
		stellarPrice[1],
		tetherPrice[1],
		xrpPrice[1]
	);
	// console.log(sevenArr, thirtyArr);

	// Get latest values in a list
	let latestList = arr.map((item, _) => {
		return item[0];
	});

	// Deep copy data in order to prevent adding attributes
	let storeData = JSON.parse(JSON.stringify(latestList));
	for (let i in storeData) {
		storeData[i].sevenDays = sevenArr[i];
	}
	for (let i in storeData) {
		storeData[i].thirtyDays = thirtyArr[i];
	}
	// console.log(storeData);

	return (
		<div className='App'>
			{loading ? (
				<h1>Loading data...</h1>
			) : (
				<Table
					key={Math.random()}
					columns={columns}
					dataSource={storeData}
					onChange={onChange}
				/>
			)}
		</div>
	);
}

export default App;
