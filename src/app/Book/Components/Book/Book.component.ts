import { Component, Input } from '@angular/core';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-book',
  templateUrl: './Book.component.html',
  styleUrl: './Book.component.css',
})
export class BookComponent {
  @Input() isAuth: boolean = false;
  @Input() book: Book = { bookId: 0, title: '', edition: '', editionDate: 2000 ,price: 0 };
}
