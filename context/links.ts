import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LinkProps = {
  id: string;
  platformName: string;
  url: string;
  order: number;
};

type LinksState = {
  links: LinkProps[];
  addNewLink: (link: LinkProps) => void;
  updateLinks: (linksUpdated: LinkProps[]) => void;
  deleteLink: (id: string) => void;
};

export const useLinksStore = create<LinksState>()(
  persist(
    (set, get) => ({
      links: [],
      addNewLink: (link: LinkProps) => set({ links: [...get().links, link] }),
      updateLinks: (linksUpdated: LinkProps[]) => set({ links: linksUpdated }),
      deleteLink: (id: string) =>
        set({
          links: get().links.filter((l) => l.id !== id),
        }),
    }),
    {
      name: "local-links-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
