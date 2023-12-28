// job.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Job } from '../interfaces/job.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {



  private baseUrl1 = 'http://127.0.0.1:5000/search_jobs'; // Replace with your backend API URL
  private baseUrl2 = 'http://127.0.0.1:5000/linked_posts'; // Replace with your backend API URL
  private baseUrl3 = 'https://your-api-endpoint.com/jobs'; // Replace with your API endpoint

  private jobResultsSubject: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  public jobResults$: Observable<Job[]> = this.jobResultsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getJobOpportunities(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl1}`);
  }

  searchJobs(keyword: string, country?: string, WorkType?: string, Time?:string): Observable<Job[]> {
    const params: any = { keyword };

    if (country) {
      params.country = country;
    }

    if (WorkType) {
      params.WorkType = WorkType;
    }

    if (Time) {
      params.JobPostingDate = Time ;
    }
    return this.http.get<Job[]>(`${this.baseUrl1}`, { params }).pipe(
      tap((jobs: Job[]) => {
        this.jobResultsSubject.next(jobs);
      })
    );
  }

  getSimilarJobsByCategory(jobId: number): Observable<Job[]> {
    const JobId: any = { jobId };
    // console.log("hvjhhhhhhhhvjhvhvjhjvjvj");

    return this.http.get<Job[]>(`${this.baseUrl2}?id=${jobId}`);
  }



  submitJobPost(jobData: any): Observable<any> {
    return this.http.post(this.baseUrl3, jobData);
  }


//   jobOpportunities: Job[] = [
//     {
//       JobId: 1,
//       Experience: 'Entry Level',
//       JobTitle: 'Software Developer Intern',
//       Company: 'ABC Tech Inc.',
//       CompanySize: 250,
//       location: 'London, UK',
//       JobPostingDate: 'June 15, 2023',
//       JobDescription: 'ABC Tech Inc. is a leading software development company specializing in web and mobile applications. This internship focuses on backend development using Node.js and database management.',
//       duration: '3 months',
//       skills: 'Node.js, SQL, JavaScript',
//       WorkType: 'Remote',
//       SalaryRange: 'Paid',
//       Country: 'UK',
//       Category: 'Engineering',
//       DocumentFileName: 'document1.pdf'

//     },
//     // Add nine more job opportunities...
//     {
//       JobId: 2,
//       Experience: 'Mid Level',
//       JobTitle: 'Marketing Internship',
//       Company: 'XYZ Marketing Agency',
//       CompanySize: 150,
//       location: 'New York, USA',
//       JobPostingDate: 'July 1, 2023',
//       JobDescription: 'XYZ Marketing Agency is a renowned firm specializing in digital marketing strategies. The internship offers hands-on experience in SEO, content marketing, and social media management.',
//       duration: '6 months',
//       skills: 'SEO, Content Marketing, Social Media Management',
//       WorkType: 'In-person',
//       SalaryRange: 'Unpaid',
//       Country: 'USA',
//       Category: 'Marketing',
//       DocumentFileName: 'document2.pdf'

//     },
//     {
//       JobId: 3,
//       Experience: 'Entry Level',
//       JobTitle: 'Graphic Design Intern',
//       Company: 'Design Co.',
//       CompanySize: 100,
//       location: 'Los Angeles, USA',
//       JobPostingDate: 'August 10, 2023',
//       JobDescription: 'Design Co. is a creative agency known for its innovative graphic design solutions. This internship provides exposure to UI/UX design, branding, and creating visual content for digital platforms.',
//       duration: '4 months',
//       skills: 'Adobe Creative Suite, UI/UX Design',
//       WorkType: 'Hybrid',
//       SalaryRange: 'Stipend',
//       Country: 'USA',
//       Category: 'Engineering',
//       DocumentFileName: 'document3.pdf'

//     },
//     {
//       JobId: 4,
//       Experience: 'Entry Level',
//       JobTitle: 'Human Resources Intern',
//       Company: 'HR Solutions Inc.',
//       CompanySize: 200,
//       location: 'Toronto, Canada',
//       JobPostingDate: 'September 5, 2023',
//       JobDescription: 'HR Solutions Inc. specializes in providing innovative HR solutions. This internship offers exposure to recruitment, employee relations, and HR analytics.',
//       duration: '5 months',
//       skills: 'Recruitment, Employee Relations, HR Analytics',
//       WorkType: 'Remote',
//       SalaryRange: 'Paid',
//       Country: 'Canada',
//       Category: 'Human Resources',
//       DocumentFileName: 'document4.pdf'

//     },
//     {
//       JobId: 5,
//       Experience: 'Mid Level',
//       JobTitle: 'Sales and Marketing Intern',
//       Company: 'Global Sales Corp.',
//       CompanySize: 300,
//       location: 'Berlin, Germany',
//       JobPostingDate: 'October 20, 2023',
//       JobDescription: 'Global Sales Corp. is a multinational company excelling in sales and marketing. This internship focuses on sales strategies, market research, and digital marketing.',
//       duration: '6 months',
//       skills: 'Sales Strategies, Market Research, Digital Marketing',
//       WorkType: 'In-person',
//       SalaryRange: 'Unpaid',
//       Country: 'Germany',
//       Category: 'Marketing',
//       DocumentFileName: 'document5.pdf'

//     },
//     {
//       JobId: 6,
//       Experience: 'Mid Level',
//       JobTitle: 'Finance Intern',
//       Company: 'FinanceHub Ltd.',
//       CompanySize: 150,
//       location: 'Sydney, Australia',
//       JobPostingDate: 'November 12, 2023',
//       JobDescription: 'FinanceHub Ltd. specializes in financial services. This internship provides exposure to financial analysis, investment strategies, and risk management.',
//       duration: '3 months',
//       skills: 'Financial Analysis, Investment Strategies, Risk Management',
//       WorkType: 'Hybrid',
//       SalaryRange: 'Stipend',
//       Country: 'Australia',
//       Category: 'Finance',
//       DocumentFileName: 'document6.pdf'

//     },
//     {
//       JobId: 7,
//       Experience: 'Entry Level',
//       JobTitle: 'Public Relations Intern',
//       Company: 'PR Prodigy Agency',
//       CompanySize: 120,
//       location: 'Paris, France',
//       JobPostingDate: 'December 8, 2023',
//       JobDescription: 'PR Prodigy Agency is a leading PR firm. This internship focuses on media relations, content creation, and event management.',
//       duration: '4 months',
//       skills: 'Media Relations, Content Creation, Event Management',
//       WorkType: 'In-person',
//       SalaryRange: 'Paid',
//       Country: 'France',
//       Category: 'Marketing',
//       DocumentFileName: 'document7.pdf'

//     },
//     {
//       JobId: 8,
//       Experience: 'Entry Level',
//       JobTitle: 'IT Support Intern',
//       Company: 'Tech Solutions Ltd.',
//       CompanySize: 180,
//       location: 'Tokyo, Japan',
//       JobPostingDate: 'January 18, 2024',
//       JobDescription: 'Tech Solutions Ltd. provides IT support services. This internship offers exposure to technical support, troubleshooting, and system maintenance.',
//       duration: '6 months',
//       skills: 'Technical Support, Troubleshooting, System Maintenance',
//       WorkType: 'Remote',
//       SalaryRange: 'Unpaid',
//       Country: 'Japan',
//       Category: 'Engineering',
//       DocumentFileName: 'document8.pdf'

//     }
//     // Add more job opportunities...
//   ];

//   private jobResultsSubject: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
//   public jobResults$: Observable<Job[]> = this.jobResultsSubject.asObservable();

//   constructor(private http: HttpClient) { }

//   searchJobs(keyword: string, country?: string, WorkType?: string): void {
//     let filteredJobs = this.jobOpportunities.filter(job => {
//       let lowerKeyword = keyword.toLowerCase();

//       let matchesKeyword = (
//         job.JobTitle.toLowerCase().includes(lowerKeyword) ||
//         job.Company.toLowerCase().includes(lowerKeyword) ||
//         job.location.toLowerCase().includes(lowerKeyword) ||
//         job.JobDescription.toLowerCase().includes(lowerKeyword) ||
//         job.duration.toLowerCase().includes(lowerKeyword) ||
//         job.skills.toLowerCase().includes(lowerKeyword) ||
//         job.WorkType.toLowerCase().includes(lowerKeyword)
//         //|| job.remuneration.toLowerCase().includes(lowerKeyword)
//       );

//       let matchesCountry = !country || job.Country.toLowerCase() === country.toLowerCase();
//       let matchesCategory = !WorkType || job.WorkType.toLowerCase() === WorkType.toLowerCase();

//       return matchesKeyword && matchesCountry && matchesCategory;
//     });

//     this.jobResultsSubject.next(filteredJobs);
//   }

//   getSimilarJobsByCategory(category: string, jobId: number): Job[] {
//     // Filter jobs based on the provided category and exclude the selected job
//     return this.jobOpportunities.filter(job => job.Category === category && job.JobId !== jobId);
//   }

//   private baseUrl3 = 'https://your-api-endpoint.com/jobs'; // Replace with your API endpoint


//   submitJobPost(jobData: any): Observable<any> {
//     return this.http.post(this.baseUrl3, jobData);
//   }
//   // displayDocument(fileName: string): void {
//   //   const url = `/assets/documents/${fileName}`;
//   //   window.open(url, '_blank');
//   // }

}
