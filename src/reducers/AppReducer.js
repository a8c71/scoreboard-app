import _ from 'lodash';
import { 
	PLAYER_REQUEST_SUCCEEDED,
	LOGGED_IN,
	MATCH_TITLE_UPDATED,
	SET_HISTORY_GAME
} from '../actions/types';

const INITIAL_STATE = {
	token: '',
	player: {},
	matchTitle: '',
	gameHistory: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGGED_IN:
			return { ...state, token: action.token };
		case PLAYER_REQUEST_SUCCEEDED:
			return { ...state, player: action.player };
		case MATCH_TITLE_UPDATED:
			return { ...state, matchTitle: action.title };
		case SET_HISTORY_GAME:
			return { ...state, gameHistory: action.game };
		default:
			return state;
	}
};
