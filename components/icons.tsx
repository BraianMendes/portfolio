import {
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaMoon,
  FaSun,
  FaHeart,
  FaSearch,
  FaPython,
  FaDatabase,
  FaFileExcel,
  FaRobot,
  FaServer,
  FaHdd,
  FaJs,
  FaReact,
  FaCss3Alt,
  FaBrain,
  FaCogs,
  FaUsers,
  FaPalette,
} from "react-icons/fa";
import {
  SiR,
  SiTableau,
  SiNextdotjs,
  SiArduino,
  SiRaspberrypi,
} from "react-icons/si";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const DiscordIcon = FaDiscord;
export const TwitterIcon = FaTwitter;
export const GithubIcon = FaGithub;
export const MoonFilledIcon = FaMoon;
export const SunFilledIcon = FaSun;
export const HeartFilledIcon = FaHeart;
export const SearchIcon = FaSearch;
export const PythonIcon = FaPython;
export const RIcon = SiR;
export const SQLIcon = FaDatabase;
export const ExcelIcon = FaFileExcel;
export const TableauIcon = SiTableau;
export const ArduinoIcon = SiArduino;
export const RaspberryPiIcon = SiRaspberrypi;
export const AIIcon = FaRobot;
export const DataIcon = FaServer;
export const IoTIcon = FaHdd;
export const JavaScriptIcon = FaJs;
export const ReactIcon = FaReact;
export const CSSIcon = FaCss3Alt;
export const NextJSIcon = SiNextdotjs;
export const PsychologyIcon = FaBrain;
export const EngineeringIcon = FaCogs;
export const LeadershipIcon = FaUsers;
export const DesignIcon = FaPalette;
