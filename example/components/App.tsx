import { AttributeGroup } from "styled-components-deno";
import { ctrlBox } from "./ControlBox.tsx";

const appKeys = [`data-running="true"`] as const;

import type { PropsWithChildren } from "react";
const appStyle = new AttributeGroup(appKeys);

appStyle.setCSS('data-running="true"')`
  cursor: wait;
  ${ctrlBox["ctrl-box"]} {
    pointer-events: none
  }
`;

appStyle.generate();

const appCSS = appStyle.groupName;

export type AppAttribute = {
  dataRunning: boolean;
};

export function App(
  { children, dataRunning }: PropsWithChildren<AppAttribute>,
) {
  return (
    <div className={appCSS} data-running={dataRunning}>
      {children}
    </div>
  );
}
