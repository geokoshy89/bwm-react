import React,{useEffect} from 'react';
const generateColor=()=>{
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}
const CounterView= (props)=> {
  const {counterValue,handleIncrement}=props;
  useEffect(()=>{
    console.log('Use effect from Counter View');
  });

  return (
    <div style={{background: generateColor()}}>
      <h2 className="value">{counterValue}</h2>
      <button onClick={handleIncrement(2)}>Increment</button>
      <button onClick={handleIncrement(-4)}>Decrement</button>
    </div>
  )
}
export default React.memo(CounterView);