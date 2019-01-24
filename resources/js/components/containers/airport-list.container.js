import React from 'react';
import { connect } from 'react-redux'; 

import AiportTable from '../components/table.component';
import { updateAirport, deleteAirport, getAirports } from '../actions/airport.actions';

import { startRequest } from '../actions/components.actions';
import { AIRPORT } from '../actions/containers';

class AirportListContainer extends React.Component {

    componentDidMount(){
        /**
         * this time out ensures that the function will only be executed after 
         * everything has been loaded, otherwise the saga for the triggered action 
         * would not be executed because it was not loaded. window.onload is not 
         * feasible in this case, since it would have to be called within that same 
         * function in other components, which would cause only the last call to be 
         * executed.
         */
        setTimeout(() => {
            this.getAirpotList()
        });
    }
    

    componentDidUpdate(){
        if(this.props.requested){
            this.props.dispatch(startRequest(AIRPORT));
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
        title: 'País',
        dataIndex: 'country',
        key: 'country',
        editable: true
    }, {
        title: 'Estado',
        dataIndex: 'state',
        key: 'state',
        editable: true
    }, {
        title: 'Cidade',
        dataIndex: 'city',
        key: 'city',
        editable: true
    }, {
        title: 'CEP',
        dataIndex: 'zip_code',
        key: 'zip_code',
        editable: true
    }];


    getAirpotList = () =>{
        this.props.dispatch(getAirports());
    }


    update = (id, data) => {
        let payload = {id, data}
        this.props.dispatch(updateAirport(payload));
    }


    delete = (id) => {
        let payload = {id}
        this.props.dispatch(deleteAirport(payload));
    }


    onChangePage = (page) => {
        this.getAirpotList();
    }


    render() {

        return (
            <div>
            <AiportTable 
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
    data : state.airport.airportList,
    loading : state.airportComponents.loading,
    requested : state.airportComponents.requested,
    response : state.airport.response,
});

export default connect(mapStateToProps) (AirportListContainer);