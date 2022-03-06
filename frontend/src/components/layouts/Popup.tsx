import React from 'react'
import { ERROR_ICO } from '../../consts'

const Popup = () => {
  return (
    <div className='popup' id='popup' aria-hidden='true'>
      <header className="popup__header flex flex--center gap--05">
        <p className="popup__icon fa" id='popup-icon'></p>
        <p className='popup__type' id='popup-type'></p>
      </header>
      <p className="popup__text" id="popup-text"></p>
    </div>
  )
}

export default Popup