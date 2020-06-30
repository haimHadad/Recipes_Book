import * as fromShoppintList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/Store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shoppingList: fromShoppintList.State;
    auth: fromAuthReducer.State;
}

export const appReducer: ActionReducerMap<AppState>={
    shoppingList: fromShoppintList.shoppingListReducer,
    auth: fromAuthReducer.authReducer

}