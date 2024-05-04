import React from 'react'
import "./filterfields.css"
import SelectDropdown from '../common/SelectDropdown/SelectDropdown'

const FilterFields = () => {
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
    other_engineering:["Hardware", "Mechanical", "Systems"],
    business_analyst:["Business Analyst"],
    data_analyst:["Data Analyst"],
    project_manager:["Project Manager"],
    management:["Management"],
    legal:["Legal"],
    hr:["Hr"],
    finance:["Finance"]
  }
  const experience = []
  const minBasePay = []
  for(let i =1; i <= 10; i++){
    experience.push(i)
  }
  for(let i= 0; i <=7; i++){
    minBasePay.push(`${i*10}L`)
  }

  return (
    <div>
      {/* <SelectDropdown dataset={techStack} label={"Tech Stack"}/> */}
    </div>
  )
}

export default FilterFields