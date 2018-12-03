import React from 'react';
import Welcome from './Welcome';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';

export default function() {
    return (
        <Page name="Settings">
            <Welcome />
            <CoinGrid topSection />
            <ConfirmButton />
            <CoinGrid />
        </Page>
    );
}