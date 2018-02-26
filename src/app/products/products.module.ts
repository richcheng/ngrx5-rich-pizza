import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import * as fromComponents from './components';

import * as fromContainers from './containers';

import * as fromServices from './services';

import * as fromGuards from './guards';

export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.PizzasGuard],
    component: fromContainers.ProductsComponent
  },
  {
    path: 'new',
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  },
  {
    path: ':pizzaId',
    canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
