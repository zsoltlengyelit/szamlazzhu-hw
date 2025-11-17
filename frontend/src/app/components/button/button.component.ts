import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `
  <button
   [type]="type"
   [class]="'btn btn-' + variant"
   [disabled]="disabled"
   (click)="onClick()"
 >
   {{ label }}
 </button>
`,
  styles: `
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:not(:disabled):active {
      transform: translateY(0);
    }
  }

  .btn-primary {
    background-color: #0066cc;
    color: white;

    &:not(:disabled):hover {
      background-color: #0052a3;
    }
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;

    &:not(:disabled):hover {
      background-color: #5a6268;
    }
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;

    &:not(:disabled):hover {
      background-color: #c82333;
    }
  }
`
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
