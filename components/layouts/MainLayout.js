import React from 'react'
import { node } from 'prop-types'
import Preloader from '../baseComponents/gui/preloader/Preloader'

export default function MainLayout({ children }) {
  return (
    <>
      <Preloader/>
      <div className={ 'main-container' }>
        <div className={ 'content-wrapper' }>{ children }</div>
      </div>
    </>
  )
}

MainLayout.propTypes = {
  children: node,
}
