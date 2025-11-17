import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Job, JOB_LABELS, CreateUserDto } from '../../models/user.model';
import { ButtonComponent } from '../../components/button/button.component';
import { FormGroupComponent, SelectOption } from '../../components/form-group/form-group';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, FormGroupComponent],
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  userForm: FormGroup;
  jobOptions: SelectOption[];
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

    this.jobOptions = Object.values(Job).map(job => ({
      value: job,
      label: JOB_LABELS[job]
    }));
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

  getControl(fieldName: string): FormControl {
    return this.userForm.get(fieldName) as FormControl;
  }
}
