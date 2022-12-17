import { Action, AnyAction, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import filmsReducer from './films/films-slice';

export const store = configureStore({
  reducer: {
    filmsStore: filmsReducer,
  },
  // middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;


// // your redux store config file.


// // ... your code

// // 1. Get the root state's type from reducers
// export type RootState = ReturnType<typeof reducers>;

// // 2. Create a type for thunk dispatch
// export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// // 3. Create a type for store using RootState and Thunk enabled dispatch
// export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
//   dispatch: AppThunkDispatch;
// };

// //4. create the store with your custom AppStore
// export const store: AppStore = configureStore();

// // you can also create some redux hooks using the above explicit types
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
