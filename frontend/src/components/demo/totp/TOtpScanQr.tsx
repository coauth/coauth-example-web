import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import Box from '@mui/material/Box';
import ApiClient from "../../../services/ApiClient.ts";
import {useEffect, useState} from 'react';
import {userDetailsState} from "../../../state/UserDetailsState.ts";
import {useAtom} from "jotai";
import {tOtpDetailsState} from "../../../state/TOtpDetailsState.ts";
import {focusAtom} from 'jotai-optics'

interface ApiResponse {
  status: string,
  qrImage: string,
  username: string,
  message?: string,
  description?: string
}

const openLink = (link: string) => {
  window.open(link, "blank");
};


//modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

type TOtpDetailsInterface = {
  username: string,
  qrImage: string
}

let loadApi = false;
const totpDetailsUsername = focusAtom<TOtpDetailsInterface, string, void>(tOtpDetailsState, (optic) => optic.prop('username'));
const totpDetailsQrImage = focusAtom<TOtpDetailsInterface, string, void>(tOtpDetailsState, (optic) => optic.prop('qrImage'));

const TOtpScanQr = () => {

  const [qrImage, setQrImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [userId, setUserId] = useAtom(userDetailsState);
  const [tOtpUsername, setTOtpUsername] = useAtom(totpDetailsUsername);
  const [tOtpQrImage, setTOtpQrImage] = useAtom(totpDetailsQrImage);

  const handleOpenModal = ((title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
    setOpenModal(true);
  });
  const handleCloseModal = () => setOpenModal(false);

  const loadQRImage = async () => {
    if (tOtpQrImage != undefined && tOtpUsername != undefined && tOtpUsername.toString() != 'none') {
      setQrImage(tOtpQrImage.toString());
      setUserId(tOtpUsername.toString());
      return;
    }
    if (!loadApi) {
      loadApi = true;
    } else {
      return;
    }
    const response = await ApiClient().post('/generate-qr');
    if (response.isError()) {
      handleOpenModal("An Error Occurred: code" + response.status(), "Some went wrong while connecting to server. Ping me to resolve. :p");
    } else {
      const data = response.payload() as ApiResponse;
      setTOtpQrImage(() => data.qrImage);
      await setTOtpUsername(() => data.username);
      setQrImage(data.qrImage);
      setUserId(data.username);
    }
  }

  useEffect(() => {
    loadQRImage();
  });


  return (
      <>
        <Grid item xs={10}>
          <Alert severity="info" variant={"outlined"}>
            <AlertTitle>Download an <b>authenticator app</b></AlertTitle>
            Please download any of the Authenticator apps available on Play Store / App Store or choose from below
            for
            quick navigation.
            <br/>
            <br/>
            <Button variant="outlined"
                    onClick={() => {
                      openLink('https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1')
                    }}> Google
              Authenticator - Android</Button> &nbsp;
            <Button variant="outlined"
                    onClick={() => {
                      openLink('https://apps.apple.com/us/app/google-authenticator/id388497605');
                    }}>Google
              Authenticator - iOS</Button> &nbsp;
            <Button variant="outlined"
                    onClick={() => {
                      openLink('https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en')
                    }}> Microsoft Authenticator - Android</Button> &nbsp;
            <Button variant="outlined"
                    onClick={() => {
                      openLink('https://apps.apple.com/us/app/microsoft-authenticator/id983156458');
                    }}>Microsoft
              Authenticator - iOS</Button>

          </Alert>
          <Box style={{marginTop: 20}}>
            <Box>
              <Alert severity="warning" variant={"standard"}>
                <AlertTitle>On-boarding users for TOTP</AlertTitle>
                <ul>
                  <li><u>For Demo: If you already had a User Id registered here, simply click next and enter it
                    manually on next page</u>
                  </li>
                  <li>The on-boarding process is to be completed one-time in your secured logged in portal where
                    the users login with credentials.
                  </li>
                  <li>You can directly onboard from your company mobile app (if you have one), thereby completely
                    skipping the code scanning process on any authenticator app too.
                  </li>
                  <li>The User Id below is just for display purpose. In real world this would be encrypted, along
                    with other security measures and communicated between server.
                  </li>

                </ul>
              </Alert>

            </Box>
            <Box alignItems='center' display="flex"
                 justifyContent='center' alignContent='center'>
              <br/>
            </Box>

            <Box alignItems='center' display="flex"
                 justifyContent='center' alignContent='center'>
              <TextField id="outlined-basic" label="Demo User Id" variant="outlined"
                         value={userId}
                         disabled={true}
                         focused
              ></TextField>
            </Box>
            <Box alignItems='center' display="flex"
                 justifyContent='center' alignContent='center'>
              <img alt={"TOTP QR Image"}
                   src={qrImage}/>
            </Box>
            <Box alignItems='center' display="flex"
                 justifyContent='center' alignContent='center'>
              <br/>
            </Box>
            <Box alignItems='center' display="flex"
                 justifyContent='center' alignContent='center'>
              <Alert severity="info" variant={"standard"}>
                <AlertTitle>What's Next?</AlertTitle>
                Click <b>Next</b> once you have scanned the QR with Authenticator app to test the process.
              </Alert>
            </Box>
          </Box>
        </Grid>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Alert severity={"error"}>
              <AlertTitle>{modalTitle}</AlertTitle>
              {modalBody}
            </Alert>
          </Box>
        </Modal>
      </>
  );
}

export default TOtpScanQr;