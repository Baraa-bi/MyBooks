// src/validationSchema.ts

import * as yup from "yup";

export const bookInputSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  image: yup.string().required("Image is required").url("Invalid URL format"),
  publicationYear: yup
    .number()
    .integer()
    .required("Publication year is required")
    .positive("Publication year must be a positive number"),
});
