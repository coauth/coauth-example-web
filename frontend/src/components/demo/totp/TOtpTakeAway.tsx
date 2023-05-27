import Box from "@mui/material/Box";
import {Alert, AlertTitle, Grid, Paper, Stack, styled} from "@mui/material";


const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TOtpTakeAway() {
  return (
      <Grid item xs={10}>
        <Box sx={{width: '100%'}}>
          <Stack
              justifyContent="center"
              alignItems="center">
            <Item sx={{textAlign: "left", borderRadius: 0, width: "100%"}} elevation={0}>
              <Alert severity="info" variant={"outlined"}>
                <AlertTitle>Channels (Available / Planned) and Use Case</AlertTitle>
                <ul>
                  <li>Web Applications
                    <ul>
                      <li>As an MFA</li>
                      <li>As a PIN to authorize transactions</li>
                      <li>PIN to protect selected pages within the intranet applications which by default are
                        SSO authenticated but open
                      </li>
                      <li>Ready solution when moving from intranet to internet based web applications
                      </li>
                    </ul>
                  </li>
                  <li>Cloud Shell
                    <ul>
                      <li>As an MFA during sign-in</li>
                      <li>As a PIN before executing important commands (e.x. kubectl)</li>
                    </ul>
                  </li>
                  <li>Desktop
                    <ul>
                      <li>As an MFA</li>
                      <li>As a PIN to run configured applications</li>
                      <li>As a PIN to open configured web urls</li>
                    </ul>
                  </li>
                </ul>

              </Alert>
            </Item>
            <Item sx={{textAlign: "left", borderRadius: 0, width: "100%"}} elevation={0}>
              <Alert severity="info" variant={"outlined"}>
                <AlertTitle>Advantages of TOTP with CO-Auth</AlertTitle>
                <ul>
                  <li>TOTP has been an industry wide trusted 2FA mode</li>
                  <li>Controller user lock out, audit, etc. from central point</li>
                  <li>No SMS / Email / Whatsapp costs associated for sending PIN</li>
                  <li>No SMS / Email costs for sending PIN</li>
                  <li>No need to rebuild for same user for a different application</li>
                  <li>Easily deploy a working product in a matter of hours to days</li>
                </ul>
              </Alert>
            </Item>
            <Item sx={{textAlign: "left", borderRadius: 0, width: "100%"}} elevation={0}>
              <Alert severity="success" variant={"filled"}>
                <AlertTitle>Fully Open source and Free to use in your commercial applications</AlertTitle>
              </Alert>
            </Item>
          </Stack>

        </Box> </Grid>
  );
}