import React from 'react';
import { connect } from 'react-redux'; 

import AirlineTable from '../components/table.component';
import { updateAirline, deleteAirline, getAirlines } from '../actions/airline.actions';

import { startRequest } from '../actions/components.actions';
import { AIRLINE } from '../actions/containers';

class AirlineListContainer extends React.Component {

    componentWillMount(){
        /**
         * this time out ensures that the function will only be executed after 
         * everything has been loaded, otherwise the saga for the triggered action 
         * would not be executed because it was not loaded. window.onload is not 
         * feasible in this case, since it would have to be called within that same 
         * function in other components, which would cause only the last call to be 
         * executed.
         */
        setTimeout(() => {
            this.getAirlineList()
        });
    }


    componentDidUpdate(){
        if(this.props.requested){
            this.props.dispatch(startRequest(AIRLINE));
        }
    }


    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id', 
        editable: false
    },{
        title: 'Código',
        dataIndex: 'code',
        key: 'code', 
        editable: true
    },{
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        editable: true
    }, {
        title: 'Código do aeroporto',
        dataIndex: 'airport_code',
        key: 'airport_code',
        editable: true
    }];


    getAirlineList = () =>{
        this.props.dispatch(getAirlines());
    }


    update = (id, data) => {
        let payload = {id, data}
        this.props.dispatch(updateAirline(payload));
    }


    delete = (id) => {
        let payload = {id}
        this.props.dispatch(deleteAirline(payload));
    }


    onChangePage = (page) => {
        this.getAirpotList();
    }


    render() {

        return (
            <div>
            <AirlineTable 
                loading = {this.props.loading}
                data = {this.props.data}
                columns = {this.columns}
                update = {this.update}
                delete = {this.delete}
                onChangePage = {this.onChangePage}
            />
            </div>
        );  
    }
}


const mapStateToProps = (state) => ({
    data : state.airline.airlineList,
    loading : state.airlineComponents.loading,
    requested : state.airlineComponents.requested,
    response : state.airline.response,
});

export default connect(mapStateToProps) (AirlineListContainer);