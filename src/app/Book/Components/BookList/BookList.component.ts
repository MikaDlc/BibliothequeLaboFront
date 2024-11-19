import {Component, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { AuthService } from '../../../Auth/Services/auth.service';
import {ConfirmationService} from 'primeng/api';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {Author} from '../../Models/author';
import {Genre} from '../../Models/genre';
import {Library} from '../../Models/library';
import {AuthorService} from '../../Services/author.service';
import {GenreService} from '../../Services/genre.service';
import {LibraryService} from '../../Services/library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './BookList.component.html',
  styleUrl: './BookList.component.css',
  providers: [ConfirmationService],
  encapsulation:ViewEncapsulation.None
})
export class BookListComponent implements OnInit {
  private $confirmationService: ConfirmationService = inject(ConfirmationService);
  private $bookService: BookService = inject(BookService);
  private $authService: AuthService = inject(AuthService);
  private $authorService: AuthorService = inject(AuthorService);
  private $genreService: GenreService = inject(GenreService);
  private $libraryService: LibraryService = inject(LibraryService);

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  isAuth: boolean = false;
  isAdmin: boolean = false;
  books: Book[] = [];
  visibleDialog: boolean = false;
  newBook: Partial<Book> = {};

  NewAuthor!: Author | null;
  NewGenre!: Genre | null;
  NewLibrary!: Library | null;
  Authors!: Author[];
  Genres!: Genre[];
  Libraries: Library[] = [
    { libraryId: 1, city: 'Paris', country: 'France', numberH: '10', street: 'Rue de Paris', stock: 10, postalCode: '6000' },
    { libraryId: 2, city: 'Lyon', country: 'France', numberH: '10', street: 'Rue de Lyon', stock: 10, postalCode: '6900' },
    { libraryId: 3, city: 'Marseille', country: 'France', numberH: '10', street: 'Rue de Marseille', stock: 10, postalCode: '1300' },
    { libraryId: 4, city: 'Toulouse', country: 'France', numberH: '10', street: 'Rue de Toulouse', stock: 10, postalCode: '3100' },
  ];

  ngOnInit(): void {
    this.getBooks();
    this.$authService.isConnectedSubject.subscribe({
      next: (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    });
    this.$authService.emitIsConnected();
    this.$authorService.getAuthors().subscribe({
      next: (authors) => {
        this.Authors = authors;
        this.Authors.sort((a, b) => a.firstName.localeCompare(b.firstName));
      }
    });
    this.$genreService.getGenres().subscribe({
      next: (genres) => {
        this.Genres = genres;
        this.Genres.sort((a, b) => a.gName.localeCompare(b.gName));
      }
    });
    this.$libraryService.getLibraries().subscribe({
      next: (libraries) => {
        this.Libraries = libraries;
        this.Libraries.sort((a, b) => a.city.localeCompare(b.city));
      }
    });
    this.isAdmin = this.$authService.isAdmin();
  }

  getBooks() {
    this.$bookService.getBooks().subscribe({
      next: (books) => this.books = books
    });
  }

  confirmPopupCancel(event: MouseEvent) {
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

  confirmPopupAdd(event: MouseEvent) {
    this.$confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Ajouter le livre?',
      accept: () => {
        this.visibleDialog = false;
      },
      reject: () => {
      }
    });
  }

  accept() {
  this.confirmPopup.accept();
  }

  reject() {
  this.confirmPopup.reject();
  }

  ShowAddDialog() {
    this.visibleDialog = true;
    this.newBook = {
      authors: [],
      genres: [],
      libraries: []
    };
  }

  DeleteAuthor(author: Author) {
    const index = this.newBook.authors?.findIndex(a => a.authorId === author.authorId);
    if(index !== -1) {
      this.newBook.authors?.splice(index!, 1);
    }
    this.Authors.push(author);
    this.Authors.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  addAuthor() {
    this.newBook.authors?.push(this.NewAuthor!);
    const index = this.Authors.findIndex(a => a.authorId === this.NewAuthor?.authorId);
    this.Authors.splice(index, 1);
    this.NewAuthor = null;
  }

  DeleteGenre(genre: Genre) {
    const index = this.newBook.genres?.findIndex(g => g.gName === genre.gName);
    if(index !== -1) {
      this.newBook.genres?.splice(index!, 1);
    }
    this.Genres.push(genre);
    this.Genres.sort((a, b) => a.gName.localeCompare(b.gName));
  }

  addGenre() {
    this.newBook.genres?.push(this.NewGenre!);
    const index = this.Genres.findIndex(g => g.gName === this.NewGenre?.gName);
    this.Genres.splice(index, 1);
    this.NewGenre = null;
  }

  addLibrary() {
    this.newBook.libraries?.push(this.NewLibrary!);
    const index = this.Libraries.findIndex(l => l.libraryId === this.NewLibrary?.libraryId);
    this.Libraries.splice(index, 1);
    this.NewLibrary = null;
  }

  DeleteLibrary(library: Library) {
    const index = this.newBook.libraries?.findIndex(l => l.libraryId === library.libraryId);
    if(index !== -1) {
      this.newBook.libraries?.splice(index!, 1);
    }
    this.Libraries.push(library);
    this.Libraries.sort((a, b) => a.city.localeCompare(b.city));
  }
}
