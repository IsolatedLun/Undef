import { useState } from 'react';

export interface INF_FomrCompletion {
    text: string;
    idx: number;
}

interface INF_Completion {
    text: string;
    idx: number;
}

const Completion = ({ completion } : { completion: INF_Completion }) => {
    return(
        <div className="completion">
            <p className="completion__text">{ completion.text }</p>
            <p className="completion__idx">{ completion.idx }</p>
        </div>
    )
}

const FormCompletion = ({ completions, currIdx } : { completions: INF_FomrCompletion[], currIdx: number }) => {
    const customVars = {'--complete': currIdx, '--completed': completions.length} as React.CSSProperties;

    return (
    <div className="form__completions tooltip btn--tooltip" style={customVars}
        data-tooltip={`Completed ${currIdx}/${completions.length}`}>
        {
            completions.map((completion, idx) => (
                <Completion key={idx} completion={completion} />
            ))
        }
    </div>
    )
}

export default FormCompletion