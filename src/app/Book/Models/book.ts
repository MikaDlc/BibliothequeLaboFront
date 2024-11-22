import {Author} from './author';
import {Genre} from './genre';
import {Library} from './library';

export interface Book {
  bookId: number
  title: string
  edition: string
  editionDate: number
  price: number
  authors: Author[]
  genres: Genre[]
  libraries: Library[]
  libraryQuantity: number[]
}
