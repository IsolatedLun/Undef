import Input, { INF_Input, InputState } from './Input';

export interface INF_InputPart extends InputState {
    id: string;
    inputData: INF_Input
    label?: string;
}

const InputPart = ({ props } : { props: INF_InputPart }) => {
  return (
    <div className="form__part" id={props.id + '-form-part'}>
        { props.label && (
          <label className='part__label' htmlFor={props.id}>
            { props.label }
             
            {props.inputData.isOptional && <span className='txt--muted'>*</span>}
          </label>
        ) }

        <Input props={{ ...props.inputData, setter: props.setter, 
          id: props.id + '-input', modifiers: 'form__inpt' }} />

        <ul className="part__help-list" id={props.id + '-input-help-list'}></ul>
    </div>
  )
}

export default InputPart