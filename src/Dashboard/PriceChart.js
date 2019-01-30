import React from 'react';
import HighchartsConfig from './HighchartsConfig';
import {Tile} from '../Shared/Tile';
import {AppContext} from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';
import HighchartsTheme from './HighchartsTheme';
import Content from '../Shared/Content';

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function() {
    return (
        <AppContext.Consumer>
            {({historical}) => (
                <Tile>
                    {historical ? 
                        <ReactHighcharts config={HighchartsConfig(historical)} /> 
                        : <div>Loading Data</div>
                    }
                </Tile>
            )}
        </AppContext.Consumer>
    );
}