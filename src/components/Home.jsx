import React, { useEffect, useRef, useState } from 'react'
import Carusel from './Carusel'
import axios, { all } from 'axios';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import './style.css'
import Select from 'react-select'

export default function Home() {

  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(false)
  const { searchData, searchYears } = useParams();
  const location = useLocation();
  const yearsData = useRef();
  const [yearsList, setYearsList] = useState([])
  const navigate = useNavigate();

  let getData = async function () {
    let { data } = await axios.get(`https://www.omdbapi.com/?s=${searchData ? searchData : 'spider-man'}${searchYears ? '&y=' + searchYears : ''}&apikey=64dc74b3`);
    setData(data.Search);
    console.log(data.Search);
    setEmpty(data.Search?.length ? false : true)
  }

  useEffect(() => {
    getData();
  }, [location])

  useEffect(() => {
    let temp_ar = [];
    for (let index = 1950; index <= (new Date()).getFullYear(); index++) {
      temp_ar.push({
        label: index,
        value: index
      })
    }
    setYearsList(temp_ar)
  }, [])

  return (
    <div>
      <Carusel />

      <div className='d-flex justify-content-between align-items-center mb-5 my-1 my-lg-4'>
        <div className='d-none d-lg-flex list-unstyled text-white px-5 ms-5 col-lg-8 col-xl-9'>
          <h5 className=''>Top years:</h5>
          <p ref={yearsData} className='years_list px-3'><Link to={`/search/${searchData || "spider-man"}/year/1989`}>1989</Link></p>
          <p ref={yearsData} className='years_list px-3'><Link to={`/search/${searchData || "spider-man"}/year/1995`}>1995</Link></p>
          <p ref={yearsData} className='years_list px-3'><Link to={`/search/${searchData || "spider-man"}/year/2000`}>2000</Link></p>
          <p ref={yearsData} className='years_list px-3'><Link to={`/search/${searchData || "spider-man"}/year/2020`}>2020</Link></p>
          <p ref={yearsData} className='years_list px-3'><Link to={`/search/${searchData || "spider-man"}/year/2021`}>2021</Link></p>
          <p ref={yearsData} className='years_list px-3'><Link to={`/search/${searchData || "spider-man"}/year/2023`}>2023</Link></p>
        </div>
        <div className='container fs-6 col-5 col-lg-3 col-xl-2'>
          <Select onChange={item => {
            navigate(`/search/${searchData || "spider-man"}/year/${item.value}`);
          }} options={yearsList} className='text-center'>
          </Select>
        </div>
        <div className='my-3 col-7 col-md-5'><SearchInput /></div>
      </div>

      {empty && <div style={{ height: '400px' }}> <h1 className='text-white text-center pt-5'>no results. . .</h1></div>}
      <div className='d-flex flex-wrap justify-content-center mt-1' style={{ marginLeft: '100px', marginRight: '100px' }}>
        {data ? data.map((value, i) => {
          return (
            <div key={i} className=' mx-1 mb-5'>
              <Link to={`/moviedeatels/${value.imdbID}`}><img className='hoverImage' style={{ borderRadius: '10px', height: '400px', width: '280px', transition: '.2s' }} src={value.Poster} onError={(e) => e.target.style.display = 'none'} /></Link>
            </div>
          )
        }) : empty}
      </div>

    </div >
  )
}
