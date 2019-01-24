import React from 'react';

import AirlineRegisterContainer from '../containers/airline-register.container';
import AirlineListContainer from '../containers/airline-list.container';

import { Layout } from 'antd';

const {
    Content,
} = Layout;

//Main Component 
export class AirlinePage extends React.Component {
    render(){
        return (
            <Content style={{ height:'100%', padding: '50px', overflow: 'initial'}}> 
                <div style={{ textAlign:'right'}}>
                    <AirlineRegisterContainer />
                </div>
                <div style={{ textAlign:'center', padding:'10px'}}>
                   <AirlineListContainer />
                </div>    
            </Content>
        );
    }    
}

