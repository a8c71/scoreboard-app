import {
	ACCESS_TOKEN_REQUESTED
} from './types';

export const requestAccessToken = (email, password) => ({
	type: ACCESS_TOKEN_REQUESTED, email, password
});
