import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/product.actions';// Imporst our product actions
import { Product } from '../../product.model';// Imports our Product model (interface)
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';// Imports Angular Material Snackbar for notifications
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule,RouterModule,],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  // Defines a FormGroup to hold our form controls
  productForm: FormGroup;
  // Track whether we're editing an existing product (if productId exists) or adding a new one
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,            
    private route: ActivatedRoute,     
    private router: Router,            
    private store: Store,               
    private snackBar: MatSnackBar       
  ) {
    // Initializes the reactive form with default values
    this.productForm = this.fb.group({
      id: [0],
      name: [''],
      price: [0]
    });
  }

  ngOnInit(): void {
    // Subscribe to route parameters to check if an ID is provided
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        // If an 'id' is provided, we're in edit mode
        this.productId = +idParam; 
        
        // Get the product from the store using the ID
        const product: Product = { id: this.productId, name: 'Dummy Name', price: 100 };
        this.productForm.patchValue(product);
      } else {
        // No 'id' means we are adding a new product
        this.productId = null;
      }
    });
  }

  onSubmit() {
    // Get the current value of the form (as a Product)
    const formValue: Product = this.productForm.value;

    if (this.productId) {
      // If editing, dispatch the update action with the form value
      this.store.dispatch(ProductActions.updateProduct({ product: formValue }));
      this.openSnackBar('Product successfully updated!');
    } else {
      // If adding, dispatch the add action with the form value
      this.store.dispatch(ProductActions.addProduct({ product: formValue }));
      this.openSnackBar('Product successfully added!');
    }
    // After submission, navigate back to the product list view
    this.router.navigate(['/list']);
    // Optionally, reset the form
    this.productForm.reset({ id: 0, name: '', price: 0 });
  }

  // Helper method to show a snackbar message
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000, 
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
