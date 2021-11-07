import { addManyCustomersAction } from '../store/customerReducer';

export const fetchCustomersAction = () => dispatch => {
	fetch( 'https://jsonplaceholder.typicode.com/users' )
		.then( response => response.json() )
		.then( customers => dispatch( addManyCustomersAction( customers ) ) );
};
