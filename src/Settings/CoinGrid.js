import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 14px;
    margin-top: 40px;
`

function getCoinsToDisplay(coinList, topSection, favorites){
    return topSection ? favorites : Object.keys(coinList).slice(0, topSection ? 10 : 100);
}

export default function({topSection}) {
    return (
        <AppContext.Consumer>
            {({coinList, favorites}) => (
            <CoinGridStyled>
                {getCoinsToDisplay(coinList, topSection, favorites).map((coinKey, index) => 
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