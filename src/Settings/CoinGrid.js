import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {Tile, SelectableTile} from '../Shared/Tile';

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 14px;
`

export default function() {
    return (
        <AppContext.Consumer>
            {({coinList}) => (
            <CoinGridStyled>
                {Object.keys(coinList).map((coinKey, index) => 
                    <SelectableTile key={index}> {coinKey} </SelectableTile>     
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