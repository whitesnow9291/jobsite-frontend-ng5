import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ProfileComponent } from './profile.component';
import { SearchComponent } from './search.component';
import { SkillComponent } from './skill.component';
import { TagComponent } from './tag.component';
import { SkillItemComponent } from './skill.item.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule,
    NgSelectModule,
    TooltipModule.forRoot()
  ],
  declarations: [ ProfileComponent,
     SearchComponent,
     SkillComponent,
     TagComponent,
     SkillItemComponent]
})
export class DashboardModule { }
