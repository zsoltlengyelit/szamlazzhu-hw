import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Job, JOB_LABELS, UpdateUserDto, User } from '../../models/user.model';
import { ButtonComponent } from '../../components/button/button.component';
import { FormGroupComponent, SelectOption } from '../../components/form-group/form-group';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, FormGroupComponent],
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  jobOptions: SelectOption[];
  userId: number | null = null;
  loading: boolean = true;
  submitting: boolean = false;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      address: ['', [Validators.maxLength(128)]],
      telephone: ['', [Validators.maxLength(128)]],
      active: [true],
      job: [Job.KERTESZ, Validators.required]
    });

    this.jobOptions = Object.values(Job).map(job => ({
      value: job,
      label: JOB_LABELS[job]
    }));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = parseInt(id, 10);
      this.loadUser();
    } else {
      this.router.navigate(['/users']);
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getById(this.userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.userForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            telephone: user.telephone,
            active: user.active,
            job: user.job
          });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user:', error);
          alert('Hiba történt a felhasználó betöltése során!');
          this.router.navigate(['/users']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.submitting && this.userId) {
      this.submitting = true;
      const formValue = this.userForm.value;

      const updateDto: UpdateUserDto = {
        firstname: formValue.firstname.trim(),
        lastname: formValue.lastname.trim(),
        address: formValue.address.trim(),
        telephone: formValue.telephone.trim(),
        active: formValue.active,
        job: formValue.job
      };

      this.userService.update(this.userId, updateDto).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('Hiba történt a módosítás során!');
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

  onDelete(): void {
    if (!this.userId || !this.currentUser) return;

    const confirmed = confirm(
      `Biztosan törölni szeretné a következő felhasználót: ${this.currentUser.lastname} ${this.currentUser.firstname}?`
    );

    if (confirmed) {
      this.userService.delete(this.userId).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Hiba történt a törlés során!');
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
