import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Pizza } from "../../models/pizza.model";
import { Topping } from "../../models/topping.model";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromProductStore from "../../store";
import { tap } from "rxjs/operators";

@Component({
  selector: "product-item",
  styleUrls: ["product-item.component.scss"],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromProductStore.ProductsState>) {}

  ngOnInit() {
    // load visualization only if the product exits(not new pizza)
    // this.store.dispatch(new fromProductStore.LoadVisualization());
    this.pizza$ = this.store.select(fromProductStore.getPizzaEntity).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza.toppings.map(topping => topping.id)
          : [];
        this.store.dispatch(new fromProductStore.VisualizeToppings(toppings));
      })
    );
    this.toppings$ = this.store.select(fromProductStore.getToppings);
    this.visualise$ = this.store.select(fromProductStore.getPizzaVisualized);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromProductStore.VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    // this.pizzaService.createPizza(event).subscribe(pizza => {
    //   this.router.navigate([`/products/${pizza.id}`]);
    // });
  }

  onUpdate(event: Pizza) {
    // this.pizzaService.updatePizza(event).subscribe(() => {
    //   this.router.navigate([`/products`]);
    // });
  }

  onRemove(event: Pizza) {
    // const remove = window.confirm('Are you sure?');
    // if (remove) {
    //   this.pizzaService.removePizza(event).subscribe(() => {
    //     this.router.navigate([`/products`]);
    //   });
    // }
  }
}
