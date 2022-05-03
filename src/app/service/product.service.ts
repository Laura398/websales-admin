import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) {}

  public getListProducts() {
    return this.http.get<Product[]>('http://localhost:3000/api/products');
  }

  public deleteProduct() {
    return this.http.delete('http://localhost:3000/api/products');
  }
}
