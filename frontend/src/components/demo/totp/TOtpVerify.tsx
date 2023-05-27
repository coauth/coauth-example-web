import Box from "@mui/material/Box";
import {Alert, AlertTitle, Button, Grid, Modal, Paper, Stack, styled, TextField} from "@mui/material";
import {useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OTPInput from "otp-input-react";
import {useAtom} from "jotai";
import {userDetailsState} from "../../../state/UserDetailsState.ts";
import {ChangeEvent} from 'react';
import ApiClient from "../../../services/ApiClient.ts";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";

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


const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


interface ApiResponse {
  statusCode: string,
  statusDescription: string
}


const TOtpVerify = (() => {
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useAtom(userDetailsState);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);


  const handleOpenModal = ((title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
    setOpenModal(true);
  });
  const handleCloseModal = () => setOpenModal(false);


  const handleOpenSuccessModal = ((title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
    setOpenSuccessModal(true);
  });
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);


  const onOTPInput = ((otp: string) => {
    setOTP(() => otp);
    if (otp.length == 6) {
      validateTOtp(otp);
    }
  });


  const validateTOtpRequest = async (requestPayload: any) => {
    const response = await ApiClient().withPayload(requestPayload).post('/verify');
    if (response.isError()) {
      handleOpenModal("An Error Occurred: Error Code" + response.status(), "Some went wrong while connecting to server. Ping me to resolve. :p");
    } else {
      const data = response.payload() as ApiResponse;
      if (data.statusCode === "200") {
        handleOpenSuccessModal("Nice Work!!!", `<li>` + data.statusDescription + `</li>`);
      } else {
        handleOpenModal("Oops!!!: Error Code" + data.statusCode, `<li>` + data.statusDescription + `</li>`);
      }
    }
  }

  const validateTOtp = (otp: string) => {
    const requestPayload = {"userId": userId, "otp": otp}
    const ajv = new Ajv({allErrors: true, $data: true});
    ajvErrors(ajv);

    setOTP("");

    const schema = {
      type: "object",
      properties: {
        userId: {type: "string", minLength: 6, maxLength: 25},
        otp: {type: "string", minLength: 6, maxLength: 6}
      },
      required: ["userId", "otp"],
      additionalProperties: false,
      errorMessage: {
        type: "User Id and OTP is mandatory",
        required: {
          userId: "User Id cannot be empty",
          otp: "OTP cannot be empty"
        },
        properties: {
          userId: "User Id should be >=6 and <=25 characters in length",
          otp: "OTP should be 6 characters in length"
        }
      }
    }
    const validate = ajv.compile(schema)

    if (!validate(requestPayload)) {
      let errors = ``;
      validate.errors?.map((errorObject) => errors += `<li>` + errorObject.message + `</li>`);
      handleOpenModal("Invalid data entered", errors);
    } else {
      validateTOtpRequest(requestPayload);
    }


  }


  return (
      <>
        <Grid item xs={10} alignItems='center' display="flex"
              justifyContent='center' alignContent='center' width={"100%"}>

          <Box display="flex"
               justifyContent="center"
               alignItems="center">
            <Stack>
              <Item>
                <Alert severity="info" variant={"standard"}>
                  <AlertTitle>Enter the TOTP generated on your Authenticator App</AlertTitle>
                </Alert>
              </Item>
              <Item>
                <TextField id="outlined-basic" label="User Id" variant="outlined"
                           value={userId} focused
                           onChange={(event: ChangeEvent<HTMLInputElement>) => {
                             setUserId(event.target.value);
                           }}></TextField>
              </Item>
              <Item>
                <br/>
              </Item>
              <Item>
                <OTPInput value={OTP} onChange={(event: string) => {
                  onOTPInput(event);
                }} autoFocus OTPLength={6} otpType="number"
                          disabled={false}
                          secure inputStyles={{height: 50, width: 50, border: "1px solid #CCC"}}
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                          }}/>

              </Item>
              <Item>
                <Button variant={"contained"} color={"secondary"} onClick={() => validateTOtp(OTP)}>Verify OTP</Button>
              </Item>
              <Item sx={{textAlign: "left"}}>
                <Alert severity="info" variant={"outlined"}>
                  <AlertTitle>Important notes on configuration</AlertTitle>
                  <ul>
                    <li>After 'x' failed attempts, the TOTP would be blocked.</li>
                    <li>Once a TOTP code has been used, the same cannot be reused for 'n' attempts.</li>
                  </ul>

                </Alert>
              </Item>
            </Stack>

          </Box></Grid>
        <div>
          <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Alert severity={"error"}>
                <AlertTitle>{modalTitle}</AlertTitle>
                <ul dangerouslySetInnerHTML={{__html: modalBody}}></ul>
              </Alert>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
              open={openSuccessModal}
              onClose={handleCloseSuccessModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Alert severity={"success"}>
                <AlertTitle>{modalTitle}</AlertTitle>
                <ul dangerouslySetInnerHTML={{__html: modalBody}}></ul>
              </Alert>
            </Box>
          </Modal>
        </div>
      </>

  );


});

export default TOtpVerify;