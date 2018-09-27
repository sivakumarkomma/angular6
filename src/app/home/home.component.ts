import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import {merge, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FileListService} from '../services/file.list.service';
import {Activity} from '../models/activity';
import {FileService} from '../services/file.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';
import {FileManageService} from '../services/file.manage.service';
import {NotificationService} from '../services/notification.service';

export interface IGetActivityFilters {
  name: string;
}

export enum DialogResult {
  CREATED = 'Created',
  UPDATED = 'Updated'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'done', 'completion_date', 'attachment_path', 'actions'];
  exampleDatabase: FileListService | null;
  currentUser: User;
  data: Activity[] = [];
  index: number;
  id: number;
  filtersForm: FormGroup;
  valueListFiltersValues: IGetActivityFilters;
  activityChange = new EventEmitter<number>();
  filter: string;
  private activityAsyncRef: Subscription = null;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private fileManageService: FileManageService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
    this.valueListFiltersValues = {name: ''};
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadData();
    this.buildFiltersForm();
    this.activityAsyncRef = this.notificationService.activityAsync$.subscribe(() => {
       console.log('inside home component');
      this.activityChange.emit();
    });
  }


  private buildFiltersForm() {
    this.filtersForm = this.formBuilder.group({
      name: [this.valueListFiltersValues.name]
    });
  }

  logout() {
    this.authenticationService.logout();
    this.notificationService.disconnect();
    this.router.navigate(['login']);
  }

  addNew(activity: Activity) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {activity: activity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogResult.CREATED || result === DialogResult.UPDATED) {
        this.activityChange.emit();
      }
    });
  }

  startEdit(activityId?) {
    if (activityId) {
      this.fileService.getActivity(activityId).subscribe(activity => {
        const dialogRef = this.dialog.open(EditDialogComponent, {
          data: {activity: activity}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === DialogResult.CREATED || result === DialogResult.UPDATED) {
            this.activityChange.emit();
          }
        });
      });
    }
  }

  deleteItem(activityId?) {
    if (activityId) {
      this.fileService.getActivity(activityId).subscribe(activity => {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: {activity: activity}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.activityChange.emit();
        });
      });
    }
  }

  downloadItem(activity?) {
    if (activity) {
      this.fileManageService.downloadFile(activity.id, activity.attachmentPath);
    }
  }

  applyFilter(filterValue: string) {
    this.filter = filterValue;
    this.activityChange.emit();
  }


  public loadData() {
    this.exampleDatabase = new FileListService(this.httpClient);

    merge(this.activityChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          if (this.filter) {
            this.isLoadingResults = true;
            return this.exampleDatabase.search(this.filter);
          } else {
            this.isLoadingResults = true;
            return this.exampleDatabase.getAll();
          }
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 0;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}
