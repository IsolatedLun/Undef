import React from 'react';

interface InputProps {
    placeholder: string;
    setter: Function;
    data: any;
    type: 'text' | 'file'
    cls?: string;
    default?: boolean;
}

const Input = ({ props } : { props: InputProps }) => {

    if(props.cls === undefined && props.default)
        props.cls = 'input--primary'

  return(
      <input 
        onInput={(e) => props.setter(e, props.data)}

        placeholder={props.placeholder}
        className={props.cls}
        type={props.type} />
  )
};

export default Input;
