import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {IOption} from 'ng-select';
import {APPService} from '../../services/app.service'

@Component({
  templateUrl: 'search.component.html',
  styleUrls: [
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/ng-select/ng-select.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  message: String
  // ng2-select
  public skills: Array<IOption> = [
    {label: 'SQL', value: 'SQL'},
    {label: 'Cognos', value: 'Cognos'},
    {label: 'R', value: 'R'},
    {label: 'Python', value: 'Python'},
    {label: 'DataStage', value: 'DataStage'},
    {label: 'SSAS', value: 'SSAS'},
    {label: 'SAS', value: 'SAS'},
    {label: 'Predictive Analytics', value: 'Predictive Analytics'},
    {label: 'Tableau', value: 'Tableau'},
  ];
  searchSkills: any = [];
  searchRole: String = '';
  users: any = [];
  constructor(public appservice: APPService) { }
  ngOnInit() {

  }
  collapsed(event: any): void {
    // console.log(event);
  }
  onSearch() {
    const params = {
      searchSkills: this.searchSkills,
      searchRole: this.searchRole
    }
    this.appservice.search(params).subscribe((res) => {
      if (res.success) {
        this.users = res.data.users
      } else {
        this.message = res.error.message
      }
    })
  }
  expanded(event: any): void {
    // console.log(event);
  }
}
