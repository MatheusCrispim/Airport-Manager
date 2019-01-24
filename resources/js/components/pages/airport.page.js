import React from 'react';

import AirportRegisterContainer from '../containers/airport-register.container';
import AirportListContainer from '../containers/airport-list.container';

import { Layout } from 'antd';

const {
    Content,
} = Layout;

//Main Component 
export class AirportPage extends React.Component {
    render(){
        return (
            <Content style={{ height:'100%', padding: '50px', overflow: 'initial'}}> 
                <div style={{ textAlign:'right'}}>
                    <AirportRegisterContainer />
                </div>
                <div style={{ textAlign:'center', padding:'10px'}}>
                    <AirportListContainer />
                </div>    
            </Content>
        );
    }    
}

