import {
	ADD_POINTS,
	UNDO_ADD_POINTS,
	JOIN_MATCH,
	END_MATCH,
	STOP_MATCH_UPDATE
} from './types';

export const addPoints = points => ({
	type: ADD_POINTS,
	points
});

export const removeLastPoint = () => ({
	type: UNDO_ADD_POINTS
});

export const joinMatch = id => ({
	type: JOIN_MATCH,
	id
})

export const endMatch = id => ({
	type: END_MATCH,
	id
})

export const stopUpdatingMatch = () => ({
	type: STOP_MATCH_UPDATE
})
