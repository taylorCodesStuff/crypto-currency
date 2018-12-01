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

function getCoinsToDisplay(coinList){
    return Object.keys(coinList).slice(0,100);
}

export default function() {
    return (
        <AppContext.Consumer>
            {({coinList}) => (
            <CoinGridStyled>
                {getCoinsToDisplay(coinList).map((coinKey, index) => 
                    <CoinTile coinKey={coinKey} key={index} />   
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