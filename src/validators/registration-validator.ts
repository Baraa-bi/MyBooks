import * as yup from "yup";

const registrationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const validateRegistrationInput = async (input: any): Promise<void> => {
  try {
    await registrationSchema.validate(input, { abortEarly: false });
  } catch (errors) {
    throw errors;
  }
};

export { validateRegistrationInput };
