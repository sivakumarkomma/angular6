import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FileService} from '../../services/file.service';
import {Activity} from '../../models/activity';
import {Notifier} from '../../notifier/notifier';
import {Messages} from '../messages';
import {EventService} from '../../services/event.service';
import {EventRequest} from '../../models/event.request';
import {Events} from '../../models/event.enum';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  public activity: Activity;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              public fileService: FileService,
              public eventService: EventService,
              private notifier: Notifier,
              @Inject(MAT_DIALOG_DATA) public data: {
                activity: Activity
              }) {
    this.activity = data.activity;
    console.log(this.activity.completionDate);
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
    console.log('inside submit button');
  }

  stopEdit(): void {
    this.fileService.update(this.activity.id, this.activity).subscribe(result => {
        this.notifier.showSuccess(Messages.UPDATED_ACTIVITY);
        this.onClose('Updated');
      },
      error => {
        this.onClose();
      });
  }

  fireEvent(input: string): void {
    let request = null;
    if(input == 'JS') {
      request = new EventRequest(Events.ACTIVITY_JS_BUTTON.valueOf(), this.activity.id);
    } else if(input == 'PY') {
      request = new EventRequest(Events.ACTIVITY_PY_BUTTON.valueOf(), this.activity.id);
    }
    this.eventService.executeEvent(request)
      .subscribe(result => {
        this.notifier.showSuccess(result.result);
        this.onClose('Updated');
      },
      error => {
        this.onClose();
      });
  }

  onClose(dialogResult?: any) {
    this.dialogRef.close(dialogResult);
  }
}
