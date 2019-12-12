import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseURL = 'http://localhost:8080/datatables';

  constructor( private http: HttpClient ) {
  }

  getAll(modelUrl: string, page: number, limit: number, direction: string, orderBy: string, searchText = '') {
    return this.http.get(this.baseURL + modelUrl
      + '?page=' + page + '&limit=' + limit
      + '&direction=' + direction + '&orderBy=' + orderBy
      + '&searchText=' + searchText,
      this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
  }

}