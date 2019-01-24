import React from 'react';
import PropTypes from 'prop-types';

import { Drawer } from 'antd';

class DrawerComponent extends React.Component{

    render(){
        return (
            <Drawer
                title={this.props.title}
                width={this.props.width}
                onClose={this.props.onClose}
                visible={this.props.visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}>

                {this.props.children}

            </Drawer>
        );
    }
}


DrawerComponent.propTypes = {
    title : PropTypes.string.isRequired,
    visible : PropTypes.bool.isRequired,
    children : PropTypes.any,
    onClose : PropTypes.func.isRequired,
    width : PropTypes.number.isRequired
}

export default DrawerComponent;