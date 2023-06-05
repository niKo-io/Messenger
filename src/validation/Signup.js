import * as Yup from "yup";

export const Signup = Yup.object({
  email: Yup.string()
    .matches(
      /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      "Please enter a valid email address"
    )
    .required("Please enter your email address"),
  fullname: Yup.string().min(3).max(15).required("Please enter your full name"),
  password: Yup.string()
    .min(8)
    .matches(
      /(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "Your password must be have at least 1 special"
    )
    .required("Please enter your password"),
});

export const SignIn = Yup.object({
  email: Yup.string()
    .matches(
      /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      "Please enter a valid email address"
    )
    .required("Please enter your email address"),
  password: Yup.string().min(8).required("Please enter your password"),
});
