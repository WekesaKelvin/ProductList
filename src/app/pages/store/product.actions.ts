import { createAction, props } from '@ngrx/store';
import { Product } from '../../product.model';

// Action to trigger loading products from the API 
export const loadProducts = createAction('[Product] Load Products');

// Action dispatched when products are loaded successfully
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: Product }>()
);
export const addProductSuccess = createAction(
  '[Product/API] Add Product Success',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);
