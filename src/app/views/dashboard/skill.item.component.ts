import { Component, EventEmitter, OnInit, Input, Output  } from '@angular/core';
import { Router } from '@angular/router';
import {IOption} from 'ng-select';
@Component({
  selector: 'app-skill-item',
  templateUrl: 'skill.item.component.html'
})
export class SkillItemComponent implements OnInit {

  @Input() skill;
  @Input() maxScore = 7;
  @Input() forDisplay = false;
  @Output() rateChanged = new EventEmitter();
  @Output() removeSkill = new EventEmitter();
  public tootipstrs = [
    'Interested',
    'Actively Learning',
    'Learned',
    'Utilized Once',
    'Multiple Times',
    'Utilize Regularly',
    'Almost Daily'
  ]
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
  range = [];
  marked = -1;


  constructor( ) { }
  ngOnInit() {
    for (let i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
  }

  public mark = (index) => {
    this.marked = this.marked === index ? index - 1 : index;
    this.skill.score = this.marked + 1;
    this.rateChanged.next(this.skill.score);
  }

  public isMarked = (index) => {
    if (index <= this.marked) {
      return 'fa-star';
    } else {
      return 'fa-star-o';
    }
  }

  public remove = (index) => {
    this.removeSkill.next(this.skill);
  }
}
