import React from 'react';
import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from "react-icons/md";


interface ComponentProps {
    title?: string;
    children?: any;
    collapsable?: boolean;
    collapsed?: boolean;
}

export const FraaijCard = (props: ComponentProps) => {
    const [collapsed, setCollapsed] = useState(props.collapsed);

    const collapseIcon = props.collapsable ? <div className="collapseIcon">
        {collapsed ? <MdExpandMore style={{ fontSize: "32px" }} /> : <MdExpandLess style={{ fontSize: "32px"}}  />}
    </div> : null;

    return (
        <div className={"fraaijCard " + (collapsed ? "fraaijCard-collapsed" : "")}>
            {props.title ? <div className="title" onClick={() => setCollapsed(!collapsed)}>
                {props.title}
                {collapseIcon}
            </div>
                : null}
            {props.children}
        </div>
    );
};