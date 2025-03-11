import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/User.slice';
import jobsSlice from './slices/Jobs.slice';

export const store = configureStore({
	reducer: {
		counterSlice,
		jobsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
