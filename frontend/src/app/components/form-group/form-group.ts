import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-group',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-group.html',
  styleUrl: './form-group.scss',
  standalone: true,
})
export class FormGroupComponent implements OnInit {
  @Input() label?: string;
  @Input() inputId?: string;
  @Input() control!: FormControl;
  @Input() type: 'text' | 'select' | 'checkbox' = 'text';
  @Input() options?: SelectOption[];
  @Input() required: boolean = false;
  @Input() placeholder?: string;

  isFocused: boolean = false;

  ngOnInit(): void {
    // Subscribe to value changes to update the has-value state
    if (this.control) {
      this.control.valueChanges.subscribe(() => {
        // Force change detection
      });
    }
  }

  get hasValue(): boolean {
    const value = this.control?.value;
    return value !== null && value !== undefined && value !== '';
  }

  get isInvalid(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorMessage(): string {
    if (!this.control || !this.control.errors) {
      return '';
    }

    const errors = this.control.errors;

    if (errors['required']) {
      return 'Ez a mező kötelező';
    }
    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} karakter szükséges`;
    }
    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} karakter engedélyezett`;
    }
    if (errors['email']) {
      return 'Érvénytelen email cím';
    }

    return 'Érvénytelen érték';
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
