import React from 'react';
import { API_URL } from '../../../consts';
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
    url?: string; // Url for image input

    cb?: Function;
    cbParams?: any[];
    cbOverride?: boolean; // For useAutoState

    modifiers?: string; // extra css classes
    cls?: string; // Custom class
    labelCls?: string; 
    placeholder?: string;
    isOptional?: boolean; // Validation boolean
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
            onInput={(e) => useAutoState(e, props.setter!, props.data, props.cb, 
                props.cbOverride)}

            id={props.id}
            placeholder={props.placeholder ? props.placeholder : ''}
            className={props.cls}

            name={props.name}
            type={props.type} 
            value={props.value}
            aria-label={props.name + ' input'}
        
            data-real-type={props.realType}
            data-optional={props.isOptional}
            />
        )

    else if(props.type === 'file')
        return(
            <label data-label={props.placeholder}
                htmlFor={props.id} 
                className={`input--label input--primary ${props.labelCls}`}>
                
                <img src={API_URL + props.url} id={props.id + '-preview'} />
                <video className='hidden' id={props.id + '-video'} />
                    
                <input 
                onInput={(e) => useAutoState(e, props.setter!, props.data, props.cb)}
                
                id={props.id}
                className={props.cls}
                type="file" 
                accept={props.realType + '/*'}
                name={props.name}
                aria-label={props.name + ' file input'}

                data-real-type={props.realType}
                />

            </label>
        )
    
    else if(props.type === 'textarea')
            return(
                <textarea 
                    onInput={(e) => useAutoState(e, props.setter!, props.data, props.cb)}

                    id={props.id}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    className={props.cls + ' input--textarea'}
                    spellCheck='false'
        
                    name={props.name}
                    value={props.value}
                    aria-label={props.name + ' textarea input'}
                
                    data-real-type={props.realType}
                />
            )
    else if(props.type === 'range' && props.action && props.params)
            return(
                <input 
                    onChange={(e) => props.action!(e, ...props.params!)}

                    id={props.id}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    className={props.cls + ' input--range'}
                    type='range'
                    min='0'
                    max='100'
                    aria-label={props.name + ' range input'}
        
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
                        aria-label={props.name + ' range input'}
                    />
                    <div className="input--radio--button"></div>
                </label>
            )

    else
        return(<></>)
};

export default Input;
