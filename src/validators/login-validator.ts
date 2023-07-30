import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const validateLoginInput = async (input: any): Promise<void> => {
  try {
    await loginSchema.validate(input, { abortEarly: false });
  } catch (errors) {
    throw errors;
  }
};

export { validateLoginInput };
