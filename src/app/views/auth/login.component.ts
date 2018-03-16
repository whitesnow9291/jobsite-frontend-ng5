import { Component, OnInit} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: any
  message: String
  admin_roles: any
  constructor(public router: Router, public authservice: AuthService,) { }
  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    }
  }
  login() {
    const params = this.user
    this.authservice.isLoggedIn = true

    this.authservice.login(params).subscribe((res) => {
      if (res.success) {
        // Redirect the user
        this.authservice.isLoggedIn = true
        this.authservice.current_user = res.data.user
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        let redirect = '/'
        redirect = '/dashboard/profile'
        this.router.navigate([redirect], navigationExtras);
      } else {
        this.message = res.error.message
      }
    })
  }
}
