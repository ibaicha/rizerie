import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response} from '@angular/http';
import { Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { Body } from '@angular/http/src/body';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppService {


// private serviceURL = 'http://localhost/suivi-credit/';
// private serviceURL = 'http://192.168.1.17/suivi-credit/';
// private serviceURL = 'http://localhost/stockupdate/';
// private serviceURL = 'http://suivi-paddy.org/';
// private serviceURL = 'http://rizerie.dd:8083/';
// private serviceURL = 'http://localhost/rizerie/';
private serviceURL = 'http://192.168.1.17/rizerie/';

private headers: Headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);


  constructor(private http: HttpClient) { }
getUrl( url: string): string {
  return this.serviceURL + url;
}
getOptions(options: RequestOptionsArgs): RequestOptionsArgs {
  const op = {headers: this.headers};
    if (options) {
  return Object.assign(op, options);
   }
    return op;
}

 /**
     * Performs a request with `get` http method.
    get(endpoint: string, options?: RequestOptionsArgs): Observable<Response> {
      const url = this.getUrl(endpoint);
      const op = this.getOptions(options);
      // console.log(op, options);
      return this.http.get(url, op);
    }
 */
    public get(endpoint: string): Observable<Response> {
      const url = this.getUrl(endpoint);
      // const op = this.getOptions(options);
      return this.http.get<Response>(url);
    }
}
