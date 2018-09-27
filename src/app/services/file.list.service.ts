import {AbstractService} from './abstract-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activity} from '../models/activity';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class FileListService extends AbstractService {
  readonly API_URL = environment.apiUrl + '/activities';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Activity[]> {
    const url = `${this.API_URL}`;
    return this.http.get(url)
      .pipe(
        map(response => response as Activity[]),
        map(activityTypesJson => Activity.fromJsonArray(activityTypesJson))
      );
  }

  search(term: string): Observable<Activity[]> {
    const url = `${this.API_URL}?name=${term}`;
    return this.http.get(url)
      .pipe(
        map(response => response as Activity[]),
        map(metadataTypesJson => Activity.fromJsonArray(metadataTypesJson))
      );
  }

}
