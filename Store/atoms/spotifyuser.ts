import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const spotifyUserTokenAtom = atom({
  key: "spotifyUserToken",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const spotifyUserAtom = atom({
  key: "spotifyUser",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

