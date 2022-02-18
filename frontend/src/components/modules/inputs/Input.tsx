import React from 'react';
import { useAutoState } from '../../../hooks/useAutoState';

export interface INF_Input {
    id?: string;
    type: 'text' | 'file' | 'email' | 'password' | 'textarea';
    realType: 'string' | 'oneWord' | 'file' | 'select' | 'checkbox' | 'email' | 'password';
    name: string;

    cls?: string;
    labelCls?: string;
    placeholder?: string;
}

export interface InputState {
  setter?: Function;
  data?: any;
}

export interface INF_Input_State extends InputState, INF_Input {}

const Input = ({ props } : { props: INF_Input_State }) => {

    if(props.cls === undefined) {
        props.cls = props.type === 'file' ? 'input--file' : 'input--primary';
    }

    if(props.type !== 'file' && props.type !== 'textarea')
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

    else if(props.type === 'file')
        return(
            <label data-label={props.placeholder}
                htmlFor={props.id} className={`input--label--image input--primary ${props.labelCls}`}>
                
                <img src="" id={props.id + '-preview'} />
                    
                <input 
                onInput={(e) => useAutoState(e, props.setter!, props.data)}
                
                id={props.id}
                className={props.cls}
                type="file" 
                accept='image/*'
                name={props.name}

                data-real-type={props.realType}
                />

            </label>
        )
    
    else if(props.type === 'textarea')
            return(
                <textarea 
                    onInput={(e) => useAutoState(e, props.setter!, props.data)}

                    id={props.id}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    className={props.cls}
        
                    name={props.name}
                
                    data-real-type={props.realType}
                />
            )
};

export default Input;
