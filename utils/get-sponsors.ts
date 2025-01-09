import {uniqBy} from "@nextui-org/shared-utils";
import fetch from "node-fetch";

import {__PROD__} from "./env";

import {mockData, Sponsor} from "@/libs/docs/sponsors";

export const getSponsors = async () => {
  try {
    // if (!__PROD__) {
    //   return mockData;
    // }
    const res = await fetch("https://cdn.jsdelivr.net/gh/everfu/static/sponsors.json");
    const data = (await res.json()) as Sponsor[];

    // filter out repeated sponsors
    const sponsors = uniqBy<Sponsor>(data, "profile").filter(
      (sponsor) =>
        sponsor.role !== "ADMIN" && sponsor.role !== "HOST" && sponsor.name !== "EthicalAds",
    );

    return sponsors as Sponsor[];
  } catch (error) {
    return __PROD__ ? [] : mockData;
  }
};
