import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Notifier} from '../notifier/notifier';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Subject} from 'rxjs';

@Injectable()
export class NotificationService {

  readonly API_URL = environment.socketUrl + '/socket';
  private stompClient;

  private activityAsyncSource = new Subject<void>();
  public activityAsync$ = this.activityAsyncSource.asObservable();

  constructor(private notifier: Notifier) {
  }

  connect() {
    // connect to stomp where stomp endpoint is exposed
    const ws = new SockJS(this.API_URL);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', function(message) {
        console.log(message);
        that.showGreeting(message.body);
      });
    }, function(error) {
      alert('STOMP error ' + error);
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    console.log('Disconnected!');
  }

  showGreeting(message) {
    this.notifier.showSuccess(message);
    if (message.startsWith('Activity')) {
      // load activities
      this.activityAsyncSource.next();
    }
  }
}
