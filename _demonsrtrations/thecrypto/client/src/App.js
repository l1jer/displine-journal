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
		sorter: (a, b) => a.currency.length - b.currency.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Date',
		dataIndex: 'Date',
		// defaultSortOrder: 'descend',
		// sorter: (a, b) => a.date - b.date,
	},
	{
		title: '7 days',
		dataIndex: 'date',
		// defaultSortOrder: 'descend',
		// sorter: (a, b) => a.date - b.date,
	},

	{
		title: '30 days',
		dataIndex: 'date',
		// defaultSortOrder: 'descend',
		// sorter: (a, b) => a.date - b.date,
	},
	{
		title: '24h Volume',
		dataIndex: 'date',
		// defaultSortOrder: 'descend',
		// sorter: (a, b) => a.date - b.date,
	},
	{
		title: 'MarketCap',
		dataIndex: 'MarketCap',
		defaultSortOrder: 'descend',
		sorter: (a, b) => -1,
	},
];

function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
}

function App() {
	const { loading, data } = useQuery(FETCH_CURRENCY_QUERY);
	let arr = [];

	for (let i in data) {
		arr.push(data[i]);
	}
	console.log(arr);

	let arr1 = arr[0];
	console.log(arr1);
	// let xc = arr1[0];
	// // let b = arr1[1].Close * 1;
	// console.log(xc);

	const titleList = arr.map((item, _) => {
		return item[0];
	});

	return (
		<div className='App'>
			{loading ? (
				<h1>Loading data...</h1>
			) : (
				<Table columns={columns} dataSource={titleList} onChange={onChange} />
			)}
		</div>
	);
}

export default App;
