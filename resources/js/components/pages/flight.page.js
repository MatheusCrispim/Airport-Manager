import React from 'react';

import FlightRegisterContainer from '../containers/flight-register.container';
import  FlightListContainer from '../containers/flight-list.container';

import { Layout } from 'antd';

const {
    Content,
} = Layout;

//Main Component 
export class FlightPage extends React.Component {
    render(){
        return (
            <Content style={{ height:'100%', padding: '50px', overflow: 'initial'}}> 
                <div style={{ textAlign:'right'}}>
                    <FlightRegisterContainer />
                </div>
                <div style={{ textAlign:'center', padding:'10px'}}>
                   <FlightListContainer />
                </div>    
            </Content>
        );
    }    
}

