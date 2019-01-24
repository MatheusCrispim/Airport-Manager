import React from 'react';
import { connect } from 'react-redux'; 

import FlightTable from '../components/table.component';
import { updateFlight, deleteFlight, getFlights } from '../actions/flight.actions';

import { startRequest } from '../actions/components.actions';
import { FLIGHT } from '../actions/containers';

class FlightListContainer extends React.Component {

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
            this.getFlightList()
        });
    }
    

    componentDidUpdate(){
        if(this.props.requested){
            this.props.dispatch(startRequest(FLIGHT));
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
        title: 'Status',
        dataIndex: 'status',
        key: 'status', 
        editable: true
    }, {
        title: 'Data',
        dataIndex: 'flight_date',
        key: 'flight_date', 
        inputType: 'date',
        editable: true
    }, {
        title: 'Hora',
        dataIndex: 'flight_time',
        key: 'flight_time',
        inputType: 'time',
        editable: true
    },{
        title: 'Aeroporto',
        dataIndex: 'airport_code',
        key: 'airport_code', 
        editable: true
    },{
        title: 'Pista',
        dataIndex: 'runaway_code',
        key: 'runaway_code', 
        editable: true
    },{
        title: 'Companhia',
        dataIndex: 'airline_code',
        key: 'airline_code', 
        editable: true
        
    }];


    getFlightList = () =>{
        this.props.dispatch(getFlights());
    }


    update = (id, data) => {
        data.flight_time =  data.flight_time.format('h:mm:ss');
        data.flight_date = data.flight_date.format('YYYY-MM-DD');
        let payload = {id, data}
        this.props.dispatch(updateFlight(payload));
    }


    delete = (id) => {
        let payload = {id}
        this.props.dispatch(deleteFlight(payload));
    }


    onChangePage = (page) => {
        this.getFlightList();
    }


    render() {

        return (
            <div>
                <FlightTable 
                    loading = {this.props.loading}
                    data = {this.props.data}
                    columns = {this.columns}
                    update = {this.update}
                    delete = {this.delete}
                    onChangePage = {this.onChangePage}/>
            </div>
        );  
    }
}


const mapStateToProps = (state) => ({
    data : state.flight.flightList,
    loading : state.flightComponents.loading,
    requested : state.flightComponents.requested,
    response : state.flight.response,
});

export default connect(mapStateToProps) (FlightListContainer);