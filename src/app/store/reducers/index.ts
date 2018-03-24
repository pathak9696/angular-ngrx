import * as fromRouterStore from "@ngrx/router-store";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import {
  Params,
  RouterState,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  outlet: string;
}

export interface State {
  routerReducer: fromRouterStore.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouterStore.routerReducer
};

export const getRouterReducer = createFeatureSelector<
  fromRouterStore.RouterReducerState<RouterStateUrl>
>("routerReducer");

export class CustomSerializer
  implements fromRouterStore.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    const { outlet } = state;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;
    return { url, params, queryParams, outlet };
  }
}
