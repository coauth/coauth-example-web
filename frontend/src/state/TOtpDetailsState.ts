import {atom} from "jotai";
//import type {PrimitiveAtom} from 'jotai'

// states can be created using atom API
const initialData = {
  username: "none",
  qrImage: "",
}

type TOtpDetailsInterface = {
  username: string,
  qrImage: string
}

export const tOtpDetailsState = atom<TOtpDetailsInterface>(initialData)