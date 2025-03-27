import type { PropsWithChildren } from "react";

import { StyleGroup } from "styled-components-deno";

const CtrlBoxName = ["ctrl-box"] as const;

const CtrlBoxGroup = new StyleGroup(CtrlBoxName, "ctrl-box");

CtrlBoxGroup.setCSS("ctrl-box")`
  padding: 10px 15px
`;

const ctrlBox = CtrlBoxGroup.generate();

export { ctrlBox };

export function CtrlBox(
  { children }: PropsWithChildren,
) {
  return (
    <div className={ctrlBox["ctrl-box"]}>
      {children}
    </div>
  );
}
