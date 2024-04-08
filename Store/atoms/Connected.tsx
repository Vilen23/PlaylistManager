import { atom } from "recoil";

export const connectedAtom = atom({
    key: "connected",
    default: {
        spotify: false,
        appleMusic: false,
        youtubeMusic: false,
        amazonMusic: false,
    }
})