import { useState } from 'react';

export interface INF_FomrCompletion {
    text: string;
    idx: number;
}

const FormCompletion = 
    ({ completions, currIdx } : { completions: INF_FomrCompletion[], currIdx: number }) => {

  return (
    <div className="form__completions tooltip btn--tooltip" 
        data-tooltip={`Completed ${currIdx}/${completions.length}`}>
        {
            completions.map(completion => (
                <div className="completion">
                    <p className="completion__text">{ completion.text }</p>
                    <p className="completion__idx">{ completion.idx }</p>
                </div>
            ))
        }
    </div>
  )
}

export default FormCompletion