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
    title: "Servers",
    icon: "mdi mdi-server-minus",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/agents",
    title: "Agents",
    icon: "mdi mdi-arrange-bring-to-front",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/repos",
    title: "Repositories",
    icon: "mdi mdi-folder",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/works",
    title: "Works",
    icon: "mdi mdi-backburger",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/configs",
    title: "Config",
    icon: "fa fa-cog",
    class: "",
    extralink: false,
    submenu: [],
  },
];
