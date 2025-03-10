
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Initial in-memory product list
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Smartphone', price: 599 },
  ];

  // BehaviorSubject to  simulate our REST API's data store
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);

  constructor() {}

  // Returns an Observable of products, simulating network delay
  getProducts$(): Observable<Product[]> {
    return this.productsSubject.asObservable().pipe(delay(500));
  }

  addProduct(product: Product): void {
    const maxId = this.products.reduce((acc, cur) => (cur.id > acc ? cur.id : acc), 0);
    const newProduct: Product = { ...product, id: maxId + 1 };
    this.products.push(newProduct);
    this.productsSubject.next(this.products);
  }

  updateProduct(updated: Product): void {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.products[index] = updated;
      this.productsSubject.next(this.products);
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next(this.products);
  }
}
