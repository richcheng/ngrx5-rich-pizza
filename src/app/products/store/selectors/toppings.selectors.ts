import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store/';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingsEntities
);

export const getAllToppings = createSelector(getToppingsEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getToppingLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings
);
