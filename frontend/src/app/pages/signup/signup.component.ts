import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthServiceService,private router:Router) { }

  ngOnInit() {
  }

  onSignupButtonClicked(email:string,password:string){
    this.authService.signup(email,password)
    .subscribe((res:HttpResponse<any>)=>{
      console.log(res)

      this.router.navigate(['/lists'])
    })
  }

}
