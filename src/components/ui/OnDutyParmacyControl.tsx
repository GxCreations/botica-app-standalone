import React from 'react';
import { MdCall } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { Pharmacy } from "../../models/Pharmacy"

interface ComponentProps {
    info: Pharmacy;
}

export const OnDutyParmacyControl = ({ info }: ComponentProps) => {

    return (
        <>
            <div className="header2"><span className="bold">Punda:</span> <span className="sub">{info.name}</span></div>
            <div className="onDutyBlock">
                <div className="row">
                    <a className="action" href={info.mapsUrl} target="_blank" rel="noopener noreferrer"><MdLocationOn style={{ fontSize: "18px" }} /> <span>Navigate</span></a>
                    <div className="text">{info.address}</div>
                </div>
                <div className="row">
                    <a className="action" href={"tel:" + info.phoneNumber}><MdCall style={{ fontSize: "18px" }} /> <span>Call</span></a>
                    <div className="text">{info.phoneNumber}</div>
                </div>
            </div>
        </>
    );
};