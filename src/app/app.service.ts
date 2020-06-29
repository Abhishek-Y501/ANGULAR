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
    return this.httpClient.get<any>(this.rootUrl).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        return this.handleSuccess(response.data);
      })
    )
  }

  private handleSuccess(data) {
    return data.map((data, index) => {
      data.join(',').split(',');
    })
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
