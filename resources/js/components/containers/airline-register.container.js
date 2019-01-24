import React from 'react'
import { connect } from 'react-redux'; 

import {Form, Icon } from 'antd';
import {Button, Col, Row, Input} from 'antd'; 
import 'antd/dist/antd.css';

import { registerAirline } from '../actions/airline.actions';

import { showDrawer, closeDrawer, startRequest } from '../actions/components.actions';
import { AIRLINE } from '../actions/containers';

import AirlineDrawer  from '../components/drawer.component';
import AirlineForm  from '../components/form.component';

const FormItem = Form.Item;

class AirlineRegisterContainer extends React.Component {

    componentDidUpdate(){
        if(this.props.requested){
            if(this.props.response.statusCode === 201){
                this.props.form.resetFields();
                this.closeDrawer();
            }
            this.props.dispatch(startRequest(AIRLINE));
        }
    }
   
    showDrawer = () => {
        this.props.dispatch(showDrawer(AIRLINE));
    };
    
    
    closeDrawer = () => {
        this.props.dispatch(closeDrawer(AIRLINE));
    };


    handleConfirm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, data) => {
            if (!error) {
               let payload = {data}
                this.props.dispatch(registerAirline(payload));
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <AirlineDrawer
                    title = "Cadastrar companhia aéra"
                    visible = {this.props.visible}
                    onClose = {this.closeDrawer}
                    width = {400}>     

                    <AirlineForm
                        confirmButtonText = "Cadastrar"
                        onConfirm = {this.handleConfirm}
                        cancelButtonText = "Cancelar"
                        onCancel = {this.closeDrawer}
                        loading = {this.props.loading}>

                        <Row gutter={16}>
                            <Col span={20}>
                                <FormItem
                                    label="Nome">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Por favor, insira o nome!' }],
                                    })(
                                        <Input placeholder="Nome" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={20}>
                                <FormItem
                                    label="Código da companhia">
                                    {getFieldDecorator('code', {
                                        rules: [{ required: true, message: 'Por favor, o código da companhia!' }],
                                    })(
                                        <Input placeholder="Código" />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={20}>
                                <FormItem
                                    label="Código do aeroporto">
                                    {getFieldDecorator('airport_code', {
                                        rules: [{ required: true, message: 'Por favor, o código do aeroporto!' }],
                                    })(
                                        <Input placeholder="Código" />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                    </AirlineForm>
           
                </AirlineDrawer>

                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus" /> Cadastrar Companhia Aérea
                </Button>
                                    
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.airlineComponents.visible,
    loading: state.airlineComponents.loading,
    requested: state.airlineComponents.requested,
    response: state.airline.response,
});

export default  connect(mapStateToProps)(Form.create()(AirlineRegisterContainer));