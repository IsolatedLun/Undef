import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { toggleModal } from "../../slices/modal-slice";
import Button from "../modules/Button";

export interface INF_Modal {
    text: string;
    cb: Function;
    actionText: string;
}

const Modal = () => {
    const dispatch = useAppDispatch()
    const { text, cb, actionText } = useAppSelector(state => state.modal)

    return (
    <>
        <div id='modal' className="modal flex flex--center--all">
            <div className="modal__content flex flex--center--all flex--col gap--2">
                <div className="flex flex--col gap--1 txt--center">
                    <h1 className="modal__title">
                        Are you sure that you want to 
                        <span className="txt--muted modal__action-text"> { actionText }</span>
                    </h1>
                    <p className="modal__text">{ text }</p>
                </div>

                <div className="btn--group gap--2-5 cust">
                    <Button props={{ content: 'Continue', action: () => cb() }} />
                    <Button props={{ content: 'Go back', action: () => dispatch(toggleModal({  })) }} />
                </div>
            </div>
        </div>
        <div className="overlay"></div>
    </>
    )
}

export default Modal