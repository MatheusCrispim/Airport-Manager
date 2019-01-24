import React from 'react'
import { connect } from 'react-redux'; 

import {
    Button, Col, Row, Input, Form, Icon,
 } from 'antd';
 
import 'antd/dist/antd.css';

import { registerRunaway} from '../actions/runaway.actions';

import { showDrawer, closeDrawer, startRequest } from '../actions/components.actions';
import { RUNAWAY } from '../actions/containers';

import RunawayDrawer  from '../components/drawer.component';
import RunawayForm  from '../components/form.component';



const FormItem = Form.Item;

class RunawayRegisterComponent extends React.Component {

    componentDidUpdate(){
        if(this.props.requested){
            if(this.props.response.statusCode === 201){
                this.props.form.resetFields();
                this.closeDrawer();
            }
            this.props.dispatch(startRequest(RUNAWAY));
        }
    }
   
    showDrawer = () => {
        this.props.dispatch(showDrawer(RUNAWAY));
    };
    
    
    closeDrawer = () => {
        this.props.dispatch(closeDrawer(RUNAWAY));
    };


    handleConfirm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, data) => {
            if (!error) {
                let payload = {data}
                this.props.dispatch(registerRunaway(payload));
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <RunawayDrawer
                    title = "Cadastrar pista"
                    visible = {this.props.visible}
                    onClose = {this.closeDrawer}
                    width = {400}>     

                    <RunawayForm
                        confirmButtonText = "Cadastrar"
                        onConfirm = {this.handleConfirm}
                        cancelButtonText = "Cancelar"
                        onCancel = {this.closeDrawer}
                        loading = {this.props.loading}>                    
                        <Row gutter={16}>
                            <Col span={20}>
                                <FormItem
                                    label="Código da pista">
                                    {getFieldDecorator('code', {
                                        rules: [{ required: true, message: 'Por favor, insira o código da pista!' }],
                                    })(
                                        <Input placeholder="Código da pista" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={20}>
                                <FormItem
                                    label="Código do aeroporto">
                                    {getFieldDecorator('airport_code', {
                                        rules: [{ required: true, message: 'Por favor, insira o código do aeroporto!' }],
                                    })(
                                        <Input placeholder="Código do aeroporto" />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </RunawayForm>
           
                </RunawayDrawer>

                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus" /> Cadastrar pista
                </Button>
                                    
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.runawayComponents.visible,
    loading: state.runawayComponents.loading,
    requested: state.runawayComponents.requested,
    response: state.runaway.response,
});

export default  connect(mapStateToProps)(Form.create()(RunawayRegisterComponent));