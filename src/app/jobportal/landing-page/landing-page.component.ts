import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { supabase } from '../../subpabaseClient';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router, private data:DataService) { }

  jobListData!: Observable<any[]>;
  originalJobListData: any[] = []; // Store the original data for reference
  jobListDataCopy: any[] = []; // Create a copy of the job list data
  locations: any[] = [];
  filteredJobListData: any[] = [];

  searchQuery: string = '';
  selectedLocation: string = '';
  jobFound:any; // Flag to check if any job is found
  
  filteredJobList: any[] = []; // The result after filtering
  
  ngOnInit() {
    this.jobListData = this.data.getJobsList();
    this.jobListData.subscribe((jobs: any[]) => {
      this.originalJobListData = [...jobs];
      this.jobListDataCopy = [...jobs];
      this.locations = Array.from(new Set(jobs.map(job => job.location)));
      this.filteredJobListData = [...jobs];
      this.jobFound = jobs.length; // Initialize jobFound with the length of the original data
    });
  }

  navigate(){
    this.router.navigateByUrl('jobportal/recurit');
  }
  

  filterJobs() {
    const keyword = this.searchQuery.trim().toLowerCase();
    const location = this.selectedLocation.trim().toLowerCase();
  
    this.jobListDataCopy = this.originalJobListData.filter(job => {
      const matchesKeyword =
        !keyword ||
        job.jobTitle.toLowerCase().includes(keyword) ||
        job.companyName.toLowerCase().includes(keyword);
  
      const matchesLocation =
        !location || job.location.toLowerCase().includes(location);
  
      return matchesKeyword && matchesLocation;
    });
    this.jobFound = this.jobListDataCopy.length;
  }

  applyForJob(jobId:any) {
    this.applyToJob(jobId).then(() => {
      const appliedJob = this.jobListDataCopy.find(job => job.job_id === jobId);
      if (appliedJob) {
        appliedJob.applied = true;
      }
      window.alert('You have successfully applied for the job!');
    }).catch((error: any) => {
      console.error('Error applying for job:', error);
    });
  }

async applyToJob(jobId: string): Promise<any> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('User not logged in');
  }

  // Insert into appliedJobs
  const { data, error } = await supabase.from('applied_jobs').insert([
    {
      job_id: jobId,
      seeker_id: user.id
    }
  ]);

  if (error) {
    console.error('Application failed:', error.message);
    throw error;
  }

  return data;
}


}
