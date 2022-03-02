import React from 'react';
import { useAutoState } from '../../../hooks/useAutoState';

export interface INF_Input {
    id?: string;
    type: 'text' | 'file' | 'email' | 'password' | 'textarea' | 'range' | 'radio';
    realType: 'string' | 'oneWord' | 'file' | 
        'select' | 'checkbox' | 'email' | 'password' | 'image' | 'video';
    name: string | undefined;
    value?: string;
    action?: Function;
    params?: any[];

    cb?: Function;
    cbParams?: any[];
    cbOverride?: boolean;

    modifiers?: string;
    cls?: string;
    labelCls?: string;
    placeholder?: string;
    isOptional?: boolean;
}

export interface InputState {
  setter?: Function;
  data?: any;
  nested?: string // key
}

export interface INF_Input_State extends InputState, INF_Input {}

const Input = ({ props } : { props: INF_Input_State }) => {

    if(props.cls === undefined) {
        props.cls = props.type === 'file' ? `input--file ${props.modifiers}` : `input--primary ${props.modifiers}`;
    }

    if(['text', 'email', 'password'].includes(props.type))
        return(
            <input
            onInput={(e) => useAutoState(e, props.setter!, props.data, props.cb, props.cbParams, 
                props.cbOverride)}

            id={props.id}
            placeholder={props.placeholder ? props.placeholder : ''}
            className={props.cls}

            name={props.name}
            type={props.type} 
        
            data-real-type={props.realType}
            data-optional={props.isOptional}
            />
        )

    else if(props.type === 'file')
        return(
            <label data-label={props.placeholder}
                htmlFor={props.id} 
                className={`input--label input--primary ${props.labelCls}`}>
                
                <img src="" id={props.id + '-preview'} />
                <video className='hidden' id={props.id + '-video'} />
                    
                <input 
                onInput={(e) => useAutoState(e, props.setter!, props.data, props.cb, 
                    props.cbParams, props.cbOverride)}
                
                id={props.id}
                className={props.cls}
                type="file" 
                accept={props.realType + '/*'}
                name={props.name}

                data-real-type={props.realType}
                />

            </label>
        )
    
    else if(props.type === 'textarea')
            return(
                <textarea 
                    onInput={(e) => useAutoState(e, props.setter!, props.data, props.cb, 
                        props.cbParams, props.cbOverride)}

                    id={props.id}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    className={props.cls + ' input--textarea'}
        
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
                    className={props.cls + ' input--range'}
                    type='range'
                    min='0'
                    max='100'
        
                    name={props.name}
                />
            )
    else if(props.type === 'radio')
            return(
                <label htmlFor={`radio-${props.name}-${props.value}-label`}
                    className="input--radio--label pos--relative">
                    <input 
                        onInput={() => props.setter!(props.value)}
                        id={`radio-${props.name}-${props.value}-radio`}
                        className={'input--radio'}
                        name={props.name}
                        value={props.value}
                        type='radio'
                    />
                    <div className="input--radio--button"></div>
                </label>
            )

    else
        return(<></>)
};

export default Input;
