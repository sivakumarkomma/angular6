import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import { saveAs } from 'file-saver';

@Injectable()
export class FileManageService {

  readonly API_URL = environment.apiUrl + '/file-manage/file-manage';

  constructor(private http: HttpClient) {
  }

  pushFileToStorage(activityId: number, file: File): Observable<String> {
    const url = `${this.API_URL}/${activityId}`;
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post(url, formdata)
      .pipe(
        map(response => response as String)
      );
  }

  downloadFile(activityId: number, attachmentPath: string) {
    const url = `${this.API_URL}/${activityId}`;
    this.http.get(url,
      { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response]);
      const filename = attachmentPath;
      saveAs(blob, filename);
    }, error => {
      console.log(error);
    });
  }

  deleteFile(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url);
  }
}

