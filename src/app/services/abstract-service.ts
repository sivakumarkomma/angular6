import {HttpHeaders} from '@angular/common/http';

export class AbstractService {
    protected buildRequestHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return headers;
    }
}
