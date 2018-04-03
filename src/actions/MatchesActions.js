import {
	REFRESH_MATCHES,
	REFRESH_MATCH_HISTORY,
	DELETE_MATCH
} from './types';

export const refreshMatches = () => ({
	type: REFRESH_MATCHES
});

export const refreshMatchHistory = () => ({
	type: REFRESH_MATCH_HISTORY
});

export const deleteMatch = id => ({
	type: DELETE_MATCH,
	id
});