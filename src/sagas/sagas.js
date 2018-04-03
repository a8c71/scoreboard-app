import { delay } from 'redux-saga';
import { call, put, takeLatest, fork, select, take, cancel } from 'redux-saga/effects';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';
import {
  Image
} from 'react-native';

import { 
  getGames,
  getPlayer,
  getMatches,
  getToken,
  postMatch,
  getMatch,
  postPoints,
  deleteLastPoint,
  postMatchJoin,
  patchMatchEnd,
  getMatchHistory,
  deleteMatch,
} from '../utils/Api';

import {
  tokenSelector,
  matchSelector,
  gameHistorySelector
} from './selectors';

import { 
  LOGGED_IN,
  PLAYER_REQUEST_SUCCEEDED,
  MATCHES_REQUEST_SUCCEEDED,
  GAMES_REQUEST_SUCCEEDED,
  ACCESS_TOKEN_REQUESTED,
  GO_T0_NEW_GAME,
  MATCH_UPDATED,
  ADD_POINTS,
  UNDO_ADD_POINTS,
  JOIN_MATCH,
  END_MATCH,
  STOP_MATCH_UPDATE,
  MATCH_TITLE_UPDATED,
  REFRESH_MATCHES,
  MATCH_HISTORY_REQUEST_SUCCEEDED,
  GO_TO_MATCH_HISTORY,
  REFRESH_MATCH_HISTORY,
  SET_HISTORY_GAME,
  DELETE_MATCH
} from '../actions/types';

function* fetchPlayer() {
  try {
    const { player } = yield call(getPlayer);
    yield put({ type: PLAYER_REQUEST_SUCCEEDED, player });
  } catch (e) {
    console.log('error getting player ', e.message);
  }
}

function* fetchGames() {
  try {
    const { games } = yield call(getGames);
    yield put({ type: GAMES_REQUEST_SUCCEEDED, games });
  } catch (e) {
    console.log('error getting games ', e.message);
  }
}

function* fetchMatches() {
  try {
    const { matches } = yield call(getMatches);
    yield put({ type: MATCHES_REQUEST_SUCCEEDED, matches });
  } catch (e) {
    console.log('error getting matches ', e.message);
  }
}

function* fetchMatchHistory(gameId) {
  try {
    const { matches } = yield call(getMatchHistory, gameId);
    yield put({ type: MATCH_HISTORY_REQUEST_SUCCEEDED, matches });
  } catch (e) {
    console.log('error getting match history ', e.message, gameId);
  }
}

function* playerLogin({ email, password }) {
  try {
    const { access_token: token } = yield call(getToken, email, password);
    yield put({ type: LOGGED_IN, token });
  } catch (e) {
    console.log('error getting token ', e.message);
  }
}

function* newGame({ id }) {
  try {
    Actions.Match();
    const { match } = yield call(postMatch, id);
    yield put({ type: MATCH_UPDATED, match });
    yield put({ type: MATCH_TITLE_UPDATED, title: match.game.name});
    const matchUpdateProcess = yield fork(inMatchSaga, match.id);
    yield take(STOP_MATCH_UPDATE);
    yield cancel(matchUpdateProcess);
  } catch (e) {
    console.log('error posting match ', e.message);
  }
}

function* inMatchSaga(id) {
  while (true) {
    yield delay(2000);
    try {
      const { match } = yield call(getMatch, id);
      yield put({ type: MATCH_UPDATED, match });
    } catch (e) {
      console.warn(e.message);
    }
  }
}

function* addPoints({ points }) {
  for(let i = 0; i < 3; i++) {
    try {
      const { id } = yield select(matchSelector);
      const { match } = yield call(postPoints, id, points);
      yield put({ type: MATCH_UPDATED, match });
      return;
    } catch (e) {
      if(i < 4) {
        console.log('error posting point ', e.message);
        yield delay(1000);
      }
    }
  }
}

function* removeLastPoint() {
  try {
    yield call(deleteLastPoint);
  } catch (e) {
    console.log('error deleting last point ', e.message);
  }
}

function* joinMatch({ id }) {
  try {
    const { match } = yield call(postMatchJoin, id);
    yield put({ type: MATCH_UPDATED, match });
    yield put({ type: MATCH_TITLE_UPDATED, title: match.game.name});
    Actions.Match();
    const matchUpdateProcess = yield fork(inMatchSaga, id);
    yield take(STOP_MATCH_UPDATE);
    yield cancel(matchUpdateProcess);
  } catch (e) {
    console.log('error posting join match ', e.message);
  }
}

function* endMatch({ id }) {
  try {
    yield call(patchMatchEnd, id);
    yield call(fetchMatches);
  } catch(e) {
    console.log('error patching match end', e.message);
  }
}

function* matchHistory({ game }) {
  yield put({ type: SET_HISTORY_GAME, game });
  Actions.MatchHistory();    
  yield call(fetchMatchHistory, game.id);
}

function* refreshMatchHistory() {
  const selectedGame = yield select(gameHistorySelector);
  yield call(fetchMatchHistory, selectedGame.id);
}

function* removeMatch({ id }) {
  try {
    yield call(deleteMatch, id);
    yield call(refreshMatchHistory);
  } catch (e) {
    console.log('error deleting match ', e.message, id);
  }
}

function* mainSaga() {
  yield take('persist/REHYDRATE');
  
  let token = yield select(tokenSelector);
  if (!token) {
    Actions.Login();
    yield takeLatest(ACCESS_TOKEN_REQUESTED, playerLogin);
    yield take(LOGGED_IN);
    Actions.pop();
    token = yield select(tokenSelector);
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  yield call(fetchPlayer);
  yield call(fetchGames);
  yield call(fetchMatches);

  yield takeLatest(GO_T0_NEW_GAME, newGame);
  yield takeLatest(GO_TO_MATCH_HISTORY, matchHistory);
  yield takeLatest(ADD_POINTS, addPoints);
  yield takeLatest(UNDO_ADD_POINTS, removeLastPoint);
  yield takeLatest(JOIN_MATCH, joinMatch);
  yield takeLatest(END_MATCH, endMatch);
  yield takeLatest(REFRESH_MATCHES, fetchMatches);
  yield takeLatest(REFRESH_MATCH_HISTORY, refreshMatchHistory);
  yield takeLatest(DELETE_MATCH, removeMatch);
}

export default mainSaga;
