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

  return(
      <button
        onClick={(e) => props.action !== undefined ? props.action(e, ...props.params) : null}

        id={props.id}
        className={`${props.cls} ${props.isIcon === true && 'fa'} ${props.tooltip && 'tooltip'}`}
        aria-label={props.tooltip}
        data-tooltip={props.tooltip}  >
          { props.content }
          { props.contextMenu }
      </button>
  )
};

export default Button;
