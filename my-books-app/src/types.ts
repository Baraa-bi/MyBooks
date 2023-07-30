export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  country: string;
  language: string;
  pages: number;
  link: string;
  publicationYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookFormFields {
  id?: string;
  title: string;
  author: string;
  publicationYear: number;
  image: string;
}

export enum BookCardMode {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}
