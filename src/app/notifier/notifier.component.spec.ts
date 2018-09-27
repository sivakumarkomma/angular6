import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSnackBarModule, MatSnackBarRef} from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NotifierComponent } from './notifier.component';

describe('notifier.component.spec.ts', () => {
    let fixture: ComponentFixture<NotifierComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotifierComponent],
            imports: [MatSnackBarModule, NoopAnimationsModule],
            providers: [{provide: MatSnackBarRef, useValue: {} }]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [NotifierComponent],
            }
        }).compileComponents();
    }));

    function createComponent(): NotifierComponent {
        fixture = TestBed.createComponent(NotifierComponent);
        return fixture.componentInstance;
    }

    it('should create component and show message', async(() => {
        // when
        const component = createComponent();
        component.message = 'Hello outta space!';
        fixture.detectChanges();

        // then
        expect(component).toBeTruthy();
        expect(notifierMessage()).toBe(component.message);
    }));

    function notifierMessage(): string {
        return fixture.debugElement.query(By.css('.notifier-message')).nativeElement.innerText;
    }
});
