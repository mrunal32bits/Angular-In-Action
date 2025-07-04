import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { supabase } from '../../subpabaseClient';

@Component({
  selector: 'app-recuriter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recuriter.component.html',
  styleUrl: './recuriter.component.scss'
})
export class RecuriterComponent {

  jobForm: FormGroup;
  jobListData: any[] = [];
  applicationsData: any[] = [];

  jobTitles: string[] = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile App Developer', 'AI Engineer',
    'Machine Learning Engineer', 'Cloud Architect', 'Cybersecurity Analyst', 'Database Administrator', 'System Administrator',
    'IT Support Specialist', 'Network Engineer', 'QA Engineer', 'Business Analyst', 'Scrum Master',
    'Technical Writer', 'Game Developer', 'Embedded Systems Engineer', 'Blockchain Developer', 'Site Reliability Engineer'
  ];
  companyNames: string[] = [
    'TechCorp', 'Innovatech', 'NextGen Solutions', 'Designify', 'CloudWorks',
    'CodeCrafters', 'DataDynamics', 'Visionary Labs', 'PixelPerfect', 'SkyHigh Tech',
    'QuantumSoft', 'BrightFuture Inc.', 'GreenTech', 'FutureWorks', 'Alpha Innovations',
    'Beta Builders', 'Omega Systems', 'Pioneer Tech', 'Summit Solutions', 'Trailblazers Inc.',
    'Eureka Labs', 'Infinity Tech', 'Nova Enterprises', 'Stellar Systems', 'PrimeTech'
  ];
  locations: string[] = [
    'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
    'Chicago, IL', 'Los Angeles, CA', 'Denver, CO', 'Miami, FL', 'Atlanta, GA',
    'Dallas, TX', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Diego, CA',
    'Portland, OR', 'Las Vegas, NV', 'Orlando, FL', 'Charlotte, NC', 'Nashville, TN'
  ];

  constructor(private fb: FormBuilder, private router: Router, private data: DataService) {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      jobDescription: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getPostedJobsForRecruiter().then((jobs) => {
      this.jobListData = jobs;
      console.log('Posted Jobs:', this.jobListData);
    }).catch((error) => {
      console.error('Error fetching posted jobs:', error);
    });
    this.getApplicationsForRecruiter().then((applications) => {
      this.applicationsData = applications;
      console.log('Applications:', this.applicationsData);
    }).catch((error) => {
      console.error('Error fetching applications:', error);
    });
  }


  async onSubmit() {
    if (this.jobForm.valid) {
      console.log('Form Submitted!', this.jobForm.value);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        return;
      }
      const formData = { ...this.jobForm.value, postedBy: user.id };
      this.data.setJobsList(formData);
       // Assuming you have a method to set job data in your service
      // Here you can handle the form submission, e.g., send data to a server
      // this.router.navigate(['/jobportal/landing-page']);
    } else {
      console.log('Form is invalid');
    }

  }

  async getPostedJobsForRecruiter(): Promise<any[]> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not authenticated', userError);
      throw new Error('Recruiter not logged in.');
    }
    const { data: jobs, error: jobError } = await supabase
      .from('openJobs')
      .select('*')
      .eq('postedBy', user.id);

    if (jobError) {
      console.error('Error fetching recruiter jobs:', jobError.message);
      return [];
    }
    return jobs || [];
  }

// async getApplicationsForRecruiter(): Promise<any[]> {
//   const { data: { user }, error: authError } = await supabase.auth.getUser();

//   if (authError || !user) {
//     throw new Error('Recruiter not logged in');
//   }

//   // First, fetch job IDs posted by this recruiter
//   const { data: jobData, error: jobError } = await supabase
//     .from('openJobs')
//     .select('job_id')
//     .eq('postedBy', user.id);

//   if (jobError) {
//     console.error('Failed to fetch recruiter jobs:', jobError.message);
//     return [];
//   }

//   const jobIds = (jobData || []).map((job: any) => job.id);

//   if (jobIds.length === 0) {
//     return [];
//   }

//   const { data, error } = await supabase
//     .from('applied_jobs')
//     .select(`
//       id,
//       applied_at,
//       job_id,
//       seeker_id,
//       openJobs (
//         id,
//         title,
//         postedBy
//       ),
//       auth_users:seeker_id (
//         id,
//         email
//       )
//     `)
//     .in('job_id', jobIds);

//   if (error) {
//     console.error('Failed to load applications:', error.message);
//     return [];
//   }

//   return data;
// }

async getApplicationsForRecruiter(): Promise<any[]> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Recruiter not logged in');
  }

  const { data, error } = await supabase
    .from('recruiter_applications')
    .select('*')
    .eq('recruiter_id', user.id); // Filter by current recruiter ID

  if (error) {
    console.error('Failed to fetch recruiter applications:', error.message);
    return [];
  }

  return data || [];
}



  filterJobTitles(searchTerm: any) {
    return this.jobTitles.filter(title => title.toLowerCase().includes(searchTerm));
  }
  filterCompanyNames(searchTerm: any) {
    return this.companyNames.filter(title => title.toLowerCase().includes(searchTerm));
  }
  filterLocations(searchTerm: any) {
    return this.locations.filter(title => title.toLowerCase().includes(searchTerm));
  }


}
