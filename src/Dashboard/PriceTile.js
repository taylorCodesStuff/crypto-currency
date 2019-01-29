import React from 'react';
import styled, {css} from 'styled-components';
import {SelectableTile} from '../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import {CoinHeaderGridStyled} from "../Settings/CoinHeaderGrid";
import {AppContext} from '../App/AppProvider';



const numberFormat = number => {
    return +(number + '').slice(0,7);
}

const JustifyRight = styled.div`
    justify-self: right;
`
const JustifyLeft = styled.div`
    justify-self: left;
`

const TickerPrice = styled.div`
    ${fontSizeBig};
`

const ChangePct = styled.div`
    color: green;
    ${props => props.red && css`
        color: red;
    `}
`

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid;
        ${fontSize3}
        grid-gap: 5px;
        grid-template-columns: repeat(3, 1fr);
        justify-items: right;
    `}

    ${props => props.favorite && css`
        ${greenBoxShadow}
        pointer-events: none;
    `}
`;

function ChangePercent({data}){
    return (
        <JustifyRight> 
            <ChangePct red={data.CHANGEPCT24HOUR < 0} >
                {numberFormat(data.CHANGEPCT24HOUR)} 
            </ChangePct>
        </JustifyRight>
    );
}

function PriceTile({sym, data, favorite, setFavorite}){
    return (
        <PriceTileStyled 
            onClick={setFavorite}
            favorite={favorite}>
            <CoinHeaderGridStyled>
                <div> {sym} </div>
                <ChangePercent data={data} />
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    );
}

function PriceTileCompact({sym, data, favorite, setFavorite}){
    return (
        <PriceTileStyled 
            onClick={setFavorite}
            compact 
            favorite={favorite}
            >
            <JustifyLeft>
                {sym}
            </JustifyLeft>
            <ChangePercent data={data} />
            <div>
                ${numberFormat(data.PRICE)}
            </div>
        </PriceTileStyled>
    );
}

export default function({price, index}) {
    let symbol = Object.keys(price)[0];
    let data = price[Object.keys(price)[0]]['USD'];
    let TileClass = index < 5 ? PriceTile : PriceTileCompact;
    return (
        <AppContext.Consumer>
            {({currentFavorite, setCurrentFavorite}) => (
                <TileClass 
                    sym={symbol} 
                    data={data} 
                    favorite={currentFavorite === symbol} 
                    setFavorite={() => setCurrentFavorite(symbol)}
                    key={index} 
                >
                </TileClass>
            )}
        </AppContext.Consumer>
    );
}