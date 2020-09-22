import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { MdStoreMallDirectory, MdLocalPharmacy } from "react-icons/md";
import { FaBriefcaseMedical } from "react-icons/fa";

export const AppFooter = () => {
    let selected = "";

    const location = useLocation();

    switch (location.pathname) {
        case "/":
            selected = "onduty";
            break;
        case "/medics":
            selected = "medics";
            break;
        case "/pharmacies":
            selected = "pharmacies";
            break;
        default:
            break;
    }

    console.log("seleced: " + selected);

    return (
        <div id="Footer">
            <Link to={{ pathname: "/" }} className={selected === 'onduty' ? "selected" : ""}>
                <MdStoreMallDirectory style={{ fontSize: "28px" }} />
            </Link>
            <Link to={{ pathname: "/pharmacies" }} className={selected === 'pharmacies' ? "selected" : ""}>
                <MdLocalPharmacy style={{ fontSize: "28px" }} />
            </Link>
            <Link to={{ pathname: "/medics" }} className={selected === 'medics' ? "selected" : ""}>
                <FaBriefcaseMedical style={{ fontSize: "24px" }} />
            </Link>
        </div>
    );
};
