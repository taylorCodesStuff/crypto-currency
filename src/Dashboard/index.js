import React from 'react';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';
import styled from 'styled-components';
import {Tile} from '../Shared/Tile';

const ChartGrid =styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`

export default function() {
    return (
        <Page name="Dashboard">
            <PriceGrid />
            <ChartGrid>
                <CoinSpotlight />
                <Tile> Chart goes here </Tile>
            </ChartGrid>
        </Page>
    );
}