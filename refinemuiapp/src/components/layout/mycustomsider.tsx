import React from 'react';
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";

export const MyCustomSider: React.FC<RefineLayoutSiderProps> = (props: any) => {
    console.log("Sider props", props);
    return (
    <div>mycustomsider</div>
  )
}

