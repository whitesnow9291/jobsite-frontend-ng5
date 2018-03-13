import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {IOption} from 'ng-select';

@Component({
  templateUrl: 'search.component.html',
  styleUrls: [
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/ng-select/ng-select.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  companyCollapsed: Boolean = false
  passwordCollapsed: Boolean = false
  employeeCollapsed: Boolean = false
  seatingCollapsed: Boolean = false
  stripeCollapsed: Boolean = false
  opentableCollapsed: Boolean = false
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
  ];
  selectedSkills: any;
  constructor( ) { }
  ngOnInit() {

  }
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
}
