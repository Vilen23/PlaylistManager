import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
interface song {
        id: string;
        name: string;
        artists: any[];
        release_date: string;
        images: any[];
        external_urls: { spotify: string};
    }

export const newReleaseAtom = atom({
        key: "newRelease",
        default: [] as song[],
        effects_UNSTABLE: [persistAtom],
})