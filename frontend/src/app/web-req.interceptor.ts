import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest , HttpHandler,HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Observable , Subject, throwError} from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService:AuthServiceService) { }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request:HttpRequest<any>,next:HttpHandler): Observable<any>{
    request = this.addAuthHeader(request)

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        return throwError(error)
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();

    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }

}

