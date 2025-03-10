
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, ProductState } from './product.reducer';

// Selects the product slice of state
export const selectProductState = createFeatureSelector<ProductState>(productFeatureKey);

// Selectors to get all products
export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);
