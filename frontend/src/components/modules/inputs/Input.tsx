import React from 'react';
import { useAutoState } from '../../../hooks/useAutoState';

export interface INF_Input {
    id?: string;
    setter: Function;

    // data && obj are used to update the input's value when it gets appended the DOM.
    data: any;
    obj?: any; 
    type: 'text' | 'file' | 'email' | 'password';
    realType: 'string' | 'oneWord' | 'file' | 'select' | 'checkbox' | 'email' | 'password';
    setType: 'string' | 'oneWord' | 'file'
    name: string;

    cls?: string;
    placeholder?: string;
}

const Input = ({ props } : { props: INF_Input }) => {

    if(props.cls === undefined) {
        props.cls = 'input--primary';
    }

  return(
      <input 
        onInput={(e) => useAutoState(e, props.setter, props.obj, props.data, props.setType)}

        id={props.id}
        placeholder={props.placeholder ? props.placeholder : ''}
        className={props.cls}
        value={props.data}
        name={props.name}
        type={props.type} 
        
        data-real-type={props.realType}
        />
  )
};

export default Input;
