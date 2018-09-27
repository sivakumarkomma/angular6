import {Injectable} from '@angular/core';
import {
    MatSnackBar, MatSnackBarConfig, MatSnackBarRef, MatSnackBarVerticalPosition,
    SimpleSnackBar
} from '@angular/material';

import {NotifierComponent, NotifierComponentData} from './notifier.component';

@Injectable()
export class Notifier {
    public static snackBarFlashDuration = 3000;
    public static snackBarVerticalPosition = 'top' as MatSnackBarVerticalPosition;
    public snackBarRef: MatSnackBarRef<SimpleSnackBar>;
    public message: string;
    public action: string;

    constructor(private snackBar: MatSnackBar) {
    }

    private static getSnackBarConfig(message: string, action: string = null): MatSnackBarConfig {
        return {
            duration: this.snackBarFlashDuration,
            verticalPosition: this.snackBarVerticalPosition,
            data: new NotifierComponentData(message, action)
        };
    }

    public show(message: string) {
        this.snackBarRef = this.snackBar.openFromComponent(NotifierComponent, Notifier.getSnackBarConfig(message));
    }

    public showCustom(message: string, action: string, config: MatSnackBarConfig) {
        this.snackBarRef = this.snackBar.open(message, action, config);
    }

    public showSuccess(message: string) {
        this.show(message);
    }

    public showError(message: string) {
        this.show(message);
    }

    public onAction() {
        return this.snackBarRef.onAction();
    }

    public dismiss() {
        this.snackBarRef.dismiss();
    }
}
