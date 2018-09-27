import {AbstractService} from './abstract-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Activity} from '../models/activity';
import {environment} from '../../environments/environment';


@Injectable()
export class FileService extends AbstractService {
  readonly API_URL = environment.apiUrl + '/activity';

  constructor(private http: HttpClient) {
    super();
  }

  getActivity(id: number): Observable<Activity> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get(url)
      .pipe(
        map(response => response as Activity),
        map(activity => Activity.fromJson(activity))
      );
  }

  create(activityRequest: Activity): Observable<Activity> {
    const url = `${this.API_URL}`;
    return this.http.post(url, activityRequest, {headers: this.buildRequestHeaders()})
      .pipe(
        map(response => response as Activity),
        map(activity => Activity.fromJson(activity))
      );
  }

  createWithId(activityId: number, activityRequest: Activity): Observable<Activity> {
    const url = `${this.API_URL}/${activityId}`;
    return this.http.post(url, activityRequest, {headers: this.buildRequestHeaders()})
      .pipe(
        map(response => response as Activity),
        map(activity => Activity.fromJson(activity))
      );
  }

  update(activityId: number, activityRequest: Activity): Observable<Activity> {
    const url = `${this.API_URL}/${activityId}`;
    return this.http.put(url, activityRequest, {headers: this.buildRequestHeaders()})
      .pipe(
        map(response => response as Activity),
        map(activity => Activity.fromJson(activity))
      );
  }

  delete(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url);
  }
}
