
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { switchMap, map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  // Effect to load products from our in-memory API
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts$().pipe(
          map(products => ProductActions.loadProductsSuccess({ products }))
        )
      )
    )
  );
}
