import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any;
}

export const initialAuthState: AuthState = {
  user: undefined
}

export const reducers: ActionReducerMap<AuthState> = {
  user: undefined
};


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {

    return {
      user: action.user
    }
  })
)
