import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {IOption} from 'ng-select';
import { AuthService } from '../../services/auth.service'

class Skill {
  name: String
  rate: Number
}
@Component({
  templateUrl: 'skill.component.html'
})

export class SkillComponent implements OnInit {

  skills: Skill[] = [];
  message: String = ''
  public possible_skills: Array<IOption> = [
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
  constructor(public authservice: AuthService, public router: Router) { }
  ngOnInit() {
    this.skills = this.authservice.current_user.skills
  }
  addSkill() {
    for (let i = 0; i < this.skills.length; i ++ ) {
      if (!this.skills[i].name) {
        alert (`There is skill you didn't skill name`)
        return
      }
    }
    const newSkill = new Skill
    newSkill.name = ''
    newSkill.rate = 0
    this.skills.push(newSkill)
  }
  saveSkill () {
    for (let i = 0; i < this.skills.length; i++) {
      for (let j = i + 1; j < this.skills.length; j++) {
        if (this.skills[i].name === this.skills[j].name) {
          alert('There is duplicated skill, please remove one')
          return
        }
      }
    }
    const arr_skills =  [];
    for (let i = 0; i < this.skills.length; i++) {
      arr_skills.push(this.skills[i].name)
    }
    const params = {
      user: {
        skills: this.skills,
        _id: this.authservice.current_user._id,
        email: this.authservice.current_user.email,
        skill_array: arr_skills
      }
    }
    this.authservice.update(params).subscribe((res) => {
      if (res.success) {
        alert('Successfully updated')
        this.authservice.current_user.skills = this.skills
        console.log(this.authservice.current_user)
        this.message = 'Successfully updated'
      } else {
        this.message = res.error.message
      }
    })
  }
  skillChanged(skill) {
    // let skill_id = -1
    // for (let i = 0; i < this.possible_skills.length; i ++ ) {
    //   if (this.possible_skills[i].label === skill.name) {
    //     skill_id = i
    //     break
    //   }
    // }
    // if (skill_id >= 0 ) {
    //   this.possible_skills.splice(skill_id, 1);
    // }
    // console.log(this.possible_skills)
  }
  onRemoveSkill(skill) {
    const skill_id = this.skills.indexOf(skill)
    this.skills.splice(skill_id, 1);
    this.possible_skills.push({
      label: skill.name,
      value: skill.name
    })
  }
}
