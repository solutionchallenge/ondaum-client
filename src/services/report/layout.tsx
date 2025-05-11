import { ReactNode } from "react";

export interface ReportLayout {
  children?: ReactNode;
}

function ReportLayout({ children }: ReportLayout) {
  return <main className="pb-52 pt-16 px-5 mt-5">{children}</main>;
}

export default ReportLayout;
