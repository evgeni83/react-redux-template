import React from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addCashAction, getCashAction } from '../store/cashReducer';
import { addCustomerAction, removeCustomerAction } from '../store/customerReducer';
import { fetchCustomersAction } from '../asyncActions/fetchCustomersAction';

export default function App() {
	const dispatch = useDispatch();
	const cash = useSelector( state => state?.cashReducer.cash );
	const customers = useSelector( state => state?.customerReducer.customers );

	const addCash = () => {
		dispatch( addCashAction( 5 ) );
	};

	const getCash = () => {
		dispatch( getCashAction( 5 ) );
	};

	const fetchCustomers = () => {
		dispatch( fetchCustomersAction() );
	};

	const addCustomer = ( name ) => {
		dispatch( addCustomerAction( name ) );
	};

	const removeCustomer = ( e ) => {
		e.preventDefault();
		dispatch( removeCustomerAction( e.target.id ) );
	};

	return (
		<>
			<h1>Welcome to React App!</h1>
			<h2>Account: ${ cash }</h2>
			<button onClick={ addCash }>+</button>
			<button onClick={ getCash }>-</button>
			{
				customers.length > 0
					?
					<ol>
						{ customers.map( customer => (
							<li key={ customer.id }><a href={ `#${ customer.id }` }
													   id={ customer.id }
													   onClick={ removeCustomer }>{ customer.name }</a></li>
						) ) }
					</ol>
					:
					<p>No customers</p>
			}
			<button onClick={ () => {
				addCustomer( prompt() );
			} }>Add customer
			</button>
			<button onClick={ fetchCustomers }>Fetch customers</button>
		</>
	);
}
