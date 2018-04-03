import _ from 'lodash';
import { 
	MATCHES_REQUEST_SUCCEEDED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MATCHES_REQUEST_SUCCEEDED:
			return action.matches;
		default:
			return state;
	}
};
