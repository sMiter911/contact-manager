import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { Contact } from './contact.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, must-revalidate',
      Vary: 'Accept-Language',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Access-Control-Allow-Methods': '*'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) { }

  getContact(): Observable<Contact> {
    return this.http.get<Contact>(`${environment.apiUrl}/contacts`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  postContact(contact: Contact){
    return this.http.post(`${environment.apiUrl}/contacts`, contact, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Delete and Put to be added later
}
