import React from 'react';
import { connect } from 'react-redux';

class NetworkBaseline extends React.Component{
    static icon = "stop-circle";
    static label = "Network Baseline";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (<div></div>);
    }
    
}

export default connect()(NetworkBaseline);