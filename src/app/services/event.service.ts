import {Injectable} from '@angular/core';
import {AbstractService} from './abstract-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EventRequest} from '../models/event.request';
import {EventResponse} from '../models/event.response';

@Injectable()
export class EventService extends AbstractService {

  readonly API_URL = environment.apiUrl + '/events';

  constructor(private http: HttpClient) {
    super();
  }

  executeEvent(eventRequest: EventRequest): Observable<EventResponse> {
    const url = `${this.API_URL}`;
    return this.http.post(url, eventRequest, {headers: this.buildRequestHeaders()})
      .pipe(
        map(response => response as EventResponse),
        map(eventResponse => EventResponse.fromJson(eventResponse))
      );
  }
}
