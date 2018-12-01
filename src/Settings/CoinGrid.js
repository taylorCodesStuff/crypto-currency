import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';


const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`

export default function() {
    return (
        <AppContext.Consumer>
            {({coinList}) => (
            <CoinGridStyled>
                {Object.keys(coinList).map((coinKey, index) => 
                    <div key={index}> {coinKey} </div>     
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