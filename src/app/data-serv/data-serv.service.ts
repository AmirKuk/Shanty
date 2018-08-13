import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//const apiserver = "";
const apiserver = "https://my-shanty.com";

@Injectable()
export class DataServService {

  constructor(private http:HttpClient) { }

  getStreets() {
    return this.http.get(apiserver+'/streets');
  }

  getNeighborhoods() {
    return this.http.get(apiserver+'/neighborhoods');
  }

  getApartments(params) {
    /*var params_new = "";

    for (var k in Object.keys(params)){

      params_new += "?"+ Object.keys(params)[k] + "=" + params[Object.keys(params)[k]];
    }*/

    //return this.http.get(apiserver+'/Apartments'+params_new);
    return this.http.post(apiserver+'/Apartments',params,{ responseType: 'json' });
  }

  getSearches(params) {
    return this.http.get(apiserver+'/searches?id='+params);
  }

  postUser(params){
    return this.http.post(apiserver+'/users',params,{ responseType: 'text' })
  }

  postSeerch(params){
    delete params["_id"];
    return this.http.post(apiserver+'/searches',params,{ responseType: 'text' })
  }

  putSeerch(params){
    return this.http.put(apiserver+'/searches',params,{ responseType: 'text' })
  }

  postConnectus(params){
    return this.http.post(apiserver+'/Connectus',params,{ responseType: 'text' })
  }

  postPackage(params){
    return this.http.post(apiserver+'/package',params,{ responseType: 'text' })
  }

  postTrial(params){
    return this.http.post(apiserver+'/Trial',params,{ responseType: 'text' })
  }

  getPackage(params){
    return this.http.get(apiserver+'/package?id='+params)
  }
}
