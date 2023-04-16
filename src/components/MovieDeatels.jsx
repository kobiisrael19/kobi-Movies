import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import './style.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function MovieDeatels() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();


  const getData = async () => {
    const { data } = await axios.get(`https://omdbapi.com/?i=${params.id}&apikey=64dc74b3`);
    console.log(data);
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 500);
  }, [])

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, []);


  return (
    <div>
      {loading ?
        <div style={{ height: '900px' }} className='fs-1 d-flex justify-content-center align-items-center text-white text-center'>
          <div>
            <div style={{}}><BeatLoader color="#db0e0e" loading margin={5} speedMultiplier={1} /></div><div className='ms-5'>  loading. . .</div>
          </div>
        </div> :
        
        <div className='vvvh container d-lg-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* title */}
          <div className='text-white d-lg-none text-center pt-5'><span style={{ fontSize: '60px', color: 'white' }}>{data.Title}</span><br />
            <div className='py-3'><span className='fs-5 px-2' style={{ borderRight: '1px solid white' }}>{data.Runtime}</span><span style={{ borderRight: '1px solid white' }} className='px-2 fs-5'>{data.Language}</span><span style={{ borderRight: '1px solid white' }} className='px-2 fs-5'>{data.Year}</span></div>
          </div>
          {/* image */}
          <div className='d-flex justify-content-center'>
            <div className='mt-2 mt-lg-5 pt-lg-5'data-aos="fade-right" data-aos-offset="700" data-aos-easing="ease-in-sine">
              {<img style={{ height: '500px', width: "350px", boxShadow: '0px 0px 200px 1px white', borderRadius: '15px' }} src={data.Poster} alt="" />} <br />
              <button onClick={(e) => { navigate(-1) }} className='btn btn-info my-4 px-4 fs-5 fw-bold d-none d-lg-flex' style={{ fontFamily: 'monospace' }}>back</button>
            </div>
          </div>
          {/* text */}
          <div >
            <div style={{ marginLeft: '30px' }}>
              <div className='d-none d-lg-flex'>
                <div className='ms-5 text-white' style={{ marginTop: '-58px', height: '250px' }}><span style={{ fontSize: '60px', color: 'white' }}>{data.Title}</span><br />
                  <div className='py-2'><span className='fs-5 px-2' style={{ borderRight: '1px solid white' }}>{data.Runtime}</span><span style={{ borderRight: '1px solid white' }} className='px-2 fs-5'>{data.Language}</span><span style={{ borderRight: '1px solid white' }} className='px-2 fs-5'>{data.Year}</span></div>
                </div>
              </div>
              <div className='text-white ms-3 ms-lg-5  ps-2 ' style={{ height: '280px' }}>
                <div style={{ width: '100%' }}><h5> <span style={{ fontSize: '25px', textDecorationLine: 'underline' }}>Plot:</span>  {data.Plot}</h5></div>
                <div className='py-2'> <h5> <span style={{ fontSize: '25px', textDecorationLine: 'underline' }}>Genre:</span>  {data.Genre}</h5></div>
                <div className='py-2'> <h5> <span style={{ fontSize: '25px', textDecorationLine: 'underline' }}>Actors:</span>  {data.Actors}</h5></div>
                <div className='py-2'> <h5> <span style={{ fontSize: '25px', textDecorationLine: 'underline' }}>Released:</span>  {data.Released}</h5></div>
                <div className='py-2'> <h5> <span style={{ fontSize: '25px', textDecorationLine: 'underline', paddingBottom: '50px' }}>Director:</span>  {data.Director}</h5></div>
                <div>
                  <button onClick={(e) => { navigate(-1) }} className='btn btn-info my-3 px-4 fs-5 fw-bold d-lg-none' style={{ fontFamily: 'monospace' }}>back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
