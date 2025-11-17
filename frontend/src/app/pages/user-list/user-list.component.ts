import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User, JOB_LABELS } from '../../models/user.model';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updatePaginatedUsers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  getJobLabel(job: string): string {
    return JOB_LABELS[job as keyof typeof JOB_LABELS] || job;
  }

  getFullName(user: User): string {
    return `${user.lastname} ${user.firstname}`;
  }

  navigateToCreate(): void {
    this.router.navigate(['/users/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(user: User): void {
    const confirmed = confirm(
      `Biztosan törölni szeretné a következő felhasználót: ${this.getFullName(user)}?`
    );

    if (confirmed && user.id) {
      this.userService.delete(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Hiba történt a törlés során!');
        }
      });
    }
  }

  getPaginationPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
