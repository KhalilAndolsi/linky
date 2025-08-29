import React from "react";
import {
  FacebookIcon,
  CodepenIcon,
  FreeCodeCampIcon,
  GitHubIcon,
  CodewarsIcon,
  GitLabIcon,
  HashnodeIcon,
  LinkedInIcon,
  StackOverflowIcon,
  TwitchIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/icons";

export type PlatformProps = {
  icon: () => React.JSX.Element;
  color: string;
  urlStartWith: string;
};

export const platforms = {
  FACEBOOK: {
    icon: () => <FacebookIcon />,
    color: "#1877F2",
    urlStartWith: "https://www.facebook.com/",
    name: "Facebook",
  },
  CODEPEN: {
    icon: () => <CodepenIcon />,
    color: "#000000",
    urlStartWith: "https://codepen.io/",
    name: "CodePen",
  },
  FREECODECAMP: {
    icon: () => <FreeCodeCampIcon />,
    color: "#0A0A23",
    urlStartWith: "https://www.freecodecamp.org/",
    name: "freeCodeCamp",
  },
  GITHUB: {
    icon: () => <GitHubIcon />,
    color: "#181717",
    urlStartWith: "https://github.com/",
    name: "GitHub",
  },
  CODEWARS: {
    icon: () => <CodewarsIcon />,
    color: "#B1361E",
    urlStartWith: "https://www.codewars.com/",
    name: "Codewars",
  },
  GITLAB: {
    icon: () => <GitLabIcon />,
    color: "#FC6D26",
    urlStartWith: "https://gitlab.com/",
    name: "GitLab",
  },
  HASHNODE: {
    icon: () => <HashnodeIcon />,
    color: "#2962FF",
    urlStartWith: "https://hashnode.com/",
    name: "Hashnode",
  },
  LINKEDIN: {
    icon: () => <LinkedInIcon />,
    color: "#0A66C2",
    urlStartWith: "https://www.linkedin.com/in/",
    name: "LinkedIn",
  },
  STACKOVERFLOW: {
    icon: () => <StackOverflowIcon />,
    color: "#F48024",
    urlStartWith: "https://stackoverflow.com/users/",
    name: "Stack Overflow",
  },
  TWITCH: {
    icon: () => <TwitchIcon />,
    color: "#9146FF",
    urlStartWith: "https://www.twitch.tv/",
    name: "Twitch",
  },
  TWITTER: {
    icon: () => <TwitterIcon />,
    color: "#1DA1F2",
    urlStartWith: "https://twitter.com/",
    name: "Twitter",
  },
  YOUTUBE: {
    icon: () => <YouTubeIcon />,
    color: "#FF0000",
    urlStartWith: "https://www.youtube.com/",
    name: "YouTube",
  },
};

export type KeysType = keyof typeof platforms

export type LinkType = {
  id: string
  platform: KeysType,
  link: string
}

export const platforms_keys = Object.keys(platforms) as (KeysType)[]
