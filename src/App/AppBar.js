import React from 'react';
import styled, {css} from 'styled-components';

const Logo = styled.div`
    font-size: 1.5em;
`

const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px
    margin-bottom: 40px;
`

const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        // text-shadow: 0px 0px 60px #03ff03
    `}
`
function ControlButton({name, active}){
    return (
        <ControlButtonElem active={active}>
            {name}
        </ControlButtonElem>
    )
}

export default function() {
    return ( <Bar>
       <Logo> CryptoMarket </Logo>
       <div></div>
       <ControlButton active name="Dashboard" />
       <ControlButton name="Settings" />
    </Bar>
    )
}