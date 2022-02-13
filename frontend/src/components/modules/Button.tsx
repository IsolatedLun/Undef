import { focusElement } from "../funcs/utilFuncs";

interface ButtonProps {
    id?: string;
    content: string;
    action?: Function | void; // Execute function on click
    params?: any | object;
    isIcon?: boolean;
    cls?: string;
    default?: boolean;
    tooltip?: string;
    contextMenu ?: JSX.Element;
    childEl?: JSX.Element;
    extraAfter?: string | number;
}

function focusContextMenu(e: Event) {
  const menu = (e.target as HTMLElement).lastChild as HTMLElement;
  menu.focus()
}

const Button = ({ props } : { props: ButtonProps }) => {
    if(props.cls === undefined && props.default) {
      props.cls = props.isIcon ? 'button--icon' : 'button--primary'
    }

    if(props.contextMenu !== undefined) {
      props.action = focusContextMenu
    }

    if(props.params === undefined)
      props.params = []

  return(
      <button
        onClick={(e) => props.action !== undefined ? props.action(e, ...props.params) : null}

        id={props.id}

        className={`${props.cls} ${props.isIcon === true && 'fa'} 
          ${props.tooltip && 'tooltip btn--tooltip'} ${props.extraAfter && 'show--after mb--015'}`}
        
        aria-label={props.tooltip}
        data-tooltip={props.tooltip}
        data-after={props.extraAfter}  >
          { props.content }
          { props.childEl && props.childEl }
          { props.contextMenu }
      </button>
  )
};

export default Button;
