import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  @Output() addBook = new EventEmitter<void>();

  onAddBook() {
    this.addBook.emit();
  }
}
