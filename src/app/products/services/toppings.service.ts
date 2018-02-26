import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from '../../app.module';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`${apiURL}/toppings`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
