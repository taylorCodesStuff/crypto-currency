import React from 'react';
const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'Dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    } 

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        console.log(coinList);
        let coinNames = {};
        for(let key in coinList){
            coinNames[coinList[key].CoinName] = coinList[key];
        }
        console.log(coinNames);
        this.setState({coinList, coinNames});
    }

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'Dashboard'
        });
        localStorage.setItem('cryptoMarket', JSON.stringify({
            test: 'hello'
        }));
    }

    savedSettings(){
        let cryptoData = JSON.parse(localStorage.getItem('cryptoMarket'));
        if(!cryptoData){
            return {page: 'Settings', firstVisit: true}
        }

        return {};
    } 
    
    setPage = page => this.setState({page});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}