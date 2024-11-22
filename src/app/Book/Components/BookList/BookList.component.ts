import {Component, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { AuthService } from '../../../Auth/Services/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';
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
  providers: [ConfirmationService, MessageService],
  encapsulation:ViewEncapsulation.None
})
export class BookListComponent implements OnInit {
  private $confirmationService: ConfirmationService = inject(ConfirmationService);
  private $bookService: BookService = inject(BookService);
  private $authService: AuthService = inject(AuthService);
  private $authorService: AuthorService = inject(AuthorService);
  private $genreService: GenreService = inject(GenreService);
  private $libraryService: LibraryService = inject(LibraryService);
  private $message: MessageService = inject(MessageService);

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  isAuth: boolean = false;
  isAdmin: boolean = false;
  load: boolean = false;
  books: Book[] = [];
  max: number = new Date().getFullYear() + 1;
  error: boolean[] = [false, false, false, false, false, false, false];

  visibleAddDialog: boolean = false;
  visibleAddAuthorDialog: boolean = false;
  visibleAddGenreDialog: boolean = false;
  visibleAddLibraryDialog: boolean = false;

  newBook: Partial<Book> = {};
  newAuthor: Partial<Author> = {};
  newGenre: Partial<Genre> = {};
  newLibrary: Partial<Library> = {};

  NewAuthor!: Author | null;
  NewGenre!: Genre | null;
  NewLibrary!: Library | null;
  Authors!: Author[];
  Genres!: Genre[];
  Libraries!: Library[];

  ngOnInit() {
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

  confirmPopupAddCancel(event: MouseEvent) {
    this.$confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Annuler les modifications?',
      accept: () => {
        this.visibleAddDialog = false;
      },
      reject: () => {
      }
    });
  }

  confirmPopupAddSave(event: MouseEvent) {
    if(!this.verifFrom()) {
      this.$confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Ajouter le livre?',
        accept: () => {
          this.load = true;
          this.$bookService.addBook(this.newBook as Book).subscribe({
            next: () => {
              this.visibleAddDialog = false;
              this.load = false;
              this.getBooks();
            },
            error: () => {
              this.$message.add({severity: 'error', summary: 'Error', detail: 'No Book insert'});
              this.load = false;
            }
          });
          this.visibleAddDialog = false;
        },
        reject: () => {
        }
      });
    }
  }

  verifFrom() {
    this.error = [false, false, false, false, false, false, false];
    let error = false;
    if(this.newBook.title === undefined || this.newBook.title === '') {
      this.error[0] = true;
      error = true;
    }
    if(this.newBook.edition === undefined || this.newBook.edition === '') {
      this.error[1] = true;
      error = true;
    }
    if(this.newBook.editionDate === undefined || this.newBook.editionDate < 0 || this.newBook.editionDate > this.max) {
      this.error[2] = true;
      error = true;
    }
    if(this.newBook.price === undefined || this.newBook.price < 0) {
      this.error[3] = true;
      error = true;
    }
    if(this.newBook.authors === undefined || this.newBook.authors.length === 0) {
      this.error[4] = true;
      error = true;
    }
    if(this.newBook.genres === undefined || this.newBook.genres.length === 0) {
      this.error[5] = true;
      error = true;
    }
    if(this.newBook.libraries === undefined || this.newBook.libraries.length === 0) {
      this.error[6] = true;
      error = true;
    }
    return error;
  }

  accept() {
  this.confirmPopup.accept();
  }

  reject() {
  this.confirmPopup.reject();
  }

  ShowAddDialog() {
    this.visibleAddDialog = true;
    this.newBook = {
      authors: [],
      genres: [],
      libraries: [],
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
    this.NewLibrary!.stock = 1;
    this.newBook.libraries?.push(this.NewLibrary!);
    const index = this.Libraries.findIndex(l => l.libraryID === this.NewLibrary?.libraryID);
    this.Libraries.splice(index, 1);
    this.NewLibrary = null;
  }

  DeleteLibrary(library: Library) {
    const index = this.newBook.libraries?.findIndex(l => l.libraryID === library.libraryID);
    if(index !== -1) {
      this.newBook.libraries?.splice(index!, 1);
    }
    this.Libraries.push(library);
    this.Libraries.sort((a, b) => a.city.localeCompare(b.city));
  }

  showDialogAddAuthor() {
    this.visibleAddAuthorDialog = true;
    this.newAuthor = {};
  }

  showAuthorCancelDialog() {
    this.visibleAddAuthorDialog = false;
  }

  showAuthorSaveDialog() {
    this.visibleAddAuthorDialog = false;
    try {
      this.$authorService.addAuthor(this.newAuthor as Author).subscribe({
        next: (author) => {
          this.Authors.push(author);
          this.Authors.sort((a, b) => a.firstName.localeCompare(b.firstName));
        },
        error: () => {
          this.$message.add({severity: 'error', summary: 'Error', detail: 'No Author insert'});
        }
      })
    } catch (error) {
      this.$message.add({severity: 'error', summary: 'Error', detail: 'No Author insert'});
    }
  }

  showDialogAddGenre() {
    this.visibleAddGenreDialog = true;
    this.newGenre = {};
  }

  showGenreCancelDialog() {
    this.visibleAddGenreDialog = false;
  }

  showGenreSaveDialog() {
    this.visibleAddGenreDialog = false;
    try {
      this.$genreService.addGenre(this.newGenre as Genre).subscribe({
        next: (genre) => {
          this.Genres.push(genre);
          this.Genres.sort((a, b) => a.gName.localeCompare(b.gName));
        },
        error: () => {
          this.$message.add({severity: 'error', summary: 'Error', detail: 'No Genre insert'});
        }
      })
    } catch (e) {
      this.$message.add({severity: 'error', summary: 'Error', detail: 'No Genre insert'});
    }
  }

  showDialogAddLibrary() {
    this.visibleAddLibraryDialog = true;
    this.newLibrary = {};
  }

  showLibraryCancelDialog() {
    this.visibleAddLibraryDialog = false;
  }

  showLibrarySaveDialog() {
    this.visibleAddLibraryDialog = false;
    try {
      this.$libraryService.addLibrary(this.newLibrary as Library).subscribe({
        next: (library) => {
          this.Libraries.push(library);
          this.Libraries.sort((a, b) => a.city.localeCompare(b.city));
        },
        error: () => {
          this.$message.add({severity: 'error', summary: 'Error', detail: 'No Library insert'});
        }
      })
    } catch (e) {
      this.$message.add({severity: 'error', summary: 'Error', detail: 'No Library insert'});
    }
  }

}
