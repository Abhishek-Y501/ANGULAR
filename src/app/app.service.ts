import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private rootUrl: string = environment.RestApiUrl;

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get<any>('https://data.ct.gov/api/views/6hvp-8msr/rows.json').pipe(
      catchError(this.handleError),
      tap((response: any) => {
        return response;
      })
    )
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
