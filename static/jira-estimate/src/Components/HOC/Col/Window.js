import React from 'react'
import Model from 'react-model'

Model.setAppElement("#app");

const Window = ({show, onClose, item}) => {
  return (
    <Model isOpen={show} onRequestClose={onClose}>
        
    </Model>
  )
}

export default Window