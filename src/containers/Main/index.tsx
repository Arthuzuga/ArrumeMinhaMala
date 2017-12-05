import * as React from "react";
import { Route } from "react-router";
import { observer, inject } from "mobx-react";



/**
 * Containers
 */

import Basic from "../../components/TripDataForm";
import Table from "../../components/ClothesDemandTable";
import { ITripData, LuggageStore } from "../../stores/LuggageStore";

/** 
 * Style
 */

const s = require("./style.scss");

interface Props {
    luggageStore: LuggageStore;
}

interface State {}

@inject("luggageStore") // este nome tem que ser igual ao nome passado para o Provider no rootStories
@observer
export default class Main extends React.Component<Props, State> {
    state: State = {};

    onSubmit = (fields: ITripData) => {
        this.props.luggageStore.tripData = fields;
    }
    
    render() {
        return (
            <div className={s.main}>
                <div className={s.title}>
                    <h1>Arrume Minha Mala</h1> 
                    <h2>Seu assistente pessoal para lhe ajudar a arrumar a suas roupas</h2>
                </div>   
                    <Basic
                        fields={this.props.luggageStore.tripData || undefined}
                        onSubmit={this.onSubmit}
                    />

                    {
                        this.props.luggageStore.clothesDemand ? (
                            <Table
                                tripData={this.props.luggageStore.tripData!}
                                clothesDemand={this.props.luggageStore.clothesDemand}
                            />
                        ) : null
                    }     
               
            </div>
        );
    }
};