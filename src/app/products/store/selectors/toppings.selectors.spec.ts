import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoots from '../../../store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/toppings.selectors';

import { Topping } from '../../models/topping.model';

describe('Toppings Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'anchovy' },
    { id: 2, name: 'bacon' },
    { id: 3, name: 'basil' }
  ];

  const entities: { [key: number]: Topping } = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoots.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getToppingsState', () => {
    it('should return state of toppings store slice', () => {
      let result;

      store
        .select(fromSelectors.getToppingsState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
        selectedToppings: []
      });

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
        selectedToppings: []
      });
    });
  });

  describe('getToppingEntities', () => {
    it('should return toppings as entities', () => {
      let result;

      store
        .select(fromSelectors.getToppingsEntities)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedToppings', () => {
    it('should return selected toppings as an array of number ids', () => {
      let result;

      store
        .select(fromSelectors.getSelectedToppings)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.VisualiseToppings([1, 3]));

      expect(result).toEqual([1, 3]);
    });
  });

  describe('getAllToppings', () => {
    it('should return all toppings as an array of number ids', () => {
      let result;

      store
        .select(fromSelectors.getAllToppings)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual(toppings);
    });
  });

  describe('getToppingsLoaded', () => {
    it('should return the toppings loaded state', () => {
      let result;

      store
        .select(fromSelectors.getToppingLoaded)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadToppingsSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getToppingsLoading', () => {
    it('should return the toppings loading state', () => {
      let result;

      store
        .select(fromSelectors.getToppingLoading)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadToppings());

      expect(result).toEqual(true);
    });
  });
});
