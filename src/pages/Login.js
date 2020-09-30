import React from 'react';
import connect from '../store/connect';
class Login extends React.Component{
  componentDidMount(){
    this.props.dispatch({type:'FETCH_DATA'});
  }
  render(){
    const data=this.props;
    return(
      <h1>{JSON.stringify(data)}</h1>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    data: state.data1
  }
}
export default connect(mapStateToProps)(Login); 