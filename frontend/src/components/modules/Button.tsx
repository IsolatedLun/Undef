import React from 'react';

interface ButtonProps {
    id?: string;
    content: string;
    action: Function; // Execute function on click
    isIcon?: boolean;
    cls?: string;
    default?: boolean;
    tooltip?: string;
}

const Button = ({ props } : { props: ButtonProps }) => {
    if(props.cls === undefined && props.default) {
      props.cls = props.isIcon ? 'button--icon' : 'button--primary'
    }

  return(
      <button 
        onClick={(e) => props.action(e)}

        id={props.id}
        className={`${props.cls} ${props.isIcon === true && 'fa'} ${props.tooltip && 'tooltip'}`}
        data-tooltip={props.tooltip}  >
          { props.content }
      </button>
  )
};

export default Button;
