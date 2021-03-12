import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

	constructor(private _snackBar: MatSnackBar) {}

	displaySuccess(title: string, action: string){
		this._snackBar.open(title, action, {
		  duration: 6000,
		  horizontalPosition: 'right',
		  panelClass: ['green-snackbar', 'login-snackbar'],
		});
	  }
	
	  displayFailure(title: string, action: string){
		this._snackBar.open(title, action, {
		  duration: 6000,
		  horizontalPosition: 'right',
		  panelClass: ['red-snackbar','login-snackbar'],
		});
	  }

}