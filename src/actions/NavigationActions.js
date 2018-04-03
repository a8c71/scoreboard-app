import { 
	GO_T0_NEW_GAME,
	GO_TO_MATCH_HISTORY
} from './types';

export const goToNewGame = id => ({
	type: GO_T0_NEW_GAME,
	id
});

export const goToMatchHistory = game => ({
	type: GO_TO_MATCH_HISTORY,
	game
});

