import { ReactNode } from "react";

export interface ReportLayout {
  children?: ReactNode;
}

function ReportLayout({ children }: ReportLayout) {
  return <main className="pb-52 pt-16">{children}</main>;
}

export default ReportLayout;
