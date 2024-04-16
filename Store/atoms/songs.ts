import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const songAtom = atom({
    key:"songAtom",
    default:[],
    effects_UNSTABLE: [persistAtom],

})