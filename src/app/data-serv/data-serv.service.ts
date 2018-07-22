import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiserver = "http://my-shanty.com";

@Injectable()
export class DataServService {

  constructor(private http:HttpClient) { }

  getStreets() {
    return this.http.get(apiserver+'/streets');
  }

  getApartments(params) {
    return this.http.get(apiserver+'/Apartments',params);
  }

  postUser(params){
    return this.http.post(apiserver+'/users',params)
  }

  postSeerch(params){
    return this.http.post(apiserver+'/searches',params)
  }
}
