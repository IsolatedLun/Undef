import React from 'react';

export interface ContextMenu {
    id: string;
    options: ContextMenuOption[];
}

interface ContextMenuOption {
    action: Function;
    icon: string;
    text: string;
}

const Contextmenu = ({ props } : { props: ContextMenu }) => {
  return(
      <div tabIndex={-1} className='context-menu-container'>
          <ul className="context-menu flex flex--col">
            {
                props.options.map((option, idx) => (
                    <li key={idx} className="menu__option flex gap--075">
                        <p className="fa option__icon">{ option.icon }</p>
                        <p className="option__text">{ option.text }</p>
                    </li>
                ))
            }
      </ul>
      </div>
  )
};

export default Contextmenu;
