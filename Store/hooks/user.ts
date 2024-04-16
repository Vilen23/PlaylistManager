import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/User";

export const useUser = useRecoilState(userAtom);