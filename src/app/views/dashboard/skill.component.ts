import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Skill {
  name: String
  score: Number
}
@Component({
  templateUrl: 'skill.component.html'
})

export class SkillComponent implements OnInit {

  skills: Skill[] = [];
  constructor( ) { }
  ngOnInit() {

  }
  addSkill() {
    const newSkill = new Skill
    newSkill.name = ''
    newSkill.score = 0
    this.skills.push(newSkill)
  }
  onRateChange(event) {
    console.log(event)
  }
  onRemoveSkill(skill) {
    this.skills.splice(this.skills.indexOf(skill), 1);
  }
}
