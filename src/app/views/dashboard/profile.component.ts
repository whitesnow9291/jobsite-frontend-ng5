import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = false
  employeeCollapsed: Boolean = false
  seatingCollapsed: Boolean = false
  stripeCollapsed: Boolean = false
  opentableCollapsed: Boolean = false

  editmode: Boolean = false
  user: any
  message: String
  constructor(public authservice: AuthService, public router: Router, private ref: ChangeDetectorRef ) { }
  ngOnInit() {
    this.user = Object.assign({}, this.authservice.current_user)
  }
  onUpdate(): void {
    const params = {
      user: this.user
    }
    this.authservice.update(params).subscribe((res) => {
      if (res.success) {
        alert('Successfully updated')
        this.message = ''
        this.editmode = false
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

  onCancel(): void {
    this.editmode = false
    this.message = ''
    this.user = Object.assign({}, this.authservice.current_user)
  }
}
