import { configureStore } from '@reduxjs/toolkit';
import tournamentReducer from './slices/tournamentSlice';
import masterTournamentReducer from './slices/masterTournamentSlice';
import internalTournamentReducer from './slices/internalTournamentSlice';
import internalUserReducer from './slices/internalUsersSlice';
import staticReducer from './slices/staticSlice';
import profileReducer from './slices/profileSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import giftCardReducer from './slices/giftCardSlice';
import myTeamReducer from './slices/teamSlice';
import myTransactionReducer from './slices/walletSlice';
import mySiteSettingsReducer from './slices/mySiteSettingsSlice';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  statics: staticReducer,
  tournaments: tournamentReducer,
  masterTournaments: masterTournamentReducer,
  internalTournaments: internalTournamentReducer,
  internalUsers: internalUserReducer,
  profile: profileReducer,
  leaderboards: leaderboardReducer,
  giftcards: giftCardReducer,
  myTeams: myTeamReducer,
  myTransactions: myTransactionReducer,
  mySiteSettings: mySiteSettingsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tournaments', 'masterTournaments', 'internalTournaments', 'statics', 'profile', 'leaderboards', 'giftcards', 'myTeams', 'myTransactions', 'mySiteSettings']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})