import React from 'react';
import PropTypes from 'prop-types';

import { Table, Icon, Form, Input, DatePicker, TimePicker, Popconfirm, Tag } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';


const FormItem = Form.Item;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
);  

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

    getInput = () => {

        switch(this.props.inputType){
            case "time":
                return <TimePicker />
            case "date":
                return <DatePicker />
            default:
                return <Input />;
        }
        
        
    };

    render() {
        const {
            editing,
            dataIndex, 
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: ` Por favor, insira o campo ${title}`,
                                        }],
                                        initialValue: inputType === 'time' ? moment(record[dataIndex], 'h:mm:ss') :
                                                      inputType === 'date' ? moment(record[dataIndex], 'YYYY-MM-DD'):
                                                      record[dataIndex], 
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


class TableComponent extends React.Component {
    columns;

    constructor(props){
        super(props);

        this.state = {
            editingId: '', 
        }

        const actionsColumn = {
            title: 'Ações',
            dataIndex: 'actions', 
            id: 'actions',
            render: (text, record) => {
                var editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <Popconfirm title="Deseja realmente salvar as modificações deste registro?" onConfirm={() => this.update(form, record.id)}>
                                        <Tag color="cyan">
                                            Salvar
                                        </Tag>
                                        </Popconfirm>
                                    )}
                                </EditableContext.Consumer>
                                <Popconfirm
                                    title="Deseja realmente cancelar a edição?"
                                    onConfirm={() => this.cancel(record.id)}>
                                     <Tag color="cyan">Cancelar</Tag>
                                </Popconfirm>
                            </span>
                        ) : (
                            <span>
                                <Tag color="cyan" onClick={() => this.edit(record.id)}>Editar</Tag>
                                <Popconfirm title="Deseja realmente apagar este registro?" onConfirm={() => this.delete(record.id)}>
                                    <Tag><Icon type="delete" color="cyan" theme="twoTone"/></Tag>
                                </Popconfirm>
                            </span>
                        )}
                    </div>
                );
            }
        }

        this.columns = [...this.props.columns];
        this.columns.push(actionsColumn);
    }
       

    edit = (id) => {
        this.setState({ editingId: id });
    }


    cancel = () => {
        this.setState({editingId: '' });
    };


    isEditing = record => record.id === this.state.editingId;


    update = (form, id) => {
        form.validateFields((error, data) => {
            if (!error) {
                this.props.update(id, data);
                this.setState({ editingId: '' });
            }
          });
    }


    delete = (id) => {
        this.props.delete(id);
    }

    render(){
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            }
        };
      
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });      

        return (
            <div>
                <Table  
                    onChange={this.props.onChangePage}
                    rowKey="id"
                    loading={this.props.loading}
                    dataSource={this.props.data}
                    pagination={true}
                    columns={columns} 
                    components={components}
                    size="middle"
                    locale={{emptyText:'Nada encontrado'}}
                />
            </div>
        );  

    }
}


TableComponent.propTypes = {
    loading : PropTypes.bool.isRequired,
    data : PropTypes.array.isRequired,
    columns : PropTypes.array.isRequired,
    update : PropTypes.func.isRequired,
    delete : PropTypes.func.isRequired,
    onChangePage : PropTypes.func
}

export default TableComponent;
