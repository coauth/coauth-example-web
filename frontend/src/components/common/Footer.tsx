import {FC, ReactElement} from "react";
import {Box, Container, Divider, Grid, Typography} from "@mui/material";


export const Footer: FC = (): ReactElement => {
  return (
      <Box
          sx={{
            color: "#FFF",
            width: "100%",
            height: "auto",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginTop: "auto",
            flexShrink: 0
          }}
      >
        <Container maxWidth="lg">
          <Divider color="#FAF9F6" style={{opacity: 0.1}} variant="fullWidth"/>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography style={{fontSize: "12px"}}>
                www.coauth.dev - {`${new Date().getFullYear()}`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
  );
};

export default Footer;