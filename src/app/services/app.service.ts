import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
class Group {
  id: String;
  title: String;
}
@Injectable()
export class APPService {
  postUrl = 'https://protected-castle-43645.herokuapp.com';
  // postUrl = 'http://localhost:3000';

  admin_roles = [{
    'id' : 'restaurant_manager',
    'name' : 'Restaurant Manager'
  }, {
    'id' : 'super_visior',
    'name' : 'Super Visior'
  }]
  user_roles = ['host', 'server', 'staff']
  dining_style = ['Café / Bistro', 'Fast food', 'Fast casual', 'Casual dining', 'Fine dining', 'Other']

  constructor(
    private http: HttpClient) {
  }

  search(params): Observable<any> {
    const url = `${this.postUrl}/user/search`
    return this.http.post<any>(url, params, httpOptions)
  }
  skills(): Observable<any> {
    const url = `${this.postUrl}/user/skills`
    return this.http.get<any>(url, httpOptions)
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
