import React from "react";
import SigninSvg from "../../SVG/login";
import { Container, Grid } from "@mui/material";
import "./style.css";
import Signin from "./Signin";


const Login = () => {
  return (
    <>
      <div className="signin">
        <Container fixed>
          <div className="signin_wrapper">
            <Grid container>
              <Grid item xs={6}>
                {/* registration img here */}
                <SigninSvg />
              </Grid>
              <Grid item xs={6}>
                {/* Signin forms here */}
                <Signin />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
