import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Fragment, ReactNode, useState} from 'react';
import TOtpScanQr from "../../../components/demo/totp/TOtpScanQr.tsx";
import TOtpTakeAway from "../../../components/demo/totp/TOtpTakeAway.tsx";
import TOtpVerify from "../../../components/demo/totp/TOtpVerify.tsx";

const steps = ['Scan QR with Authenticator App', 'Validate your TOTP', 'Take Away'];


const openLink = (link: string) => {
  window.open(link, "blank");
};


const TOtpWebPage = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());


  const isStepOptional = (step: number) => {
    return step === 10;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };


  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };


  return (
      <>
        <Typography variant={"h5"}>CO-Auth - With Time based One-Time Passwords (TOTP)</Typography>
        <Divider style={{margin: 15}}/>
        <Typography>With CO-Auth you can enable verification using TOTP verification from centralized servers. At the
          same time control cases where users have been locked in right from admin panels.
          You can notify users of use on SMS and email. You can use any authenticator apps to scan a QR and then
          generate OTP from
          device which are verified by server.</Typography>
        <Paper style={{margin: 10}}></Paper>
        <Grid container
              alignItems='center'
              justifyContent='center'
              style={{background: "#FFF", paddingTop: 30, marginTop: 10, paddingBottom: 30}}
        >
          <Grid item xs={10}>
            <Box
            >
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                  );
                })}
              </Stepper>

            </Box>
          </Grid>
          <Grid item xs={12}>
            <br/>
          </Grid>
          {activeStep == 0 ?
              <TOtpScanQr/> : null}
          {activeStep == 1 ?
              <TOtpVerify/> : null}
          {activeStep == 2 ?
              <TOtpTakeAway/> : null}
          <Grid item xs={10}>

            <Box>
              {activeStep === steps.length ? (
                  <Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                      <Box sx={{flex: '1 1 auto'}}/>
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </Fragment>
              ) : (
                  <Fragment>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                      <Button variant={"contained"}
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{mr: 1}}
                      >
                        Back
                      </Button>
                      <Box sx={{flex: '1 1 auto'}}/>
                      {activeStep <= steps.length - 2 ?
                          <Button onClick={handleNext} variant={"contained"}>
                            Next
                          </Button> : null}
                      {activeStep === steps.length - 1 ?
                          <><Button onClick={() => {
                            openLink('https://github.com/godwinpinto/authable')
                          }}
                                    variant={"contained"}>
                            Star us on Github
                          </Button> <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={() => {
                              openLink('https://github.com/sponsors/godwinpinto')
                            }}
                                    variant={"contained"}>
                              Consider Sponsoring ?
                            </Button></> : null}
                    </Box>
                  </Fragment>
              )}
            </Box>
          </Grid>

        </Grid>

      </>
  );
};

export default TOtpWebPage;