import { configureStore } from '@reduxjs/toolkit';
import tournamentReducer from './slices/tournamentSlice';
import staticReducer from './slices/staticSlice';
import profileReducer from './slices/profileSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import giftCardReducer from './slices/giftCardSlice';
import myTeamReducer from './slices/teamSlice';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  statics: staticReducer,
  tournaments: tournamentReducer,
  profile: profileReducer,
  leaderboards: leaderboardReducer,
  giftcards: giftCardReducer,
  myTeams: myTeamReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tournaments', 'statics', 'profile', 'leaderboards', 'giftcards', 'myTeams']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})