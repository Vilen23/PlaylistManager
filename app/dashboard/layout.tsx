import { useRecoilValue } from "recoil";
import { Providers } from "../providers";
import { Poppins } from "next/font/google";
import { spotifyUserAtom } from "@/Store/atoms/spotifyuser";
import SpotifyHeader from "@/components/SpotifyHeader";

const inter = Poppins({ subsets: ["latin"], weight: "500" });
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <SpotifyHeader/>
        {children}
      </div>
    );
  }