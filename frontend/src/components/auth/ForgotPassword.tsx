import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useChangePasswordMutation } from "../../services/authApi";
import { validateForm } from "../funcs/formFuncs";
import { handleResponse } from "../funcs/utilFuncs";
import Button from "../modules/Button"
import Form from "../modules/Form"
import InputPart from "../modules/inputs/InputPart"

export interface INF_ForgotPassword {
    email_address: string;
    new_password: string;
}

const ForgotPassword = () => {
    const [postChangePassword, {  }] = useChangePasswordMutation();

    const [changePassword, setChangePassword] = useState<INF_ForgotPassword>({
        email_address: '',
        new_password: '',
    });

    const forgotPasswordElements = (
        <div className="form--container">
            <InputPart props={{ label: 'Email', setter: setChangePassword,
                inputData: { name: 'email_address', realType: 'string', type: 'email' }, 
                id: 'title'}} />

            <InputPart props={{ label: 'New Password', setter: setChangePassword,
                inputData: { name: 'new_password', realType: 'password', type: 'password' }, 
                id: 'description'}} />

            <Button props={{ content: 'Change password', action: () => {
                if(validateForm('form__inpt'))
                    postChangePassword(changePassword).unwrap()
                        .then(res => handleResponse(res, { redirectTo: '/auth/login' }))
                        .catch(res => handleResponse(res))
            } }} />
        </div>
    )

  return (
    <Form props={{ children: forgotPasswordElements, id: '1' }} />
  )
}

export default ForgotPassword