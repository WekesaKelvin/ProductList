import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as ProductActions from '../store/product.actions';
import * as ProductSelectors from '../store/product.selectors';
import { Product } from '../../product.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  productService: any;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
    // we use the selector to get products from the store
    this.products$ = this.store.pipe(select(ProductSelectors.selectAllProducts));
  }

  ngOnInit(): void {
    // Dispatch action to load products from our simulated API
    this.store.dispatch(ProductActions.loadProducts());
  }

  deleteProduct(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // User clicked "Yes"
        this.productService.deleteProduct(productId);
        this.loadProducts();
      }
    });
  }
  loadProducts() {
    throw new Error('Method not implemented.');
  }
}

