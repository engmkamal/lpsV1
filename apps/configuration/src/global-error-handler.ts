import { ErrorHandler, Injectable, NgZone, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    private matSnackBar = inject(MatSnackBar);
    private zone = inject(NgZone);

    handleError(error: any): void {

        this.zone.run(() =>{
            this.matSnackBar.open(
                'Error detected! Resolving this error..',
                'Close',
                {
                    duration:2000
                }
            );
        })

        console.warn('Global error handler', error.message);
    }
    
}