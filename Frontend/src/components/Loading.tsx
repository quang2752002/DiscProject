import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3">Loading...</div>
      </div>
    </div>
  )
}

export default Loading
