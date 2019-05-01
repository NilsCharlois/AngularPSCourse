import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IProduct } from "./products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'api/products/products.json';

  constructor(private http:HttpClient) {}

  getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.productUrl).
      pipe(tap(data=> console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    
    if(err.error instanceof ErrorEvent) {
      // client side or network error
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // backend returned unsuccessful response code
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}