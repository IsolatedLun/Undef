import { useState } from "react"
import { useLoginMutation } from "../../services/authApi"
import { validateForm } from "../funcs/formFuncs"
import { handleResponse } from "../funcs/utilFuncs"
import Button from "../modules/Button"
import Form from "../modules/Form"
import InputPart from "../modules/inputs/InputPart"

export interface LoginUser {
    email_address: string;
    password: string;
}

const Login = () => {
    const [login, { error }] = useLoginMutation();
    const [loginUser, setLoginUser] = useState<LoginUser>({
        email_address: '',
        password: '',
    })

    const loginElements = [
        <InputPart props={{id: 'email', label: 'Email Address', setter: setLoginUser,
            inputData: {name: 'email_address', type: 'email', realType: 'email'}}} />,

        <InputPart props={{id: 'password', label: 'Password', setter: setLoginUser,
            inputData: {name: 'password', type: 'password', realType: 'password'}}} />,

        <Button props={{ content: 'Login', action: async() => {
           if(validateForm('form__inpt'))
            await login(loginUser)
            .unwrap()
            .then(res => handleResponse(res, { redirectTo: '/' }))
            .catch(res => handleResponse(res))
        }, modifiers: 'w--100' }} />
    ]

  return (
    <div className="form--container">
        <h1 className='form__head txt--center'>Login</h1>
        <Form props={{ id: '0', children: loginElements }} />
    </div>
  )
}

export default Login