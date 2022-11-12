import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    const user = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    };
    this.authService.signUp(user).subscribe({
      next: (val: any) => {
        localStorage.setItem('user', val?.email);
        this.router.navigate(['/notes']);
      },
      error: (err) => console.log(err),
    });
  }
}
