import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./types";

export const getDashboardBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
  },
];

export const getCreateMeetingBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "Create Meeting",
    },
  ];

  export const getMyMeetingsBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "My Meetings",
    },
  ];

  export const getMeetingsBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "Meetings",
    },
  ];