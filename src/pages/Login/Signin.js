import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { SignIn } from "../../validation/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useDispatch } from "react-redux";
import { loginUsers } from "../../Feature/Slice/UserSlice";

const Signin = () => {
  const [passwordShow, setPasswordShow] = useState("password");

  const [loader, setLoader] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignIn,
    onSubmit: () => {
      signinuser();
    },
  });

  const signinuser = () => {
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({user}) => {
        console.log(user.email);
        dispatch(loginUsers(user));
        navigate("/");
      })
      .catch((error) => {
        if (error.message.includes("auth/too-many-requests")) {
          toast.error(
            "🦄temporarily disabled due to many failed login attempts!",
            {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        } else if (error.message.includes("auth/wrong-password")) {
          toast.error("🦄Wrong password!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (error.message.includes("auth/user-not-found")) {
          toast.error("🦄Wrong email!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  const handlePassShow = () => {
    if (passwordShow == "password") {
      setPasswordShow("text");
    } else {
      setPasswordShow("password");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="from_Head">
          <h1>Login to your account !</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-basic-email"
            label="Email Address"
            variant="outlined"
            type="email"
            className="inputs"
            margin="normal"
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
          <div className="signin_password_feild">
            <TextField
              type={passwordShow}
              id="outlined-basic-"
              label="Password"
              variant="outlined"
              className="inputs"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
            />
            <div className="login_icon__feild" onClick={handlePassShow}>
              {passwordShow == "password" ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>
          <div className="forgot_pass">
            <span>Forgot Password</span>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
          <div className="SigninButton">
            {loader ? (
              <Button type="submit" variant="contained" disabled>
                <PulseLoader color="#fff" size={10} />
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Sign In
              </Button>
            )}
          </div>
        </form>
        <div className="signin_text">
          <p>
            Don't have an account ?
            <Link className="link__button" to={"/signup"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
