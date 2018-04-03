import _ from 'lodash';
import { 
	MATCH_HISTORY_REQUEST_SUCCEEDED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MATCH_HISTORY_REQUEST_SUCCEEDED:
			return action.matches;
		default:
			return state;
	}
};
