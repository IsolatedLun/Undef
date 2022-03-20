import React from 'react';
import { Link } from 'react-router-dom';

export interface ContextMenu {
    id: string;
    cls?: string;

    options?: INF_ContextMenuOption[];
    children?: JSX.Element;
}

export interface INF_ContextMenuOption {
    action?: Function;
    icon: string;
    text: string;

    isLink?: boolean;
    to?: string;
}

const ContextMenuOption = ({ props, idx } : { props: INF_ContextMenuOption, idx: number }) => {
    const el = (
        <li 
            tabIndex={0} key={idx} 
            className="menu__option flex gap--075"
            onClick={() => { if(props.action) props.action() }}
        >

            <p className="fa option__icon" aria-hidden='true'>{ props.icon }</p>
            <p className="option__text">{ props.text }</p>
        </li>
    )

    if(props.to !== undefined)
        return(<Link to={props.to}>{ el }</Link>)
    else 
        return el;
}

const ContextMenu = ({ props } : { props: ContextMenu }) => {
  return(
      <div tabIndex={0} className='context-menu-container no--outline'>
          <ul className={`context-menu flex flex--col ${props.cls}`}>
            {
                props.options 
                ? props.options.map((option, idx) => (
                    <ContextMenuOption key={idx} props={{ ...option }} idx={idx} /> ))
                : props.children

                ? props.children
                : null
            }
            </ul>
      </div>
  )
};

export default ContextMenu;
