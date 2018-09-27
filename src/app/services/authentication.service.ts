import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Credentials} from '../models/credentials';
import {AbstractService} from './abstract-service';

@Injectable()
export class AuthenticationService extends AbstractService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
      super();
    }

  login(credentials: Credentials) {
    return this.http.post<any>(this.baseUrl + '/auth',
      credentials,  {headers: this.buildRequestHeaders()})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
