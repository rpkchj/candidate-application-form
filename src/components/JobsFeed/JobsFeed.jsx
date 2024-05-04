/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./jobsfeed.css"
import { getJobs } from '../../services/jobService'
import { useDispatch, useSelector } from 'react-redux'
import { clearJobs, storeJobs } from '../../slice/jobSlice'
import ButtonCommon from '../common/Button/Button'
import CardCommon from '../common/Card/Card'

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
    </div>
    
  )
}

export default JobsFeed

export const CardContentComponent = ({job}) => {
  return (
    <>
      <div>
       <div className='company__header'>
          <img src={job?.logoUrl} alt="Company Logo" />
          <div className='company__job__details'>
            <p>{job?.companyName}</p>
            <p>{job?.jobRole}</p>
            <p>{job?.location}</p>
          </div>
       </div>
      <p>Estimated Salary: {job.minJdSalary ?? "N/A"} - {job.maxJdSalary ?? "N/A"} LPA</p>
      <div>
        {/* about company jd */}
        <div className='short__job__description'>
          {job?.jobDetailsFromCompany}
        </div>
        <button className='view__more__btn'>View More</button>
      </div>
      <div>
        <p>Minimum Experience</p>
        <p>{job.minExp ?? "-"}</p>
      </div>
      <div>
        <ButtonCommon className={"easy__apply__btn"} text={"Easy Apply"} variant={"contained"}/>
        <ButtonCommon className={"referral__btn"} text={"Ask For Referral"} variant={"contained"}/>
      </div>
      </div>
    </>
  )
}