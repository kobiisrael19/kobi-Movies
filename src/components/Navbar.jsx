import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { HiOutlineSearch } from 'react-icons/hi';

export default function Navbar() {
  const inputData = useRef();
  const navigate = useNavigate();

  return (
    <div>

      <div style={{ position: 'absolute', width: '100%' }} className='d-flex align-items-center justify-content-between px-2 px-md-3 px-lg-4 px-xl-5 pt-md-2 py-lg-3 py-xl-4' >
        <div className="col-lg-2 z-3">
          <Link style={{ textDecoration: 'none' }} to={'/'}><span className='appw'>AppWatch</span></Link>
        </div>

        <div className="input_search d-none  d-lg-flex align-items-center justify-content-center z-3 ">
          <div className="input_search d-flex justify-content-center   align-items-center col-md-11 col-lg-12" style={{ marginBottom: '5px' }}>
            <button onClick={(e)=>{navigate(`/search/${inputData.current.value}`)}} style={{ width: '50px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '25px 0px 0px 25px', border: 'none' }} className=" col-2 btn btn-danger">
              <span style={{ color: 'white', fontSize: '24px', display: 'flex' }}><HiOutlineSearch  /></span>
            </button>
            <input ref={inputData} onKeyDown={(e) => {
              if (e.key == 'Enter') {
                navigate(`/search/${inputData.current.value}`)
              }
            }} style={{
              borderRadius: '0px 25px 25px 0px', width: '200px', height: '40px',
               border: 'solid 1px rgb(0,0,0)', fontSize: '19px',
              paddingLeft: '6px', paddingBottom: '5px', marginBottom: '1px'
            }}
              type="search" placeholder='search somthing. . .' name="" id="" />
          </div>
        </div>
      </div>

    </div>
  )
}
