import _ from 'lodash';
import { 
	MATCH_UPDATED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MATCH_UPDATED:
			return action.match;
		default:
			return state;
	}
};
