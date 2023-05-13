import { configureStore } from '@reduxjs/toolkit';
import tournamentReducer from './slices/tournamentSlice';
import masterTournamentReducer from './slices/masterTournamentSlice';
import staticReducer from './slices/staticSlice';
import profileReducer from './slices/profileSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import giftCardReducer from './slices/giftCardSlice';
import myTeamReducer from './slices/teamSlice';
import myTransactionReducer from './slices/walletSlice';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  statics: staticReducer,
  tournaments: tournamentReducer,
  masterTournaments: masterTournamentReducer,
  profile: profileReducer,
  leaderboards: leaderboardReducer,
  giftcards: giftCardReducer,
  myTeams: myTeamReducer,
  myTransactions: myTransactionReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tournaments', 'masterTournaments', 'statics', 'profile', 'leaderboards', 'giftcards', 'myTeams', 'myTransactions']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})