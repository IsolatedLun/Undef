import React from 'react';
import { useAutoState } from '../../../hooks/useAutoState';

export interface INF_Input {
    id?: string;
    type: 'text' | 'file' | 'email' | 'password' | 'textarea' | 'range';
    realType: 'string' | 'oneWord' | 'file' | 
        'select' | 'checkbox' | 'email' | 'password' | 'image';
    name: string;
    action?: Function;
    params?: any[];

    modifiers?: string;
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
        props.cls = props.type === 'file' ? `input--file ${props.modifiers}` : `input--primary ${props.modifiers}`;
    }

    if(props.type !== 'file' && props.type !== 'textarea' && props.type !== 'range')
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
    else if(props.type === 'range' && props.action !== undefined && props.params !== undefined)
            return(
                <input 
                    onChange={(e) => props.action!(e, ...props.params!)}

                    id={props.id}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    className={props.cls}
                    type='range'
                    min='0'
                    max='100'
        
                    name={props.name}
                />
            )

    else
        return(<></>)
};

export default Input;
