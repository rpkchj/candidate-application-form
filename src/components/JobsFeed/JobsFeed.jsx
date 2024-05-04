/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./jobsfeed.css"
import { getJobs } from '../../services/jobService'
import { useDispatch } from 'react-redux'
import { storeJobs } from '../../slice/jobSlice'

const JobsFeed = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const callToGetJobsList = async() => {
    setIsLoading(true)
    try {
      const resp = await getJobs(page)
      if(resp?.jdList.length > 0){
        dispatch(storeJobs(resp?.jdList))
      }
    } catch (error) {
      
    }finally{
      setIsLoading(false)
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    setPage(prevState => prevState + 1)
    callToGetJobsList();
  };

  useEffect(() => {
    callToGetJobsList()
  },[])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div>JobsFeed</div>
  )
}

export default JobsFeed