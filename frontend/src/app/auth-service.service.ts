import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebrequestService } from './webrequest.service';
import {Router } from '@angular/router'
import {shareReplay,tap, share} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private webService: WebrequestService, private router:Router) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
  }

  signup(email:string,password:string){
    return this.webService.signup(email,password)
    .pipe(shareReplay(),
    tap((res:HttpResponse<any>)=>{
      this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'))
      console.log("Successfully signed up and now logged in")
    })
    )
  }

  logout(){
    this.remvoeSession()

    this.router.navigate(['/login'])
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }
  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }
  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId:string,accessToken:string,refreshToken:string){
    localStorage.setItem('user-id',userId)
    localStorage.setItem('x-access-token',accessToken)
    localStorage.setItem('x-refresh-token',refreshToken)
    }
  private remvoeSession(){
    localStorage.removeItem('user-id')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-refresh-token')
  }
  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
}


