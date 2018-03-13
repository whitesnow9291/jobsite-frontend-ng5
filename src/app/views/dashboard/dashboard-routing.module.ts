import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SearchComponent } from './search.component';
import { SkillComponent } from './skill.component';
import { TagComponent } from './tag.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard Pages'
    },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'skill',
        component: SkillComponent,
        data: {
          title: 'Skills'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'tag',
        component: TagComponent,
        data: {
          title: 'Tags'
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
