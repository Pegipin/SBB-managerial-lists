import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Context } from 'src/Service/DNN/context.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api_uri: string;

  constructor(
    private context: Context,
    private httpClient: HttpClient,
    private snackbar: MatSnackBar
  ) { 
    this.api_uri = this.context._properties.routingWebAPI;
  }

  //UTILITY
  private handleError(err) {
    if (err.status !== 404) {
      this.openErrorSnackbar(err);
      return throwError(err);
    }
    else {
      return of<any>(null);
    }
  }

  private openErrorSnackbar(err) {
    if (err.status !== 404) {
      const errorMessage = err && err.message ? err.message : "Errors have occurred. Please try again later.";
      this.snackbar.open(errorMessage, null, { duration: 6000 });
    }
  }
}
