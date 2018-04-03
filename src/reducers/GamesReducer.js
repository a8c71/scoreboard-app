import _ from 'lodash';
import { 
	GAMES_REQUEST_SUCCEEDED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GAMES_REQUEST_SUCCEEDED:
			return action.games;
		default:
			return state;
	}
};
