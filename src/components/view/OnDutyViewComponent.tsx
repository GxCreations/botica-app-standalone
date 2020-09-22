import React from 'react';
import { Component } from 'react';
import moment from 'moment';
import { FraaijCard } from '../ui/FraaijCard';
import { OnDutyParmacyControl } from "../ui/OnDutyParmacyControl";
import { LoaderMessage } from '../ui/LoaderMessage';
//import { Pharmacy } from '../../models/Pharmacy';
import { OnDutyShedule } from '../../models/onduty';
import { AppConstants } from '../../AppConstants';


interface FetchResult {
    currentDate: string;
    schedules: OnDutyShedule[];
}

// interface OnDutyShedule {
//     date: string;
//     punda: Pharmacy;
//     otrabanda: Pharmacy;
// }

interface ComponentState {
    shedules: OnDutyShedule[];
    isLoading: boolean;
    date?: string;
}

interface ComponentProps {
}

export class OnDutyViewComponent extends Component<ComponentProps, ComponentState>
{
    maxRecords: number;

    constructor(props: ComponentProps) {
        super(props);
        this.state = { shedules: [], isLoading: true };
        this.maxRecords = 7;
    }

    getVisibleItems() {
        if (this.state.shedules) {
            if (this.state.shedules.length > this.maxRecords) {
                return this.state.shedules.slice(0, this.maxRecords);
            }
            else {
                return this.state.shedules;
            }
        }
        return [];
    }

    render() {
        if (this.state.isLoading) {
            return (<LoaderMessage />);
        }
        else {
            return (
                <div className="defaultPage">
                    <div className="scrollable">
                        {this.getVisibleItems().map((m, i) => {
                            let formattedDate = moment(m.date).format('DD MMMM');
                            console.log(m);
                            return (
                                <FraaijCard key={i} title={formattedDate} collapsable={true} collapsed={i > 0}>
                                    <div className="content">
                                        {m.punda ? <OnDutyParmacyControl info={{ ...m.punda }} /> : null}
                                        {m.punda && m.otrabanda ? <hr /> : null}
                                        {m.otrabanda ? <OnDutyParmacyControl info={{ ...m.otrabanda }} /> : null}
                                    </div>
                                </FraaijCard>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }

    private fetchSucceeded(result: FetchResult) {
        this.setState({ date: result.currentDate, shedules: result.schedules });
        localStorage.setItem("onduty", JSON.stringify(result.schedules));
    }

    private fetchError(error: any) {
        console.log("loading from storage...");

        try {
            var shedules = localStorage.getItem("onduty");
            if (shedules) {
                this.setState({ shedules: JSON.parse(shedules) });
            }
        }
        catch (err) {
            this.setState({ shedules: [] });
        }
    }

    componentDidMount() {
        fetch(AppConstants.BaseUrl + "/data/onduty")
            .then(res => res.json())
            .then((res) => this.fetchSucceeded(res), (err) => this.fetchError(err)).then(() => {
                this.setState({ isLoading: false })
            });
    }
}