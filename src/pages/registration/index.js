import React from "react";
import "./style.css";
import Forms from "./Forms";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Signup from "../../SVG/Signup";

const Registration = () => {
  return (
    <>
      <div className="registration">
        <Container fixed>
          <div className="registration_wrapper"> 
            <Grid container>
              <Grid item xs={6}>
                {/* SignUP forms here */}
                <Forms />
              </Grid>
              <Grid item xs={6}>
                {/* registration img here */}
                <Signup />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Registration;
