import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FileService} from '../../services/file.service';
import {Activity} from '../../models/activity';
import {Notifier} from '../../notifier/notifier';
import {Messages} from '../messages';
import {FileManageService} from '../../services/file.manage.service';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  public activity: Activity;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              public fileService: FileService,
              private notifier: Notifier,
              private fileManageService: FileManageService,
              @Inject(MAT_DIALOG_DATA) public data: {
                activity: Activity
              }) {
    this.activity = data.activity;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log('inside delete');
    this.fileService.delete(this.activity.id).subscribe(
      result => {
        this.deleteFile();
        this.notifier.showSuccess(Messages.DELETE_ACTIVITY);
      });
    this.closeDialog();
  }

  deleteFile() {
    console.log('inside deleteFile');
    this.fileManageService.deleteFile(this.activity.id).subscribe(
      result => {
        console.log('File is completely deleted!');
      });
  }
}
