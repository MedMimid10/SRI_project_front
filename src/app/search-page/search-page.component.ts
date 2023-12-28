import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { Job } from '../interfaces/job.model';
import { JobService } from '../services/job.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  searchKeyword: string = '';
  selectedCountry: string = '';
  selectedWorkType: string = '';
  jobResultsCount: number = 0;

  //message: string | undefined;

  constructor(private jobService: JobService, private router: Router, private messageService:MessageService) {}

  ngOnInit() {
    // this.messageService.currentMessage.subscribe(message => {
    //   this.message = message;
    // });
  }
  performSearch(): void {
    this.jobService.searchJobs(this.searchKeyword, this.selectedCountry, this.selectedWorkType)
      .subscribe(results => {
        this.jobResultsCount = results.length;
        this.router.navigate(['/job-opportunities']);
      });
  }

  performSearchOnChange(): void {
    this.jobService.searchJobs(this.searchKeyword, this.selectedCountry, this.selectedWorkType)
      .subscribe(results => {
        this.jobResultsCount = results.length;
      });
  }

  resetSearch(): void {
    this.searchKeyword = '';
    this.selectedCountry = '';
    this.selectedWorkType = '';
    this.jobResultsCount = 0;
    this.jobService.searchJobs('', '', '').subscribe(() => {});
  }

  navigateToCreateJob() {
    this.router.navigateByUrl('/create-job'); // Replace with your actual route
  }
}
// export class SearchPageComponent {

//   constructor(private jobService: JobService, private router: Router) { }

//   searchKeyword: string = '';
//   selectedCountry: string = '';
//   selectedWorkType: string = '';
//   jobResultsCount: number = 0;


//   navigateToCreateJob() {
//     this.router.navigateByUrl('/create-job'); // Replace with your actual route
//   }

//   performSearch(): void {
//     this.jobService.searchJobs(this.searchKeyword, this.selectedCountry, this.selectedWorkType);

//     // this.jobService.jobResults$.subscribe(results => {
//     //   this.jobResultsCount = results.length;
//     // });
//     this.router.navigate(['/job-opportunities']);
//   }

//   performSearchOnChange(): void {
//     // Call the search method from the service when any input field changes
//     this.jobService.searchJobs(this.searchKeyword, this.selectedCountry, this.selectedWorkType);

//     // Update jobResultsCount based on the length of jobResults
//     this.jobService.jobResults$.subscribe(results => {
//       this.jobResultsCount = results.length;
//     });
//   }

//   resetSearch(): void {
//     this.searchKeyword = '';
//     this.selectedCountry = '';
//     this.selectedWorkType = '';
//     this.jobResultsCount = 0;
//     this.jobService.searchJobs('', '', '');

//   }
// }
