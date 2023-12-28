import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { InternshipJobsComponent } from './internship-jobs/internship-jobs.component';
import { CreateJobPostComponent } from './create-job-post/create-job-post.component';

const routes: Routes = [
  {path: '', component:SearchPageComponent},
  {path: 'job-opportunities', component:InternshipJobsComponent},
  {path: 'create-job', component:CreateJobPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
