import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../Auth/Services/auth.service';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent implements OnInit {
  private $authService: AuthService = inject(AuthService);

  @Output() addBook = new EventEmitter<void>();

  isAuth: boolean = false;

  ngOnInit(): void {
    this.$authService.isConnectedSubject.subscribe({
      next: (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    });
  }

  onAddBook() {
    this.addBook.emit();
  }
}
