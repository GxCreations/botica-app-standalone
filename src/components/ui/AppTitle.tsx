import React from 'react';
import { useLocation } from "react-router-dom";

const titleValues = {
    "/": "On duty",
    "/medics": "Medics",
    "/pharmacies": "Pharmacies"
} as any;

export const AppTitle = function () {
    const location = useLocation();
    const title = titleValues[location.pathname];

    return (<div className="title">{title}</div>);
};