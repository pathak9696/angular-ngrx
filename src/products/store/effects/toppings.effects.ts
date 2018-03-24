import { Injectable } from "@angular/core";
import * as fromServices from "../../services";
import { Effect, Actions } from "@ngrx/effects";
import * as toppingsActions from "../actions/toppings.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/Observable/of";

@Injectable()
export class ToppingsEffects {
  constructor(
    private toppingsService: fromServices.ToppingsService,
    private actions$: Actions
  ) {}
  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService
        .getToppings()
        .pipe(
          map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
          catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
        );
    })
  );
}
