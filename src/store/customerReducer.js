const defaultState = {
	customers: [],
};

const ADD_MANY_CUSTOMERS = 'ADD_MANY_CUSTOMERS';
const ADD_CUSTOMER = 'ADD_CUSTOMER';
const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

export const customerReducer = ( state = defaultState, action ) => {
	switch ( action.type ) {
		case ADD_MANY_CUSTOMERS:
			return { ...state, customers: [ ...state.customers, ...action.payload ] };
		case ADD_CUSTOMER:
			return { ...state, customers: [ ...state.customers, action.payload ] };
		case REMOVE_CUSTOMER:
			return {
				...state,
				customers: [ ...state.customers ].filter( customer => customer.id.toString() !== action.payload.toString() ),
			};
		default:
			return state;
	}
};

export const addManyCustomersAction = payload => ( { type: ADD_MANY_CUSTOMERS, payload } );
export const addCustomerAction = payload => ( { type: ADD_CUSTOMER, payload: { id: Date.now(), name: payload } } );
export const removeCustomerAction = payload => ( { type: REMOVE_CUSTOMER, payload } );
