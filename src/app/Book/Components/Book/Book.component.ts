import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import { Book } from '../../Models/book';
import { AuthService } from '../../../Auth/Services/auth.service';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {BookService} from '../../Services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './Book.component.html',
  styleUrl: './Book.component.css',
  providers: [ConfirmationService]
})
export class BookComponent implements OnInit {
  private $confirmationService: ConfirmationService = inject(ConfirmationService);
  private $authService: AuthService = inject(AuthService);
  private $bookService: BookService = inject(BookService);

  @Input() BookId: number = 0;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  isAuth: boolean = false;
  visibleDialog: boolean = false;
  isEdit: boolean = false;
  book: Book = {
    bookId: 0,
    title: 'Book Title',
    edition: 'First Edition',
    editionDate: 2020,
    price: 1.99,
    authors: [
      {
        authorId: 1,
        firstName: 'John',
        name: 'Doe'
      },
      {
        authorId: 2,
        firstName: 'Jane',
        name: 'Doe'
      }
    ],
    genres: [
      {
        gName: 'Science Fiction'
      },
      {
        gName: 'Fantasy'
      },
      {
        gName: 'Adventure'
      }
    ],
    libraries: [
      {
        libraryId: 1,
        street: 'Main Street',
        numberH: '123',
        postalCode: '12345',
        city: 'City',
        country: 'Country',
        stock: 10
      },
      {
        libraryId: 2,
        street: 'Second Street',
        numberH: '456',
        postalCode: '54321',
        city: 'City1',
        country: 'Country',
        stock: 5
      },
      {
        libraryId: 3,
        street: 'Third Street',
        numberH: '789',
        postalCode: '67890',
        city: 'City2',
        country: 'Country',
        stock: 15
      }
    ]
  };

  ngOnInit(): void {
    this.$authService.isConnectedSubject.subscribe({
      next: (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    });
    this.$authService.emitIsConnected();
    this.$bookService.getBookById(this.BookId).subscribe({
      next: (book: Book) => {
        this.book = book;
      }
    });
  }

  showDetailsDialog() {
    this.visibleDialog = true;
    this.isEdit = false;
  }

  DialogCancel() {
    this.visibleDialog = false;
  }

  showEditDialog() {
    this.visibleDialog = true;
    this.isEdit = true;
  }

  accept() {
    this.confirmPopup.accept();
  }

  reject() {
    this.confirmPopup.reject();
  }

  confirmPopupEdit(event: Event) {
    this.$confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Sauvegarder les modifications?',
      accept: () => {
        this.visibleDialog = false;
      },
      reject: () => {
      }
    });
  }

  confirmPopupCancel(event: Event) {
    this.$confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Annuler les modifications?',
      accept: () => {
        this.visibleDialog = false;
      },
      reject: () => {
      }
    });
  }
}
