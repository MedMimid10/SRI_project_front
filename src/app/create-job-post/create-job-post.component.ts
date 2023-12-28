import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrl: './create-job-post.component.css'
})
export class CreateJobPostComponent {

  jobPost = {
    JobTitle: '',
    Company: '',
    CompanySize: '',
    location: '',
    JobPostingDate: '',
    JobDescription: '',
    duration: '',
    skills: '',
    WorkType: '',
    SalaryRange: '',
  };

  showConfirmationModal=false;
  constructor(private router: Router, private jobService: JobService, private messageService: MessageService) { }


  backToSearch() {
    this.router.navigateByUrl('/'); // Navigate back to search page
  }

  submitJobPost() {
    this.showConfirmationModal = true; // Trigger the modal to show
        // Optionally set a timeout to automatically close the modal after a few seconds
        //setTimeout(() => this.showConfirmationModal = false, 3000);
    this.jobService.submitJobPost(this.jobPost).subscribe(
      response => {
        console.log('Job post successful added', response);
        this.showConfirmationModal = true; // Trigger the modal to show
        // Optionally set a timeout to automatically close the modal after a few seconds
        setTimeout(() => this.showConfirmationModal = false, 3000);
        // Redirect after showing the modal or after it is closed
        this.router.navigate(['/']); // Use navigate for more control instead of navigateByUrl
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  closeModalAndRedirect() {
    this.showConfirmationModal = false;
    this.router.navigate(['/']);
  }
  // submitJobPost() {
  //   this.messageService.changeMessage("Job post successfully created.");
  //       this.router.navigate(['/']);
  //   this.jobService.submitJobPost(this.jobPost).subscribe(
  //     response => {
  //       console.log('Job post successful added', response);

  //     },
  //     error => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }

}
