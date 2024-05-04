import React from 'react'
import "./filterfields.css"
import SelectDropdown, { GroupedSelectDropDown } from '../common/SelectDropdown/SelectDropdown'
import InputTextField from '../common/InputTextField/InputTextField'

const FilterFields = () => {
  // -----------------------Data for the Dropdowns---------------------------
  const numOfEmployees = ["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+"]

  const jobType = ["Remote", "Hybrid", "In-office"]

  const techStack = ["Python", "Java", "C++", "GoLang", "Kotlin", "Ruby/Rails", "Django", "C#", "Flask", "GraphQL", "TypeScript", "AWS", "JavaScript", "Rust", "NodeJS", "React"]
  
  const roles = {
    engineering: ["Backend", "Frontend", "FullStack", "IOS", "Flutter", "React Native", "Android", "Tech Lead", "Dev-Ops", "Data Engineer", "Data Science", "Computer-Vision", "Nlp", "Deep-Learning", "Test / Qa", "Web3", "SRE", "Data-Infrastructure"],
    design:["Designer", "Design Manager", "Graphic Designer", "Product Designer"],
    product:["Product Manager"],
    operations:["Operations Manager", "Founder's Office / Chief of Staff"],
    sales:["Sales Development Representative", "Account Executive", "Account Manager"],
    marketing:["Digital Marketing Manager", "Growth Hacker", "Marketing", "Product Marketing Manager"],
    "other engineering":["Hardware", "Mechanical", "Systems"],
    "business analyst":["Business Analyst"],
    "data analyst":["Data Analyst"],
    "project manager":["Project Manager"],
    management:["Management"],
    legal:["Legal"],
    hr:["Hr"],
    finance:["Finance"]
  }
  const experience = []
  const minBasePay = []
  
  //using these two for loops to populate the data in the array 
  for(let i =1; i <= 10; i++){
    experience.push(i)
  }

  for(let i= 0; i <=7; i++){

    minBasePay.push(`${i*10}L`)
  }
// -----------------------Data for the Dropdowns---------------------------


  const getTechStack = (e, newVal) => {
    console.log("tech stack --> ", newVal)
  }

  const getCompanyName = (e) => {
    console.log("company name -->", e.target.value)
  }

  return (
    <div className='fieldset__container'>
      <div className='fieldset'>
      <GroupedSelectDropDown className={"filter__fields"} dataset={roles}/>
      <SelectDropdown className={"filter__fields"} dataset={techStack} label={"Tech Stack"} onChange={getTechStack} />
      <SelectDropdown className={"filter__fields"} dataset={numOfEmployees} label={"Number of Employees"}/>
      <SelectDropdown className={"filter__fields"} dataset={jobType} label={"Remote"} />
      <SelectDropdown className={"filter__fields"} dataset={experience} label={"Experience"} multiple={false} />
      <SelectDropdown className={"filter__fields"} dataset={minBasePay} label={"Minimum Base Salary"} multiple={false} />
      <SelectDropdown className={"filter__fields"} dataset={minBasePay} label={"Minimum Base Salary"} multiple={false} />
      <InputTextField className={"filter__fields input__field"} label={"Search Company Name"} onChange={getCompanyName}/>
      </div>    
    </div>
  )
}

export default FilterFields