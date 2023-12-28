import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { InternshipJobsComponent } from './internship-jobs/internship-jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateJobPostComponent } from './create-job-post/create-job-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    InternshipJobsComponent,
    CreateJobPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
