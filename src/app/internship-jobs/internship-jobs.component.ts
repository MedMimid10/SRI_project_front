import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../interfaces/job.model';
@Component({
  selector: 'app-internship-jobs',
  templateUrl: './internship-jobs.component.html',
  styleUrl: './internship-jobs.component.css'
})
export class InternshipJobsComponent implements OnInit {
  WebPageTitle: string = 'Dream Internshipjobs'; // Title for the page
  filteredJobs: Job[] = [];
  similarJobOffers: Job[] = [];
  showModal = false;
  selectedJob: any;

  constructor(private jobService: JobService, private router:Router) {}

  ngOnInit(): void {
    this.jobService.jobResults$.subscribe(results => {
      this.filteredJobs = results;
    });
  }
  openJobDetailsModal(job: Job) {
    this.selectedJob = job;
    this.showModal = true;

    //Fetch similar job offers based on the category of the selected job, excluding the selected job
    if (this.selectedJob) {
      this.jobService.getSimilarJobsByCategory(this.selectedJob.JobId)
        .subscribe((similarJobs: Job[]) => {
          this.similarJobOffers = similarJobs.filter(similarJob => similarJob.JobId !== this.selectedJob?.JobId);
        });
    }
  }

  closeJobDetailsModal() {
    this.selectedJob = null;
    this.showModal = false;
  }

  viewSimilarJob(job: Job) {
    this.selectedJob = job;
    this.showModal = true;

    // Fetch similar job offers based on the category of the selected job, excluding the selected job
    if (this.selectedJob) {
      this.jobService.getSimilarJobsByCategory(this.selectedJob.JobId)
        .subscribe((similarJobs: Job[]) => {
          this.similarJobOffers = similarJobs.filter(similarJob => similarJob.JobId !== this.selectedJob?.JobId);
        });
    }
  }

  backToSearch(){
    this.router.navigateByUrl('/')
  }

  displayDocument(fileName: string): void {
    const url = `/assets/documents/${fileName}`;
    window.open(url, '_blank');
  }
}

// export class InternshipJobsComponent implements OnInit {

//   WebPageTitle: string = 'DREAM JOBS'; // Title for the page

//   filteredJobs: Job[] = [];


//   constructor(private jobService: JobService, private router:Router) { }

//   ngOnInit(): void {
//     // Subscribe to job results from the service
//     this.jobService.jobResults$.subscribe(results => {
//       this.filteredJobs = results;
//     });
//   }
//   similarJobOffers: Job[] = [];

//   showModal = false;
//   selectedJob: any;

//   backToSearch(){
//     this.router.navigateByUrl('/')
//   }
//   openJobDetailsModal(job: any) {
//     this.selectedJob = job;
//     this.showModal = true;

//     // Fetch similar job offers based on the category of the selected job, excluding the selected job
//     this.similarJobOffers = this.jobService.getSimilarJobsByCategory(job.Category, job.JobId);
//   }


//   closeJobDetailsModal() {
//     this.selectedJob = null;
//     this.showModal = false;
//   }

//   viewSimilarJob(job: any) {
//     this.selectedJob = job;
//     this.showModal = true;

//     this.similarJobOffers = this.jobService.getSimilarJobsByCategory(job.Category, job.JobId);

//   }

//   displayDocument(fileName: string): void {
//     const url = `/assets/documents/${fileName}`;
//     window.open(url, '_blank');
//   }
//   // displayJobDocument(fileName: string): void {
//   //   this.jobService.displayDocument(fileName);
//   // }
// }
