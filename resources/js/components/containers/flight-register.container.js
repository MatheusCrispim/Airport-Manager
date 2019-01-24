import React from 'react'
import { connect } from 'react-redux'; 

// Icon } from 'antd';

import {
    Form, Button, Col, Row, Input, Select, DatePicker, TimePicker, Icon
 } from 'antd';
 
import 'antd/dist/antd.css';

import { registerFlight } from '../actions/flight.actions';

import { showDrawer, closeDrawer, startRequest } from '../actions/components.actions';
import { FLIGHT } from '../actions/containers';

import FlightDrawer  from '../components/drawer.component';
import FlightForm  from '../components/form.component';


const { Option } = Select;
const FormItem = Form.Item;

class FlightRegisterContainer extends React.Component {

    componentDidUpdate(){
        if(this.props.requested){
            if(this.props.response.statusCode === 201){
                this.props.form.resetFields();
                this.closeDrawer();
            }
            this.props.dispatch(startRequest(FLIGHT));
        }
    }
   
    showDrawer = () => {
        this.props.dispatch(showDrawer(FLIGHT));
    };
    
    
    closeDrawer = () => {
        this.props.dispatch(closeDrawer(FLIGHT));
    };


    handleConfirm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, data) => {
            if (!error) {
                data.flight_time =  data.flight_time.format('h:mm:ss');
                data.flight_date = data.flight_date.format('YYYY-MM-DD');
                let payload = {data}
                this.props.dispatch(registerFlight(payload));
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <FlightDrawer
                    title = "Cadastrar voo"
                    visible = {this.props.visible}
                    onClose = {this.closeDrawer}
                    width = {720}>     

                    <FlightForm
                        confirmButtonText = "Cadastrar"
                        onConfirm = {this.handleConfirm}
                        cancelButtonText = "Cancelar"
                        onCancel = {this.closeDrawer}
                        loading = {this.props.loading}>
                        <Row gutter={16}>
                            <Col span={9}>
                                <FormItem
                                    label="status">
                                    {getFieldDecorator('status', {
                                        rules: [{ required: true, message: 'Por favor, insira a data do voo!' }],
                                    })(
                                        <Select style={{ width: 120 }}>
                                            <Option value="Saída">Saída</Option>
                                            <Option value="Chegada">Chegada</Option>
                                        </Select>    
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                                <Col span={12}>
                                    <FormItem 
                                        label="Código do voo">
                                        {getFieldDecorator('code', {
                                            rules: [{ required: true, message: 'Por favor, insira o código do voo!' }],
                                        })(
                                            <Input placeholder="Código" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        <Row gutter={16}>
                            <Col span={9}>
                                <FormItem
                                    label="Data">
                                    {getFieldDecorator('flight_date', {
                                        rules: [{ required: true, message: 'Por favor, insira a data do voo!' }],
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem
                                    label="Hora">
                                    {getFieldDecorator('flight_time', {
                                        rules: [{ required: true, message: 'Por favor, insira a hora do voo!' }],
                                    })(
                                        <TimePicker />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={10}>
                                <FormItem
                                    label="Código do aeroporto">
                                    {getFieldDecorator('airport_code', {
                                        rules: [{ required: true, message: 'Por favor, insira o nome do aeroporto!' }],
                                    })(
                                        <Input placeholder="Código do aeroporto" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem
                                    label="Código da Pista">
                                    {getFieldDecorator('runaway_code', {
                                        rules: [{ required: true, message: 'Por favor, insira o código da pista!' }],
                                    })(
                                        <Input placeholder="Código da pista" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={10}>
                                <FormItem
                                    label="Código da companhia">
                                    {getFieldDecorator('airline_code', {
                                        rules: [{ required: true, message: 'Por favor, insira o código da companhia!' }],
                                    })(
                                        <Input placeholder="Código da companhia" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </FlightForm>
           
                </FlightDrawer>

                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus" /> Cadastrar voo
                </Button>
                                    
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.flightComponents.visible,
    loading: state.flightComponents.loading,
    requested: state.flightComponents.requested,
    response: state.flight.response,
});

export default  connect(mapStateToProps)(Form.create()(FlightRegisterContainer));