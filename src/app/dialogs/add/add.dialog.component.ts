import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Activity} from '../../models/activity';
import {FileService} from '../../services/file.service';
import {Messages} from '../messages';
import {Notifier} from '../../notifier/notifier';
import {HttpResponse} from '@angular/common/http';
import {FileManageService} from '../../services/file.manage.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {

  currentFileUpload: File;
  selectedFiles: FileList;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public activity: Activity,
              private notifier: Notifier,
              private fileManageService: FileManageService,
              public fileService: FileService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  public confirmAdd(): void {
    if (this.activity.id) {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.activity.attachmentPath = this.currentFileUpload.name;
      this.fileService.createWithId(this.activity.id, this.activity).subscribe(result => {
          this.notifier.showSuccess(Messages.ADDED_ACTIVITY);
          this.onClose('Created');
        },
        error => {
          console.log('inside confirm add');
          console.log(error);
          this.onClose();
        });
      this.upload(this.activity.id);
    } else {
      this.fileService.create(this.activity).subscribe(result => {
          this.upload(result.id);
          this.notifier.showSuccess(Messages.ADDED_ACTIVITY);
          this.onClose('Created');
        },
        error => {
          this.onClose();
        });
    }
  }

  onClose(dialogResult?: any) {
    this.dialogRef.close(dialogResult);
  }

  upload(activity?) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileManageService.pushFileToStorage(activity, this.currentFileUpload).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFiles = undefined;
  }
}
