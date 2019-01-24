import React from 'react';
import { connect } from 'react-redux'; 

import RunawayTable from '../components/table.component';
import { updateRunaway, deleteRunaway, getRunaways } from '../actions/runaway.actions';

import { startRequest } from '../actions/components.actions';
import { RUNAWAY } from '../actions/containers';

class RunawayListContainer extends React.Component {

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
            this.getRunawayList();
        });
    }
    

    componentDidUpdate(){
        if(this.props.requested){
            this.props.dispatch(startRequest(RUNAWAY));
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
    }, {
        title: 'Código do aeroporto',
        dataIndex: 'airport_code',
        key: 'airport_code', 
        editable: true
    }];


    getRunawayList = () =>{
        this.props.dispatch(getRunaways());
    }


    update = (id, data) => {
        let payload = {id, data}
        this.props.dispatch(updateRunaway(payload));
    }


    delete = (id) => {
        let payload = {id}
        this.props.dispatch(deleteRunaway(payload));
    }


    onChangePage = (page) => {
        this.getRunawayList();
    }


    render() {

        return (
            <div>
            <RunawayTable 
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
    data : state.runaway.runawayList,
    loading : state.runawayComponents.loading,
    requested : state.runawayComponents.requested,
    response : state.runaway.response,
});

export default connect(mapStateToProps) (RunawayListContainer);