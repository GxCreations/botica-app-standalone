import React from 'react';
import { Component } from 'react';
import { MdCall } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { LoaderMessage, NoListItemsFound } from '../ui';
import { FraaijCard } from '../ui/FraaijCard';
import { AppConstants } from '../../AppConstants';

interface MedicsInfo {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    mapsUrl?: string;
}

interface ComponentState {
    medics: MedicsInfo[];
    isLoading: boolean;
    filerText: string;
}

interface ComponentProps {
}

export class MedicsViewComponent extends Component<ComponentProps, ComponentState>
{
    constructor(props: ComponentProps) {
        super(props);
        this.state = { medics: [], isLoading: true, filerText: "" };
    }

    render() {
        if (this.state.isLoading) {
            return (<LoaderMessage />);
        }
        else {
            let reg = new RegExp(this.state.filerText, "i");

            const filtered = this.state.medics.filter((med) => {
                if (this.state.filerText) {
                    if (med.name.match(reg) || med.address.match(reg)) {
                        return true;
                    }

                    return false;
                }

                return true;
            });

            return (
                <div className="defaultPage">
                    <div className="headerPanel">
                        <div className="searchComponent">
                            <Paper component="form" className="inner">
                                <IconButton aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <InputBase
                                    placeholder="Search for medic"
                                    inputProps={{ 'aria-label': 'Search for medic' }}
                                    value={this.state.filerText}
                                    onChange={(e) => this.filterTextChanged(e)}
                                />
                                <IconButton aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
                    </div>
                    <div className="content">
                        <div className="scrollable">
                            {!filtered.length && this.state.filerText ? <NoListItemsFound title="Medics" filter={this.state.filerText} /> :
                                filtered.map((med, i) => {
                                    return (
                                        <FraaijCard key={med.id}>
                                            <div className="content">
                                                <div className="header2">
                                                    <span className="bold">{med.name}</span>
                                                </div>
                                                <div className="onDutyBlock">
                                                    <div className="row">
                                                        <a className="action" href={"https://maps.google.com/?q=curacao+" + med.address} target="_blank" rel="noopener noreferrer"><MdLocationOn style={{ fontSize: "18px" }} /> <span>Navigate</span></a>
                                                        <div className="text">{med.address}</div>
                                                    </div>
                                                    <div className="row">
                                                        <a className="action" href={"tel:" + med.phoneNumber}><MdCall style={{ fontSize: "18px" }} /> <span>Call</span></a>
                                                        <div className="text">{med.phoneNumber}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </FraaijCard>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            );
        }
    };

    private filterTextChanged(event: any) {
        let val = event.target.value.trim() ? event.target.value : "";
        this.setState({ filerText: val });
    }

    private fetchSucceeded(result: any) {
        var meds = result.data.map((m: any) => {
            return {
                name: m.name,
                id: m.medicsId,
                phoneNumber: m.telephone,
                address: m.address
            };
        });

        this.setState({ medics: meds });
        localStorage.setItem("medics", JSON.stringify(meds));
    }

    private fetchError(error: any) {
        console.log("loading from storage...");

        try {
            var meds = localStorage.getItem("medics");
            if (meds) {
                this.setState({ medics: JSON.parse(meds) });
            }
        }
        catch (err) {
            this.setState({ medics: [] });
        }

    }

    componentDidMount() {
        fetch(AppConstants.BaseUrl + "/data/medics")
            .then(res => res.json())
            .then((res) => this.fetchSucceeded(res), (err) => this.fetchError(err)).then(() => {
                this.setState({ isLoading: false })
            });
    }

    componentDidUpdate() {

    }
}