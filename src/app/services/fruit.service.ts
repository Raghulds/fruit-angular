import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FruitService {
  baseUrl = environment.baseUrl;
  services = {
    getAllFruits: {
      url: 'fruits',
      type: 'GET'
    },
    getFruitByName: {
      url: 'fruits',
      type: 'GET'
    }
  }

  constructor(private http: HttpClient) { }

  send(serviceName, options) {
    const request = this.services[serviceName];
    if (!request) { return Promise.reject({ msg: 'service doesn\'t exist', status: 404 }); }

    if (['getFruitByName',].includes(serviceName)) {
      return this.http.request(
        request.type,
        this.baseUrl + '/' + request.url + '/' + options, { observe: 'response' })
        .toPromise()
        .then(res => res)
        .catch(async e => {
          console.log(e);
          return e;
        });
    }

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