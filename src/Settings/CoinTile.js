import React from 'react';
import { AppContext } from '../App/AppProvider';
import {SelectableTile, DeletableTile, DisabledTile, Tile} from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';


function clickHandler(topSection, key, addCoin, removeCoin){
    return topSection ? () => {
        removeCoin(key)
    } : () => {
        addCoin(key)
    };
}

export default function({coinKey, topSection}) {

    return <AppContext.Consumer>
        {({coinList, addCoin, removeCoin, isInFavorites}) => {
            let coin = coinList[coinKey];

            let TileClass = SelectableTile;

            if(topSection){
                TileClass = DeletableTile;
            } else if(isInFavorites(coinKey)){
                TileClass = DisabledTile;
            }

            return <TileClass onClick={clickHandler(topSection, coinKey, addCoin, removeCoin)} >
                <CoinHeaderGrid 
                    topSection={topSection}
                    name={coin.CoinName} 
                    symbol={coin.Symbol} 
                />
                <CoinImage coin={coin}/>
            </TileClass>
        }}
    </AppContext.Consumer>
}