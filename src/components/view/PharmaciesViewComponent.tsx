import React from 'react';
import { Component } from 'react';
import { MdCall } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { FraaijCard } from '../ui/FraaijCard';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import { LoaderMessage, NoListItemsFound } from '../ui';
import { Pharmacy } from "../../models/Pharmacy"
import { AppConstants } from '../../AppConstants';

// interface Pharmacy {
//     Id: string;
//     Name: string;
//     MapsUrl: string;
//     Address: string;
//     Phone: string;
// }

interface ComponentState {
    isLoading: boolean;
    pharmacies: Pharmacy[];
    filerText: string;
}



interface ComponentProps {
}

export class PharmaciesViewComponent extends Component<ComponentProps, ComponentState>
{
    constructor(props: ComponentProps) {
        super(props);
        this.state = { pharmacies: [], isLoading: true, filerText: "" };
    }


    private filterTextChanged(event: any) {
        let val = event.target.value.trim() ? event.target.value : "";
        this.setState({ filerText: val });
    }

    render() {
        if (this.state.isLoading) {
            return (<LoaderMessage />);
        }
        else {
            let reg = new RegExp(this.state.filerText, "i");

            const filtered = this.state.pharmacies.filter((pharmacy) => {
                if (this.state.filerText) {
                    if (pharmacy.name.match(reg) && pharmacy.address.match(reg)) {
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
                            {!filtered.length && this.state.filerText ? <NoListItemsFound title="Pharmacies" filter={this.state.filerText} /> :
                                filtered.map((pharmacy, i) => {
                                    return (
                                        <FraaijCard key={pharmacy.id}>
                                            <div className="content">
                                                <div className="header2">
                                                    <span className="bold">{pharmacy.name}</span>
                                                </div>
                                                <div className="onDutyBlock">
                                                    <div className="row">
                                                        <a className="action" href={pharmacy.mapsUrl} target="_blank" rel="noopener noreferrer"><MdLocationOn style={{ fontSize: "18px" }} /> <span>Navigate</span></a>
                                                        <div className="text">{pharmacy.address}</div>
                                                    </div>
                                                    <div className="row">
                                                        <a className="action" href={"tel:" + pharmacy.phoneNumber}><MdCall style={{ fontSize: "18px" }} /> <span>Call</span></a>
                                                        <div className="text">{pharmacy.phoneNumber}</div>
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
    }

    private fetchSucceeded(result: Pharmacy[]) {
        this.setState({ pharmacies: result });
        localStorage.setItem("pharmacies", JSON.stringify(result));
    }

    private fetchError(error: any) {
        console.log("loading from storage...");

        var pharmacies = localStorage.getItem("pharmacies");
        if (pharmacies) {
            this.setState({ pharmacies: JSON.parse(pharmacies) });
        }
    }

    componentDidMount() {
        fetch(AppConstants.BaseUrl + "/data/pharmacies")
            .then(res => res.json())
            .then((res) => this.fetchSucceeded(res), (err) => this.fetchError(err)).then(() => {
                this.setState({ isLoading: false })
            });
    }
}