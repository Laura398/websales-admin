import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Product } from '../interface';
import { ProductsService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  UrlProducts: string =  environment.api + '/products';

  listProducts: Array<Product> = [];
  dataSource = [{}];
  
  @ViewChild(MatTable) table: MatTable<any> | any;

  COLUMN_NAME = 'title';
  COLUMN_DESC = 'description';
  COLUMN_PRICE = 'base_price';
  COLUMN_DATE_BEGIN = 'beginning_of_the_auction';
  COLUMN_DATE_END = 'end_of_the_auction';
  COLUMN_DELETE = 'delete';

  displayedColumns: string[] = [
    this.COLUMN_NAME,
    this.COLUMN_DESC,
    this.COLUMN_PRICE,
    this.COLUMN_DATE_BEGIN,
    this.COLUMN_DATE_END,
    this.COLUMN_DELETE
  ]


  constructor(private productsService: ProductsService, private http: HttpClient) { 
    this.getProducts();
  }

  getProducts(){
    this.http.get<Product>(this.UrlProducts).subscribe((data: any)=>{
      this.listProducts.push(data);

      this.listProducts = JSON.parse(JSON.stringify(data));

      this.dataSource = this.listProducts;
    });
  }

  ngOnInit(): void {}

  alert(element: Product): void {    
    this.http.delete(this.UrlProducts + '/' + element._id).subscribe(() => {
      this.getProducts();
    }, 
    (err) => {
      console.log(err);
    });
    alert('Vous avez supprimé l\'utilisateur ');
  }
}