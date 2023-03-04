import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBugComponent } from './bug-tracker/add-edit-bug/add-edit-bug.component';
import { BugTrackerComponent } from './bug-tracker/bug-tracker.component';

const routes: Routes = [
  {
    path: 'bugTracker',
    component: BugTrackerComponent,
  },
  { path: '', redirectTo: 'bugTracker', pathMatch: 'full' },
  {
    path: 'bugTracker/:action',
    component: AddEditBugComponent,
  },
  // {
  //   path: 'bugTracker/:action',
  //   component: AddEditBugComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
