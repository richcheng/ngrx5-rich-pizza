import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from './../environments/environment';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

import { AppComponent } from './app.component';

export const apiURL = 'https://ultimate-pizza.herokuapp.com';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
