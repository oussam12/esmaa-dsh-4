import React from 'react';
export function Button({ children, className='', variant='outline', size, ...props }){
  const v = variant === 'ghost' ? 'btn ghost' : variant === 'outline' ? 'btn outline' : 'btn';
  const s = size === 'icon' ? 'icon' : '';
  return <button className={`${v} ${s} ${className}`} {...props}>{children}</button>;
}
