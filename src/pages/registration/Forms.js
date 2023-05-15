import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Signup } from "../../validation/Signup";
import { GoEyeClosed, GoEye } from "react-icons/go";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Forms = () => {
  const [passwordShow, setPasswordShow] = useState("password");

  const [loader, setLoader] = useState(false);

  const auth = getAuth();

  let initialValues = {
    email: "",
    fullname: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Signup,
    onSubmit: () => {
      createUsers();
    },
  });

  const handlePassShow = () => {
    if (passwordShow == "password") {
      setPasswordShow("text");
    } else {
      setPasswordShow("password");
    }
  };

  const createUsers = () => {
    setLoader(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        // Signed in
        sendEmailVerification(auth.currentUser).then(() => {
          toast.success("Email has been send", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
        navigation("/login");
        setLoader(false);
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("The email is already in use", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setLoader(false);
      });
  };

  const navigation = useNavigate();

  return (
    <>
      <div className="form">
        <div className="fromHead">
          <h1>Get started with easily register</h1>
          <h2>Free register and you can enjoy it</h2>
        </div>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-basic-email"
            label="Email Address"
            variant="outlined"
            type="email"
            className="text-width"
            margin="normal"
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
          <TextField
            id="outlined-basic-fullname"
            label="Full Name"
            variant="outlined"
            type="text"
            className="text-width"
            margin="normal"
            name="fullname"
            onChange={formik.handleChange}
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <p>{formik.errors.fullname}</p>
          )}
          <div className="password__feild">
            <TextField
              type={passwordShow}
              id="outlined-basic-"
              label="Password"
              variant="outlined"
              className="text-width"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
            />
            <div className="icon__feild" onClick={handlePassShow}>
              {passwordShow == "password" ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
          <div className="formButton">
            {loader ? (
              <Button type="submit" variant="contained" disabled>
                <PulseLoader color="#fff" size={10} />
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
            )}
          </div>
        </form>
        <div className="text">
          <p>
            Already have an account ?{" "}
            <Link className="link__button" to={"/login"}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Forms;
