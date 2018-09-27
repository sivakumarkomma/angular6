import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Credentials} from '../models/credentials';
import {AuthenticationService} from '../services/authentication.service';
import {AlertService} from '../services/alert.service';
import {Notifier} from '../notifier/notifier';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private notifier: Notifier,
              public notificationService: NotificationService) {
  }

  username: string;
  password: string;
  hide = true;

  ngOnInit() {
  }

  login(): void {
    if (this.username && this.password) {
      const requestDto = this.makeRequestFromModel();
      this.authenticationService.login(requestDto)
        .pipe(first())
        .subscribe(
          data => {
            // connect to web socket
            this.notificationService.connect();
            this.router.navigate(['home']);
          },
          error => {
            console.log(error);
            this.notifier.showError(error);
          });
    } else {
      this.notifier.showError('Please enter username/password.');
    }
  }

  private makeRequestFromModel(): Credentials {
    return Credentials.build(
      {
        username: this.username,
        password: this.password
      });
  }
}
