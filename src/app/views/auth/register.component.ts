import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'
@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  user: any
  admin_roles: any
  public phone_verified: Boolean = false
  public phone_code_sent: Boolean = false
  message: String = ''
  phone_vcode = ''
  constructor(public dinnerbellservice: DinnerbellService, public authservice: AuthService, public router: Router) { }
  ngOnInit() {
    this.user = {
      name: '',
      password: '',
      password_conf: '',
      email: '',
      phone_number: '',
      country_code: '',
      admin_role: '-1',
      authyId: -1,
    }
    this.phone_verified = false
    this.phone_code_sent = false
    this.admin_roles = this.dinnerbellservice.admin_roles
  }
  submitForm () {
    if (this.validateForm()) {
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };
      alert('succesfully signed up')
      const redirect = '/auth/login'
      this.router.navigate([redirect], navigationExtras);
      // const redirect = '/auth/login'
      // this.router.navigate([redirect], navigationExtras);
      // const params = this.user
      // this.authservice.register(params).subscribe((res) => {
      //   this.user.authyId = -1
      //   if (res.success) {
      //     alert('succesfully signed up')
      //     if (this.user.admin_role === 'restaurant_manager') {
      //       const queryParams = {
      //         user_id: res.data.user._id,
      //         company_id: res.data.company._id
      //       }
      //       const redirect = '/auth/company'
      //       this.router.navigate([redirect, queryParams])
      //     } else if (this.user.admin_role === 'super_visior') {
      //       const navigationExtras: NavigationExtras = {
      //         queryParamsHandling: 'preserve',
      //         preserveFragment: true
      //       };
      //       const redirect = '/auth/login'
      //       this.router.navigate([redirect], navigationExtras);
      //     }
      //   } else {
      //     this.message = res.error.message
      //   }
      // })
    }
  }
  onRoleChange(newValue) {
    this.user.admin_role = newValue;  // don't forget to update the model here
  }
  sendCode() {
    if (!this.validateEmail(this.user.email)) {
      this.message = 'Email validation faild'
      return
    }
    if (!this.validatePhoneNumber(this.user.country_code, this.user.phone_number)) {
      this.message = 'Invalid PhoneNumber'
      return
    }
    const params = {
      authyId: this.user.authyId,
      email: this.user.email,
      phone: this.user.phone_number,
      country_code: this.user.country_code
    }
    this.authservice.sendAuthyToken(params).subscribe((res) => {
      this.user.authyId = -1
      if (res.success) {
        this.message = null
        this.phone_code_sent = res.success
        this.user.authyId = res.data.authyId
      } else {
        this.message = 'Cannot send Verification Code, try again'
      }
    })
  }
  confirmCode() {
    const params = {
      confirmcode: this.phone_vcode,
      authyId: this.user.authyId
    }
    this.authservice.verifyAuthyToken(params).subscribe((res) => {
      if (res.success) {
        this.message = null
        this.phone_verified = res.success
      } else {
        this.message = 'Invalid Verification code, try again'
      }
    })
  }
  validateForm() {
    const username = this.user.name
    const email = this.user.email
    const password = this.user.password
    const password_conf = this.user.password_conf
    const admin_role = this.user.admin_role

    // if (!this.phone_verified) {
    //   this.message = 'You have to do verify phone'
    //   return false
    // }
    if (username.length < 4) {
      this.message = 'Username must be at least 4 letters'
      return false
    }
    if (password.length < 6) {
      this.message = 'Password must be at least 6 letters'
      return false
    }
    if (password !== password_conf) {
      this.message = 'Password confirmation did not matched'
      return false
    }
    if (!this.validateEmail(email)) {
      this.message = 'Email validation faild'
      return false
    }
    // if (Number(admin_role) < 0 ) {
    //   this.message = 'Please choose role'
    //   return false
    // }
    return true
  }
  validatePhoneNumber(country_code, phone_number) {
    if (Number(country_code) > 0 && Number(country_code) < 999 && String(phone_number).length < 12 && String(phone_number).length > 9) {
      return true
    }
    return false
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
