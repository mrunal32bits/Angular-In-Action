import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { supabase } from '../../subpabaseClient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  jobSeek: boolean = true;
  recruit: boolean = true;
  mode: string = '';
  seekerAccount: boolean = false;
  activeTab: string = 'login';

  recruiterForm: FormGroup;
  recruiterLoginForm: FormGroup;
  seekerForm: FormGroup;
  seekerLoginForm: FormGroup;
  resetPasswordForm: FormGroup;
  url: string = '';

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
    this.recruiterForm = this.fb.group({
      companyName: ['', Validators.required],
      email_Id: ['', [Validators.required]],
      password: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.recruiterLoginForm = this.fb.group({
      email_Id: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.seekerForm = this.fb.group({
      yourName: ['', Validators.required],
      email_Id: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.seekerLoginForm = this.fb.group({
      email_Id: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.resetPasswordForm = this.fb.group({
      email_Id: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]  
    });
    }

  onJobSeekerClick() {
      this.jobSeek = !this.jobSeek;
      this.recruit = !this.recruit;
      this.mode = 'jobseeker';

    }
  onRecruiterClick() {
      this.recruit = !this.recruit;
      this.jobSeek = !this.jobSeek;
      this.mode = 'recruiter';
    }
  jobSeekLogin() {

    }
  jobSeekAccount() {

    }
  recruitLogin() {

    }
  recruitAccount() {
      this.seekerAccount = !this.seekerAccount;
    }

  async onSeekerSubmit(){
      if(this.seekerForm.valid) {
      console.log('Seeker Form Submitted:', this.seekerForm.value);
      const { data, error } = await supabase.auth.signUp({
        email: this.seekerForm.value.email_Id.trim(),
        password: this.seekerForm.value.password.trim()
      });

      if (!data.user) {
        console.error('User signup failed or user is null:', error);
        return;
      }

      await supabase.from('jobSeeker').insert([{
        user_id: data.user.id, // VERY important!
        email_Id: data.user.email,
        yourName: this.seekerForm.value.yourName,
        phoneNumber: this.seekerForm.value.phoneNumber
      }]);

      window.alert('Job Seeker account created successfully! Please log in.');
      this.activeTab = 'login';

    } else {
      console.log('Seeker Form is invalid');
    }
  }

  // onSeekerLogin(): Promise<any> {
  //   const email_Id: string = this.seekerLoginForm.value.email_Id.trim();
  //   const password: string = this.seekerLoginForm.value.password.trim();
  //   return supabase.auth.signInWithPassword({ email: email_Id, password })
  //     .then(async ({ data, error }) => {
  //       if (error) throw new Error('Invalid email or password.');

  //       const userId = data.user.id;

  //       const { data: seeker, error: seekerError } = await supabase
  //         .from('jobseekers')
  //         .select('*')
  //         .eq('user_id', userId);

  //       if (!seeker || seekerError) {
  //         await supabase.auth.signOut();
  //         throw new Error('This user is not registered as a job seeker.');
  //       }
  //       window.alert('Login successful!');
  //       this.router.navigateByUrl('jobportal/landing-page');
  //       console.log(seeker);
  //       return seeker;
  //     });
  // }

  async onRecruiterSubmit() {
    if (this.recruiterForm.valid) {
      console.log('Recruiter Form Submitted:', this.recruiterForm.value);
      const { data, error } = await supabase.auth.signUp({
        email: this.recruiterForm.value.email_Id.trim(),
        password: this.recruiterForm.value.password.trim()
      });

      if (!data.user) {
        console.error('User signup failed or user is null:', error);
        return;
      }

      await supabase.from('recruiters').insert([{
        user_id: data.user.id, // VERY important!
        email_Id: data.user.email,
        companyName: this.recruiterForm.value.companyName,
        location: this.recruiterForm.value.location
      }]);

      window.alert('Recruiter account created successfully! Please log in.');
      this.activeTab = 'login';

    } else {
      console.log('Recruiter Form is invalid');
    }
  }


  async onRecruiterLogin(form: any): Promise<any> {
    const email_Id: string = form.value.email_Id.trim();
    const password: string = form.value.password.trim();
    const { data, error } = await supabase.auth.signInWithPassword({ email: email_Id, password });

    if (error) throw new Error('Invalid email or password.');

    const userId = data.user.id;

    const { data: recruiter, error: recruiterError } = await supabase
      .from('recruiters')
      .select('*')
      .eq('user_id', userId);

    if (!recruiter || recruiterError) {
      await supabase.auth.signOut();
      throw new Error('This user is not registered as a recruiter.');
    }
    window.alert('Login successful!');
    if (form === this.seekerLoginForm) {
      this.router.navigateByUrl('jobportal/landing-page');
    } else if (form === this.recruiterLoginForm) {
      this.router.navigateByUrl('jobportal/recruit');
    }
    console.log(recruiter);
    return recruiter;
    // or navigate to dashboard
  }

  async onResetPasswordSubmit(){
    const email_Id = this.resetPasswordForm.value.email_Id.trim().toLowerCase();
    const newPassword = this.resetPasswordForm.value.newPassword.trim();
    const confirmPassword = this.resetPasswordForm.value.confirmPassword.trim();

    if (newPassword !== confirmPassword) {
      window.alert('Passwords do not match.');
      return;
    }
    console.log(email_Id);
    const { data: user, error: userError } = await supabase
      .from('jobSeeker')
      .select('seeker_id')
      .eq('email_Id', email_Id)
      .maybeSingle();

    console.log(user);
    console.log(userError);
    if (userError || !user) {
      window.alert('User with this email does not exist.');
      return;
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(user.seeker_id, {
      password: newPassword
    });

    if (updateError) {
      window.alert('Failed to update password.');
      return;
    }

    window.alert('Password updated successfully!');
    this.activeTab = 'login';
  }





}
