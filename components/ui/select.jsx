import React, {createContext, useContext, useMemo} from 'react';
const Ctx=createContext(null);
export function Select({ value, onValueChange, children }){
  const items=[];
  function collect(node){
    if(!node) return;
    React.Children.forEach(node, (child)=>{
      if(!React.isValidElement(child)) return;
      if(child.type && child.type.displayName==='SelectContent'){ collect(child.props.children); }
      else if(child.type && child.type.displayName==='SelectItem'){ items.push({ value: child.props.value, label: child.props.children }); }
      else if(child.props && child.props.children){ collect(child.props.children); }
    });
  }
  collect(children);
  const ctx=useMemo(()=>({ value, onValueChange, items }),[value, onValueChange, items.length]);
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
export function SelectTrigger(props){
  const ctx=useContext(Ctx);
  return (
    <div {...props}>
      <select value={ctx.value} onChange={(e)=>ctx.onValueChange && ctx.onValueChange(e.target.value)} className="select">
        {ctx.items.map(i=><option key={i.value} value={i.value}>{i.label}</option>)}
      </select>
    </div>
  );
}
SelectTrigger.displayName='SelectTrigger';
export function SelectContent({children,...props}){ return <div style={{display:'none'}} {...props}>{children}</div> }
SelectContent.displayName='SelectContent';
export function SelectItem({children,...props}){ return <div {...props}>{children}</div> }
SelectItem.displayName='SelectItem';
export function SelectValue({placeholder}){ return <span>{placeholder||''}</span> }
SelectValue.displayName='SelectValue';
