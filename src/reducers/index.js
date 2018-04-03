import { combineReducers } from 'redux';

import AppReducer from './AppReducer';
import GamesReducer from './GamesReducer';
import MatchesReducer from './MatchesReducer';
import MatchReducer from './MatchReducer';
import MatchHistoryReducer from './MatchHistoryReducer';

export default combineReducers({
	app: AppReducer,
	games: GamesReducer,
	matches: MatchesReducer,
	match: MatchReducer,
	matchHistory: MatchHistoryReducer
});
