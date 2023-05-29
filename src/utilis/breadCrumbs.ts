import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./types";

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
