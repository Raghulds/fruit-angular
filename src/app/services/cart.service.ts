import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.baseUrl;
  services = {
    purchase: {
      url: 'cart/purchase',
      type: 'POST'
    }
  }

  constructor(private http: HttpClient) { }

  send(serviceName, options) {
    const request = this.services[serviceName];
    if (!request) { return Promise.reject({ msg: 'service doesn\'t exist', status: 404 }); }

    return this.http.request(
      request.type,
      this.baseUrl + '/' + request.url,
      {
        body: request.type !== 'GET' ? options : {},
        params: request.type === 'GET' ? options : {},
        observe: 'response'
      })
      .toPromise()
      .then(res => res)
      .catch(async e => {
        console.log(e)
        return e;
      });
  }
}
