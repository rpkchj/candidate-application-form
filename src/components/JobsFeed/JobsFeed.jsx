import React, { useEffect, useState } from 'react'
import "./jobsfeed.css"
import { getJobs } from '../../services/jobService'
import { useDispatch, useSelector } from 'react-redux'
import { clearJobs, storeJobs } from '../../slice/jobSlice'
import ButtonCommon from '../common/Button/Button'
import CardCommon from '../common/Card/Card'
import Loader from '../common/Loader/Loader'
import { Avatar } from '@mui/material'
import DialogBox from '../common/DialogBox/DialogBox'

const JobsFeed = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const jobList = useSelector(state => state.jobSlice.jobs)

  // function to call API
  const callToGetJobsList = async() => {
    
    setIsLoading(true)
    try {
      const resp = await getJobs(page) //service function that actually implements the API. Takes in the offset as a parameter as we need to increase it to get more data
      if(resp?.jdList.length > 0){
        dispatch(storeJobs(resp?.jdList))
      }
    } catch (error) {
      
    }finally{
      setIsLoading(false)
    }
  }

  //This is the function that handles the infinite scrolling feature
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    setPage(prevState => prevState + 1)
    callToGetJobsList();
  };

  //this useEffect is for the initial data from API
  useEffect(() => {
    dispatch(clearJobs()) //making sure to clear the state when page refreshes otherwise it will keep appending to old previous data.
    callToGetJobsList()
  },[])

  // This useEffect runs when the user scrolls to the bottom of the page and when the isLoading state is changed. This fires the scroll handling function
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

//this component represents the details of the single job which gets rendered in the Card Component
export const CardContentComponent = ({job}) => { 
  const [openViewMore, setOpenViewMore] = useState(false)

  // this mini component is for the dialog box which opens with the full job description
  const FullJobDescription = () => {
    return (
      <div className='view__more__dialog'>
        {job?.jobDetailsFromCompany}
      </div>
    )
  }

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
          <p className='description__header'>Job Description:</p>
          {job?.jobDetailsFromCompany}
        </div>
        <div className='view__more__section'>
          <button className='view__more__btn' onClick={() => setOpenViewMore(true)}>View More</button>
        </div>
      </div>
      <div className='experience__section'>
        <p className='min__exp__label'>Minimum Experience</p>
        <p className='min__exp__req'>{job.minExp ?? "-"} years</p>
      </div>
      <div>
        <ButtonCommon className={"easy__apply__btn"} text={"⚡ Easy Apply"} variant={"contained"}/>
        <ButtonCommon className={"referral__btn"} text={<p style={{display:'flex', flexDirection: 'row', alignItems:'center'}}><Avatar sx={{height:'25px', width: "25px", margin: '0 0.2rem'}} src="/broken-image.jpg"/> Ask For Referral</p>} variant={"contained"}/>
      </div>
      </div>
      <DialogBox dialogTitle={"Job Description"} dialogContent={<FullJobDescription/>} openDialog={openViewMore} closeDialogMethod={() => setOpenViewMore(false)} />
    </>
  )
}