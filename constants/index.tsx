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
  name: string;
  icon: () => React.JSX.Element;
  background: string;
  color: string;
  urlStartWith: string;
};

export const platforms: PlatformProps[]  = [
  {
    name: "Facebook",
    icon: () => <FacebookIcon />,
    background: "#1877F2",
    color: "#ffffff",
    urlStartWith: "https://www.facebook.com/",
  },
  {
    name: "CodePen",
    icon: () => <CodepenIcon />,
    background: "#000000",
    color: "#ffffff",
    urlStartWith: "https://codepen.io/",
  },
  {
    name: "freeCodeCamp",
    icon: () => <FreeCodeCampIcon />,
    background: "#0A0A23",
    color: "#ffffff",
    urlStartWith: "https://www.freecodecamp.org/",
  },
  {
    name: "GitHub",
    icon: () => <GitHubIcon />,
    background: "#181717",
    color: "#ffffff",
    urlStartWith: "https://github.com/",
  },
  {
    name: "Codewars",
    icon: () => <CodewarsIcon />,
    background: "#B1361E",
    color: "#ffffff",
    urlStartWith: "https://www.codewars.com/",
  },
  {
    name: "GitLab",
    icon: () => <GitLabIcon />,
    background: "#FC6D26",
    color: "#ffffff",
    urlStartWith: "https://gitlab.com/",
  },
  {
    name: "Hashnode",
    icon: () => <HashnodeIcon />,
    background: "#2962FF",
    color: "#ffffff",
    urlStartWith: "https://hashnode.com/",
  },
  {
    name: "LinkedIn",
    icon: () => <LinkedInIcon />,
    background: "#0A66C2",
    color: "#ffffff",
    urlStartWith: "https://www.linkedin.com/in/",
  },
  {
    name: "Stack Overflow",
    icon: () => <StackOverflowIcon />,
    background: "#F48024",
    color: "#ffffff",
    urlStartWith: "https://stackoverflow.com/users/",
  },
  {
    name: "Twitch",
    icon: () => <TwitchIcon />,
    background: "#9146FF",
    color: "#ffffff",
    urlStartWith: "https://www.twitch.tv/",
  },
  {
    name: "Twitter",
    icon: () => <TwitterIcon />,
    background: "#1DA1F2",
    color: "#ffffff",
    urlStartWith: "https://twitter.com/",
  },
  {
    name: "YouTube",
    icon: () => <YouTubeIcon />,
    background: "#FF0000",
    color: "#ffffff",
    urlStartWith: "https://www.youtube.com/",
  },
];

export const platformsNames = platforms.map((p) => p.name);
