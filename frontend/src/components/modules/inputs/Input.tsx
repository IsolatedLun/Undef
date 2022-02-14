import React from 'react';

export interface INF_Input {
    id?: string;
    setter: Function;
    data: any;
    type: 'text' | 'file' | 'email' | 'password';
    realType: 'string' | 'oneWord' | 'file' | 'select' | 'checkbox' | 'email' | 'password'
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
        onInput={(e) => props.setter(e, props.data, props.realType)}

        id={props.id}
        placeholder={props.placeholder ? props.placeholder : ''}
        className={props.cls}
        name={props.name}
        value={props.data}
        type={props.type} 
        
        data-real-type={props.realType}
        />
  )
};

export default Input;
