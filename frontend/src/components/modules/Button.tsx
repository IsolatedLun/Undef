import { positionTooltip } from "../funcs/accessibilityFuncs";
import { focusElement } from "../funcs/utilFuncs";

interface ButtonProps {
    id?: string;
    content: string;
    action: Function; // Execute function on click
    passEvent?: boolean;

    params?: any | object;
    isIcon?: boolean;
    cls?: string;
    modifiers?: string;
    tooltip?: string;
    contextMenu ?: JSX.Element;
    childEl?: JSX.Element;
    extraAfter?: string | number;
}

function focusContextMenu(e: Event) {
  const menu = (e.target as HTMLElement).lastChild as HTMLElement;
  menu.focus()
}

function isUnicode(str: string) {
  for (var i = 0, n = str.length; i < n; i++) {
      if (str.charCodeAt( i ) > 255) 
        return true;
  }
  
  return false;
}

const Button = ({ props } : { props: ButtonProps }) => {
    if(isUnicode(props.content))
      props.isIcon = true
    else
      props.isIcon = false;

    if(props.cls === undefined) {
      props.cls = props.isIcon 
        ? `button--icon ${props.modifiers}` 
        : `button--primary ${props.modifiers}`;
    }

    if(props.contextMenu !== undefined) {
      props.action = focusContextMenu;
    }

    if(props.params === undefined)
      props.params = [];
    if(props.passEvent === undefined)
      props.passEvent = true;

  return(
      <button
        onClick={(e) => { 
          e.preventDefault(); 

          if(props.passEvent)
            props.action(e, ...props.params)
          else
            props.action(...props.params)  
        }}

        id={props.id}

        onMouseOver={(e) => {
          if(props.tooltip)
            positionTooltip(e.target as HTMLElement)
        }}

        className={`${props.cls} ${props.isIcon === true && 'fa'} 
          ${props.tooltip ? 'tooltip btn--tooltip' : ''} ${props.extraAfter ?'show--after mb--015' : ''}`}
        
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
