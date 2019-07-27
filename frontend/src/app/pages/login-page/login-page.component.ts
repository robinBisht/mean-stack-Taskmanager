import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService:AuthServiceService,private router:Router) { }

  ngOnInit() {
  }

  onLoginButtonClicked(email:string,password:string){
    this.authService.login(email,password)
    .subscribe((res:HttpResponse<any>)=>{
      if(res.status===200){
        this.router.navigate(['/lists'])
      }
      console.log(res)
    })
  }

}
