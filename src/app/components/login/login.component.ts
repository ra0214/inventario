import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  private validUsername = 'Raul';
  private validPassword = '0214';
  private adminUsername = 'admin';
  private adminPassword = 'admin';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    if (username === this.validUsername && password === this.validPassword) {
      localStorage.setItem('token', 'simulated-token');
      this.router.navigate(['/dashboard']); 
    }  if (username === this.adminUsername && password === this.adminPassword) {
      localStorage.setItem('token', 'simulated-token');
      this.router.navigate(['/dashboard-admin']); 
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
