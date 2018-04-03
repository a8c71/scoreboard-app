import axios from 'axios';
import _ from 'lodash';

const BASE_URL = 'http://scoreboard.afinitat.xyz';
const CLIENT_ID = 2;
const CLIENT_SECRET = 'tLW4iaQeQfBZR15N1oD0hd2FqX8OpOlZp0zK6WSN';

export const getToken = (email, password) => axios.post(
	`${BASE_URL}/oauth/token`,
	{
		client_secret: CLIENT_SECRET,
		client_id: CLIENT_ID,
		grant_type: 'password',
		scope: '',
		username: email,
		password
	})
	.then(response => response.data)


export const getGames = () => axios.get(`${BASE_URL}/api/player/games`)
	.then(response => response.data);

export const getPlayer = () => axios.get(`${BASE_URL}/api/player`)
	.then(response => response.data);

export const getMatches = () => axios.get(`${BASE_URL}/api/matches`)
	.then(response => response.data);

export const getMatch = id => axios.get(`${BASE_URL}/api/match/${id}`)
	.then(response => response.data);

export const getMatchHistory = id => axios.get(`${BASE_URL}/api/game/${id}/matches`)
	.then(response => response.data);

export const postMatch = id => axios.post(`${BASE_URL}/api/game/${id}/match`)
	.then(response => response.data);

export const postPoints = (matchId, points) => axios.post(`${BASE_URL}/api/match/${matchId}/point`, { value: points })
	.then(response => response.data);

export const deleteLastPoint = () => axios.delete(`${BASE_URL}/api/player/points/last`)
		.then(response => response.data);

export const deleteMatch = id => axios.delete(`${BASE_URL}/api/match/${id}`)
		.then(response => response.data);

export const postMatchJoin = id => axios.post(`${BASE_URL}/api/match/${id}/join`)
	.then(response => response.data);

export const patchMatchEnd = id => axios.patch(`${BASE_URL}/api/match/${id}/end`)
	.then(response => response.data);

export const getServices = (origin, destination, company, date, time) => axios.get(
		`${BASE_URL}/services`,
		{
			params: {
				origin,
				destination,
				company,
				date,
				time
			}
		}
	)
	.then(response => response.data);

export const getSubscriptions = data => {
	let obj = {};
  let subscriptionsBody = "";

  for (var i = 0; i < data.length; i++) {
  	let id = "id["+i+"]";
  	let date = "date["+i+"]";
  	obj[id] = data[i].id;
  	obj[date] = data[i].date;
  }

  if (obj !== {}) {
    subscriptionsBody = obj;
  }

  return axios.get(`${BASE_URL}/services/status`,{
			params: {
				...subscriptionsBody
			}
		})
	.then(response => response.data);
}


export const postHit = (ad_id) => axios.post(`${BASE_URL}/ads/${ad_id}/hit`)
	.then(response => response.data);

export const postSubscription = (userId, id, date) => 
	axios.post(`${BASE_URL}/schedule/${id}/subscription`, { user_id: userId, date })
		.then(response => response.data);

export const deleteSubscription = (userId, id, date) => 
	axios.delete(`${BASE_URL}/schedule/${id}/subscription`, { data: { user_id: userId, date }})
		.then(response => response.data);
