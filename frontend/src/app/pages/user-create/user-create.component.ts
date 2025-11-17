import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Job, JOB_LABELS, CreateUserDto } from '../../models/user.model';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  userForm: FormGroup;
  jobs = Object.values(Job);
  jobLabels = JOB_LABELS;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      address: ['', [Validators.maxLength(128)]],
      telephone: ['', [Validators.maxLength(128)]],
      job: [Job.KERTESZ, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.submitting) {
      this.submitting = true;
      const formValue = this.userForm.value;

      const createDto: CreateUserDto = {
        firstname: formValue.firstname.trim(),
        lastname: formValue.lastname.trim(),
        address: formValue.address.trim(),
        telephone: formValue.telephone.trim(),
        job: formValue.job
      };

      this.userService.create(createDto).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Hiba történt a létrehozás során!');
          this.submitting = false;
        }
      });
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field || !field.errors || !field.touched) {
      return '';
    }

    if (field.errors['required']) {
      return 'Ez a mező kötelező';
    }
    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} karakter szükséges`;
    }
    if (field.errors['maxlength']) {
      return `Maximum ${field.errors['maxlength'].requiredLength} karakter engedélyezett`;
    }

    return '';
  }
}
