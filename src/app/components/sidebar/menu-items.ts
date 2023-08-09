import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/clusters",
    title: "Clusters",
    icon: "mdi mdi-server",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/servers",
    title: $localize`Servers`,
    icon: "mdi mdi-server-minus",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/agents",
    title: $localize`Agents`,
    icon: "mdi mdi-arrange-bring-to-front",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/repos",
    title: $localize`Repositories`,
    icon: "mdi mdi-code-braces",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/crons",
    title: $localize`Crons`,
    icon: "mdi mdi-timelapse",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/hooks",
    title: $localize`Hooks`,
    icon: "mdi mdi-hook",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/jobs",
    title: $localize`Jobs`,
    icon: "mdi mdi-backburger",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/messages",
    title: $localize`Messages`,
    icon: "mdi mdi-tooltip",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/configs",
    title: $localize`Configs`,
    icon: "mdi mdi-gear",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/exit",
    title: $localize`Sign out`,
    icon: "mdi mdi-power",
    class: "",
    extralink: false,
    submenu: [],
  },
];
