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
    padding: .5rem 1.25rem;
    border: none;
    border-radius: .375rem;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0px -1px 0px 0px rgba(16, 33, 38, .2) inset, 0px 1px 0px 0px rgba(16, 33, 38, .1);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .btn-primary {
    background-color: #ff6630;
    color: white;

    &:not(:disabled):hover {
      background-color: #b64922;
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
