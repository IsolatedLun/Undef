import React from 'react';
import { useAutoState } from '../../../hooks/useAutoState';

export interface INF_Input {
    id?: string;
    type: 'text' | 'file' | 'email' | 'password';
    realType: 'string' | 'oneWord' | 'file' | 'select' | 'checkbox' | 'email' | 'password';
    name: string;

    cls?: string;
    placeholder?: string;
}

export interface InputState {
  setter?: Function;
  data?: any;
}

export interface INF_Input_State extends InputState, INF_Input {}

const Input = ({ props } : { props: INF_Input_State }) => {

    if(props.cls === undefined) {
        props.cls = 'input--primary';
    }

    return(
        <input 
          onInput={(e) => useAutoState(e, props.setter!, props.data)}

          id={props.id}
          placeholder={props.placeholder ? props.placeholder : ''}
          className={props.cls}

          name={props.name}
          type={props.type} 
      
          data-real-type={props.realType}
          />
    )
};

export default Input;
