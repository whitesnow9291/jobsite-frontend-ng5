import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {IOption} from 'ng-select';
@Component({
  selector: 'app-skill-item',
  templateUrl: 'skill.item.component.html'
})
export class SkillItemComponent implements OnInit, OnChanges {

  @Input() skill;
  @Input() possible_skills: Array<IOption>;
  @Input() maxScore = 7;
  @Input() forDisplay = false;
  @Output() skillChanged = new EventEmitter();
  @Output() removeSkill = new EventEmitter();

  public skill_title: String
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
  public skills: Array<IOption>
  range = [];
  marked = -1;


  constructor( private ref: ChangeDetectorRef) { }
  ngOnInit() {
    for (let i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
    this.marked = this.skill.rate
    this.skill_title = this.skill.name
    this.skills = this.possible_skills
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.skills = Object.assign({}, changes.possible_skills.currentValue)
    // this.ref.detectChanges()
    this.skills = []
    this.ref.detectChanges()
  }
  public mark = (index) => {
    this.marked = this.marked === index ? index - 1 : index;
    this.skill.rate = this.marked + 1;
    this.skillChanged.next(this.skill);
  }

  public isMarked = (index) => {
    if (index <= this.marked) {
      return 'fa-star';
    } else {
      return 'fa-star-o';
    }
  }
  public onSkillChange = (event) => {
    this.skill.name = event;
    this.skillChanged.next(this.skill);
  }
  public remove = () => {
    this.removeSkill.next(this.skill);
  }
}
