import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

import { Notifier} from './notifier';
import { NotifierComponent, NotifierComponentData } from './notifier.component';

describe('notifier.spec.ts', () => {
    let notifier: Notifier;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule],
            providers: [Notifier]
        });

        notifier = TestBed.get(Notifier);
        spyOn(notifier, 'show').and.callThrough();
    });

    it('should display message when show is called', () => {
        // given
        const testMessage = 'test message';
        const snackBar = TestBed.get(MatSnackBar);
        spyOn(snackBar, 'openFromComponent');

        // when
        notifier.show(testMessage);

        // then
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(NotifierComponent, getSnackBarConfig(testMessage));

    });

    it('should display message when showCustom is called', () => {
        // given
        const testMessage = 'test message';
        const testAction = 'test action';
        const testSnackBarConfig = {
            extraClasses: 'documents-download-snackbar',
        };
        const snackBar = TestBed.get(MatSnackBar);
        spyOn(snackBar, 'open');

        // when
        notifier.showCustom(testMessage, testAction, testSnackBarConfig);

        // then
        expect(snackBar.open).toHaveBeenCalledWith(testMessage, testAction, testSnackBarConfig);

    });

    it('should call show on showSuccess and showError', () => {
        // given
        const testMessage = 'test message';
        const snackBar = TestBed.get(MatSnackBar);
        spyOn(snackBar, 'openFromComponent');

        // when
        notifier.showSuccess(testMessage);
        notifier.showError(testMessage);

        // then
        expect(notifier.show).toHaveBeenCalledTimes(2);
        expect(snackBar.openFromComponent).toHaveBeenCalledTimes(2);
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(NotifierComponent, getSnackBarConfig(testMessage));

    });

    function getSnackBarConfig(message: string, action: string = null) {
        return {
            duration: Notifier.snackBarFlashDuration,
            verticalPosition: Notifier.snackBarVerticalPosition,
            data: new NotifierComponentData(message, action)
        };
    }
});
