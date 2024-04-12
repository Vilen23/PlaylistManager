import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const connectedAtom = atom({
    key: "connected",
    default: {
        spotify: false,
        appleMusic: false,
        youtubeMusic: false,
        amazonMusic: false,
    },
    effects_UNSTABLE: [persistAtom],
})