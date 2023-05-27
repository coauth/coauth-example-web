import {createTheme, Grid, ThemeProvider, Typography} from "@mui/material";
import ModuleItem from '../../components/home/ModuleItem.tsx';

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
    fontFamily: "Open Sans",
    h6: {
      marginBlock: 0,
      marginInline: 0,
      margin: 0,
      padding: 0,
      fontWeight: "bold"
    }
  },
});


const modules = [
  {
    title: "Time Based OTP",
    description: "Algorithm that generates a one-time password (OTP) on authenticator apps",
    status: "A",
    notes: "e.x. Microsoft Authenticator, Google Authenticator"
  },
  {
    title: "Whatsapp approval",
    description: "No need to download separate apps. Confirm your access using a link",
    status: "N",
    notes: "Using Whatsapp"
  },
  {
    title: "Regular OTP",
    description: "Generate and send regular One-Time-Password text as an SMS, Email or Whatsapp",
    status: "N",
    notes: "Using SMS / Email / Whatsapp"
  },
  {
    title: "Qr Auth",
    description: "Scan random generated QR from mobile app using camera / custom mobile app",
    status: "N",
    notes: "Using Camera"
  },
  {
    title: "Security Questions",
    description: "Validate authentication against personal security questions set by user",
    status: "N",
    notes: "Users recall memory "
  },
  {
    title: "Auth Codes",
    description: "Enter auth codes in your mobile app that are displayed on your web apps",
    status: "N",
    notes: "Custom mobile app"
  }
];


const channels = [
  {
    title: "Web Applications",
    description: "Demonstrate integrations with web based applications",
    status: "A",
    notes: ""
  },
  {
    title: "Desktop Shell / Cloud Shell",
    description: "Example to demonstrate integrations to protect your  Cloud Shell",
    status: "U",
    notes: ""
  },
  {
    title: "Desktop GUI",
    description: "Demonstrate integrations with Windows and Linux GUI",
    status: "U",
    notes: ""
  }
];

const plugins = [
  {
    title: "Custom mobile app",
    description: "A complete mobile application with all authentication modes developed in Flutter",
    status: "N",
    notes: ""
  },
  {
    title: "Javascript / TypeScript",
    description: "A javascript and typescript plugin to integrate auth modules in app for web",
    status: "N",
    notes: ""
  }
];


const HomePage = () => {

  const listModules = modules.map((row, idx) => <ModuleItem key={idx} {...row}/>);

  const listChannels = channels.map((row, idx) => <ModuleItem key={idx} {...row}/>);

  const listPlugins = plugins.map((row, idx) => <ModuleItem key={idx} {...row}/>);


  return (
      <>
        <ThemeProvider theme={theme}>
          <Grid container spacing={1} rowSpacing={0}>
            {/*
          <Grid item xs={6}>
            <img src={assets.images.banner} alt={"CO-Auth Banner"}/>
          </Grid>
*/}
            <Grid item xs={12}>
              <Typography>
                CO-Auth is one stop solution when you want to include <b>Post Primary Authentication
                Verification</b> in your Web, Shell and Desktop applications.
                While the best purpose can be as an Virtual MFA or for Transactional verification, it is open to be used
                as a basic authentication module.
              </Typography>
            </Grid>
            <Grid item xs={12} rowSpacing={0} padding={0}>
              <Typography variant="h4">
                What's included in demo?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Auth Modes
              </Typography>
            </Grid>
            {listModules}
            <Grid item xs={12}>
              <Typography variant="h6">
                Auth Channel
              </Typography>
            </Grid>
            {listChannels}
            <Grid item xs={12}>
              <Typography variant="h6">
                Apps / SDK / Plugin
              </Typography>
            </Grid>
            {listPlugins}
            <Grid item xs={12}>
              <Typography variant="h4">
                Open for Contribution
              </Typography>
              <p>Going solo takes time. CO-Auth is open for contributions. A star on Github adds to my motivation and
                also audience reach. Thank you for your consideration.</p>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
  );
};

export default HomePage;