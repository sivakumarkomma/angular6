import {Component, Inject, Optional} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef, SimpleSnackBar} from '@angular/material';


export class NotifierComponentData {
    constructor(public message,
                public action = '') {
    }
}

@Component({
    selector: 'app-notifier',
    templateUrl: 'notifier.component.html',
    styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent extends SimpleSnackBar {
    public message: string;

    constructor(
        public snackBarRef: MatSnackBarRef<SimpleSnackBar>,
        @Optional() @Inject(MAT_SNACK_BAR_DATA) data: NotifierComponentData) {
        super(snackBarRef, data);
        if (data) {
            this.message = data.message;
        }
    }
}
