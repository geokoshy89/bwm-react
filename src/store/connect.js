import React from 'react';
import { StateContext } from './Provider';

const connect=(selectState)=> Component =>{
      class Connect extends React.Component{
      constructor(props,context){
        super();
        this.state={
          slice:selectState(context.getState())
        };
        this.unsubscribe=context.subscribe(()=> this.handleStateChange(context));
      }
      handleStateChange=(context)=>{
        const rootState=context.getState();
        this.setState({slice:selectState(rootState)});
      }
      componentWillUnmount(){
        this.unsubscribe();
      }
      render(){
        debugger
        const {dispatch}=this.context;
        const {slice}=this.state;
        return <Component {...slice} dispatch={dispatch}></Component>;
      }
    }
    Connect.contextType=StateContext;

    return Connect;
}

export default connect;