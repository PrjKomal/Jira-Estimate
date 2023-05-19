import React from 'react'

const Col = ({isOver, children}) => {
  return (
    <div style={{background: isOver ? "yellow": ""}}>{children}</div>
  )
}

export default Col