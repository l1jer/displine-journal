import React from 'react';

const product = {
	id: 1,
	name: 'sony',
	price: 3000,
	stock: 22,
};

function App() {
	return (
		<div className='row mb-3'>
			<div className='col-3 themed-grid-col'>{product.name}</div>
			<div className='col-1 themed-grid-col'>${product.price}</div>
			<div className='col-2 themed-grid-col'>{product.stock}</div>
		</div>
	);
}

export default App;
