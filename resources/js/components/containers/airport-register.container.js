import React from 'react'
import { connect } from 'react-redux'; 

import {Form, Icon } from 'antd';
import {Button, Col, Row, Input} from 'antd'; 
import 'antd/dist/antd.css';

import { registerAirport } from '../actions/airport.actions';

import { showDrawer, closeDrawer, startRequest } from '../actions/components.actions';
import { AIRPORT } from '../actions/containers';

import AirportDrawer  from '../components/drawer.component';
import AirportForm  from '../components/form.component';

const FormItem = Form.Item;

class AirportRegisterContainer extends React.Component {

    componentDidUpdate(){
        if(this.props.requested){
            if(this.props.response.statusCode === 201){
                this.props.form.resetFields();
                this.closeDrawer();
            }
            this.props.dispatch(startRequest(AIRPORT));
        }
    }
   
    showDrawer = () => {
        this.props.dispatch(showDrawer(AIRPORT));
    };
    
    
    closeDrawer = () => {
        this.props.dispatch(closeDrawer(AIRPORT));
    };


    handleConfirm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, data) => {
            if (!error) {
                let payload = {data}

                this.props.dispatch(registerAirport(payload));
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <AirportDrawer
                    title = "Cadastrar Aeroporto"
                    visible = {this.props.visible}
                    onClose = {this.closeDrawer}
                    width = {720}>

                    <AirportForm
                        confirmButtonText = "Cadastrar"
                        onConfirm = {this.handleConfirm}
                        cancelButtonText = "Cancelar"
                        onCancel = {this.closeDrawer}
                        loading = {this.props.loading}>

                        <Row gutter={16}>
                                <Col span={12}>
                                    <FormItem 
                                        label="Código do aeroporto">
                                        {getFieldDecorator('code', {
                                            rules: [{ required: true, message: 'Por favor, insira o código do aeroporto!' }],
                                        })(
                                            <Input placeholder="Código" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
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
                                <Col span={12}>
                                    <FormItem
                                        label="País">
                                        {getFieldDecorator('country', {
                                            rules: [{ required: true, message: 'Por favor, insira o país!' }],
                                        })(
                                            <Input placeholder="País" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="Estado">
                                        {getFieldDecorator('state', {
                                            rules: [{ required: true, message: 'Por favor, insira o estado!' }],
                                        })(
                                            <Input placeholder="Estado" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <FormItem
                                        label="Cidade">
                                        {getFieldDecorator('city', {
                                            rules: [{ required: true, message: 'Por favor, insira a cidade!'}],
                                        })(
                                            <Input placeholder="Cidade" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="CEP">
                                        {getFieldDecorator('zip_code', {
                                            rules: [{ required: true, message: 'Por favor, insira o CEP!' }],
                                        })(
                                            <Input placeholder="CEP" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            
                    </AirportForm>
           
                </AirportDrawer>

                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus" /> Cadastrar Aeroporto
                </Button>
                                    
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    visible : state.airportComponents.visible,
    requested : state.airportComponents.requested,
    loading : state.airportComponents.loading,
    response : state.airport.response,
});


export default connect(mapStateToProps)(Form.create()(AirportRegisterContainer));


