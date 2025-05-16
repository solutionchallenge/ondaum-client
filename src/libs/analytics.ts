import ReactGA from "react-ga4";
import { UaEventOptions } from "react-ga4/types/ga4";

ReactGA.initialize(`${import.meta.env.VITE_PUBLIC_GA_ID}`);

export const track = (action: UaEventOptions | string, params?: any) => {
  ReactGA.event(action, params);
};
