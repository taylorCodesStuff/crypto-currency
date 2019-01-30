import React from 'react';
import _ from 'lodash';
import moment from 'moment'; 

const cc = require('cryptocompare');
const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'Dashboard',
            favorites: ['BTC', 'ETH', 'EOS', 'XRP', 'LTC'],
            timeInterval: 'months',
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect
        }
    } 

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        console.log(prices);
        this.setState({prices});
    }

    fetchHistorical = async () => {
        if(this.state.firstVisit) return;
        let results = await this.historical();
        console.log(results);
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ];
        console.log(historical);
        this.setState({historical})
    }

    prices = async () => {
        let returnData = [];
        for(let i=0;i<this.state.favorites.length;i++){
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch(e) {
                console.warn('Fetch Price error: ', e);
            }
        }
        return returnData;
    }

    historical = () => {
        let promises = [];
        for(let units = TIME_UNITS; units > 0; units--){
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite, 
                    ['USD'],
                    moment().subtract({[this.state.timeInterval]: units}).toDate()
                )
            )
        }
        return Promise.all(promises);
    }

    changeChartSelect = (value) => {
        console.log(value);
        this.setState({
            timeInterval: value,
            historical: null
        }, this.fetchHistorical);
        
    }

    isInFavorites = key => {
        return _.includes(this.state.favorites, key);
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES && !this.isInFavorites(key)){
            favorites.push(key);
            this.setState({favorites});
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)});
    }

    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'Dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
        });
        localStorage.setItem('cryptoMarket', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite: this.state.currentFavorite
        }));
    }

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);
        localStorage.setItem('cryptoMarket', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoMarket')),
            currentFavorite: sym
        }));
        
    }

    savedSettings(){
        let cryptoData = JSON.parse(localStorage.getItem('cryptoMarket'));
        if(!cryptoData){
            return {page: 'Settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoData;
        return {favorites, currentFavorite};
    } 
    
    setPage = page => this.setState({page});

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}