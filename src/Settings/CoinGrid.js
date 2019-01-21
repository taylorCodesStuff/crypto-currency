import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 14px;
    margin-top: 40px;
`
function getLowerSectionCoins(coinList, filteredCoins) {
    return (filteredCoins && Object.keys(filteredCoins)) || 
            Object.keys(coinList).slice(0, 100);
}

function getCoinsToDisplay(coinList, topSection, favorites, filteredCoins){
    return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);
}

export default function({topSection}) {
    return (
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) => (
            <CoinGridStyled>
                {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map((coinKey, index) => 
                    <CoinTile topSection={topSection} coinKey={coinKey} key={index} />   
                )}
            </CoinGridStyled> )}
        </AppContext.Consumer>  
    );
} 

// {({coinNames}) => (
//     <CoinGridStyled>
//         {Object.keys(coinNames).map((coinKey, index) => 
//             <div key={index}> {coinKey} </div>     
//         )}