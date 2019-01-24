import React from 'react';

import RunawayRegisterContainer from '../containers/runaway-register.container';
import RunawayListContainer from '../containers/runaway-list.container';

import { Layout } from 'antd';

const {
    Content,
} = Layout;

//Main Component 
export class RunawayPage extends React.Component {
    render(){
        return (
            <Content style={{ height:'100%', padding: '50px', overflow: 'initial'}}> 
                <div style={{ textAlign:'right'}}>
                    <RunawayRegisterContainer />
                </div>
                <div style={{ textAlign:'center', padding:'10px'}}>
                   <RunawayListContainer />
                </div>    
            </Content>
        );
    }    
}

