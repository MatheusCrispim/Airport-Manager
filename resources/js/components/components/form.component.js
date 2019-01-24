import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form } from 'antd';
import 'antd/dist/antd.css';



class FormComponent extends React.Component {

    render(){
        return(
            <Form layout="horizontal" hideRequiredMark>

                {this.props.children}
            
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}>
                    
                    <Button onClick={this.props.onCancel} style={{ marginRight: 8 }}>
                        {this.props.cancelButtonText}
                    </Button>

                    <Button onClick={this.props.onConfirm} type="primary" loading={this.props.loading}>
                        {this.props.confirmButtonText}
                    </Button>
                </div>

            </Form>
        )
    }
}

FormComponent.propTypes = {
    children : PropTypes.any,
    onConfirm : PropTypes.func.isRequired,
    confirmButtonText : PropTypes.string.isRequired,
    onCancel : PropTypes.func.isRequired,
    cancelButtonText : PropTypes.string.isRequired,
    loading : PropTypes.bool.isRequired,
}

export default FormComponent;