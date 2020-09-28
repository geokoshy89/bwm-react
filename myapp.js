function render(){
  const root=document.getElementById('root');
  var node=document.createElement('div');
  var textNode=document.createTextNode('What a nice day');
  node.appendChild(textNode);
  root.appendChild(node);
}