import React from 'react'

const Static = () => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-3 col-3 mb-4">
        <div className="card border-0" style={{ backgroundColor: '#8592A3' }}>
          <div className="card-body p-0">
            <div className="card-title d-flex align-items-center justify-content-center">
              <h5 className="card-title mb-2 my-4 text-white">Processing: 1</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-3 mb-4">
        <div className="card border-0" style={{ backgroundColor: '#696CFF' }}>
          <div className="card-body p-0">
            <div className="card-title d-flex align-items-center justify-content-center">
              <h5 className="card-title mb-2 my-4 text-white">Preparing: 2</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-3 mb-4 ">
        <div className="card border-0" style={{ backgroundColor: '#FFAB00' }}>
          <div className="card-body p-0">
            <div className="card-title d-flex align-items-center justify-content-center">
              <h5 className="card-title mb-2 my-4 text-white">Delivering: 1</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-3 mb-4">
        <div className="card border-0" style={{ backgroundColor: '#71DD37' }}>
          <div className="card-body p-0">
            <div className="card-title d-flex align-items-center justify-content-center">
              <h5 className="card-title mb-2 my-4 text-white">Delivered: 4</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Static
