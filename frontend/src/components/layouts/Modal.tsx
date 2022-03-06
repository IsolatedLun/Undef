import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { toggleModal } from "../../slices/modal-slice";
import Button from "../modules/Button";

export interface INF_Modal {
    text: string;
    cb: Function;
}

const Modal = () => {
    const dispatch = useAppDispatch()
    const { text, cb } = useAppSelector(state => state.modal)

    return (
    <>
        <div id='modal' className="modal flex flex--center--all">
            <div className="modal__content flex flex--center--all flex--col gap--2">
                <h1 className="modal__title">{ text }</h1>

                <div className="btn--group gap--2-5 cust">
                    <Button props={{ content: 'Yes', action: () => cb() }} />
                    <Button props={{ content: 'No', action: () => dispatch(toggleModal({  })) }} />
                </div>
            </div>
        </div>
        <div className="overlay"></div>
    </>
    )
}

export default Modal