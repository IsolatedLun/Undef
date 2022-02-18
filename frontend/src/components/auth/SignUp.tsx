import React, { useState } from 'react'
import MultiForm from '../combines/MultiForm'
import FormCompletion, { INF_FomrCompletion } from '../modules/FormCompletion'
import InputPart from '../modules/inputs/InputPart';

interface NewUser {
  email_address: string;
  password: string;
  banner: File | null;
}

const SignUp = () => {
  const [index, setIndex] = useState<number>(0);

  const [newUser, setNewUser] = useState<NewUser>({
    email_address: '',
    password: '',
    banner: null
  })

  const completions: INF_FomrCompletion[] = 
    [ { text: 'Registration', idx: 1 }, 
      { text: 'Channel', idx: 2 },
      { text: 'Profile', idx: 3 },
    ]

  return (
    <form className="auth-form-container form__container">
      <h1 className='form__head txt--center'>Sign up to Undef</h1>
        <FormCompletion currIdx={index}
          completions={completions} />

        

        <MultiForm forms={[]} index={index} setter={setIndex} />
    </form>
  )
}

export default SignUp