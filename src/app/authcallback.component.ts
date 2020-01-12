import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './authcallback.component.html',
})
export class AuthCallbackComponent implements OnInit {

  constructor(private adal: AdalService, private router: Router) { }

  ngOnInit() {
    debugger;
    this.adal.handleWindowCallback();
    //you can do redirect here to another page after login
    this.router.navigate(['/student']);

  }

}
