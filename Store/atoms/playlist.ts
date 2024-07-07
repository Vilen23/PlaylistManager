import { atom } from "recoil";

interface playlistsongProps {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  href: string;
  id: string;
  images: Array<{ url: string }>;
  name: string;
  owner: {
    display_name: string;
    href: string;
  };
  tracks: {
    href: string;
    items: Array<{
      track: {
        artists: Array<{
          name: string;
          href: string;
        }>;
        album: {
          images: Array<{
            url: string;
          }>;
        };
        duration: number;
        name: string;
        preview_url: string;
      };
    }>;
  };
}
export const playlistsongAtom = atom<playlistsongProps>({
  key: "playlistsongAtom",
  default: {
    external_urls: {
      spotify: "",
    },
    followers: {
      total: 0,
    },
    href: "",
    id: "",
    images: [{ url: "" }],
    name: "",
    owner: {
      display_name: "",
      href: "",
    },
    tracks: {
      href: "",
      items: [
        {
          track: {
            artists: [
              {
                name: "",
                href: "",
              },
            ],
            album: {
              images: [{ url: "" }],
            },
            duration: 0,
            name: "",
            preview_url: "",
          },
        },
      ],
    },
  },
});
