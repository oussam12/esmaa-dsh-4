import React, {createContext, useContext, useState, useMemo} from 'react';
const Ctx=createContext(null);
export function Tabs({ value, onValueChange, children, className='' }){
  const [internal, setInternal]=useState(value);
  const v=value ?? internal;
  const setV=(val)=>{ setInternal(val); onValueChange && onValueChange(val); };
  const ctx=useMemo(()=>({ value:v, setValue:setV }),[v]);
  return <Ctx.Provider value={ctx}><div className={className}>{children}</div></Ctx.Provider>;
}
export function TabsList({ children }){ return <div className="tabs">{children}</div>; }
export function TabsTrigger({ value, children }){
  const { value:v, setValue }=useContext(Ctx);
  const active=v===value;
  return <button onClick={()=>setValue(value)} className={`tab ${active?'active':''}`} type="button">{children}</button>;
}
export function TabsContent({ value, children }){
  const { value:v }=useContext(Ctx);
  if(v!==value) return null;
  return <div style={{marginTop:8}}>{children}</div>;
}
