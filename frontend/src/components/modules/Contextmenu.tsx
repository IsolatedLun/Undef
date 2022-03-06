import React from 'react';
import { Link } from 'react-router-dom';

export interface ContextMenu {
    id: string;
    options: ContextMenuOption[];
}

interface ContextMenuOption {
    action: Function;
    icon: string;
    text: string;

    isLink?: boolean;
    to?: string;
}

const ContextMenu = ({ props } : { props: ContextMenu }) => {
  return(
      <div tabIndex={0} className='context-menu-container'>
          <ul className="context-menu flex flex--col">
            {
                props.options.map((option, idx) => {
                    const el = (
                        <li key={idx} className="menu__option flex gap--075">
                            <p className="fa option__icon">{ option.icon }</p>
                            <p className="option__text">{ option.text }</p>
                        </li>
                    )

                    if(option.to !== undefined)
                        return(<Link to={option.to}>{ el }</Link>)
                    else 
                        return el;
                })
            }
      </ul>
      </div>
  )
};

export default ContextMenu;
