import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss']
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select<any>(fromStore.getAllPizzas);
  }
}
