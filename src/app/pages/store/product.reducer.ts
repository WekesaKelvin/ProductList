import { createReducer, on } from '@ngrx/store';
import { Product } from '../../product.model';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: Product[];
}

export const initialState: ProductState = {
  products: []
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  // Instead of immediately pushing product in addProduct, we do it in addProductSuccess
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),
  on(ProductActions.updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  on(ProductActions.deleteProduct, (state, { productId }) => ({
    ...state,
    products: state.products.filter(p => p.id !== productId)
  }))
);
