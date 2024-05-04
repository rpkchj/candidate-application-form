/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./jobsfeed.css"
import { getJobs } from '../../services/jobService'
import { useDispatch, useSelector } from 'react-redux'
import { clearJobs, storeJobs } from '../../slice/jobSlice'
import ButtonCommon from '../common/Button/Button'
import CardCommon from '../common/Card/Card'
import Loader from '../common/Loader/Loader'

const JobsFeed = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const jobList = useSelector(state => state.jobSlice.jobs)

  console.log("jobList", jobList)

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
    dispatch(clearJobs())
    callToGetJobsList()
  },[])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className='job__feed'>
     {jobList.map(job => {
      return <CardCommon className={"job__card"} cardContent={<CardContentComponent job={job}/>}/>
     })}
     {isLoading && <Loader/>}
    </div>
    
  )
}

export default JobsFeed

export const CardContentComponent = ({job}) => {
  return (
    <>
      <div>
       <div className='company__header'>
          <img src={job?.logoUrl} alt="Company Logo" className='company__logo'/>
          <div className='company__job__details'>
            <p className='company__name'>{job?.companyName}</p>
            <p className='job__role'>{job?.jobRole}</p>
            <p className='job__location'>{job?.location}</p>
          </div>
       </div>
      <p className='estimated__salary'>Estimated Salary: {job.minJdSalary ?? "N/A"} - {job.maxJdSalary ?? "N/A"} LPA</p>
      <div>
        {/* about company jd */}
        <div className='short__job__description'>
          <p className='description__header'>About Company:</p>
          {job?.jobDetailsFromCompany}
        </div>
        <div className='view__more__section'>
          <button className='view__more__btn'>View More</button>
        </div>
      </div>
      <div className='experience__section'>
        <p className='min__exp__label'>Minimum Experience</p>
        <p className='min__exp__req'>{job.minExp ?? "-"} years</p>
      </div>
      <div>
        <ButtonCommon className={"easy__apply__btn"} text={"Easy Apply"} variant={"contained"}/>
        <ButtonCommon className={"referral__btn"} text={"Ask For Referral"} variant={"contained"}/>
      </div>
      </div>
    </>
  )
}