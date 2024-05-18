import React, { useEffect, useState } from 'react';
import Jobs from './Jobs';
import Banner from '../components/Banner';
import Card from '../components/Card';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory,setselectedCategory]=useState(null);
  const[jobs,setjobs]=useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(()=>{
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs").then(res=>res.json()).then(data=>{
      //console.log(data)
      setjobs(data);
      setIsLoading(false)
    })
  },[])
   //console.log(jobs)
   //HandleInputChange
    const [query,setQuery] =useState("");
    const handleInputChange=(event)=>{
        setQuery(event.target.value)
    }
//filter jobs by title
const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//console.log(filteredItems)
//Radio Filtering
const handleChange = (event) => {
  setselectedCategory(event.target.value)
}//button filtering
const handleClick = (event) =>{
  setselectedCategory(event.target.value)
}

//calculate the index page
 const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex, endIndex};
   }
//function for the next Page
const nextPage = () => {
  if(currentPage < Math.ceil(filteredItems.length/itemsPerPage)){
    setCurrentPage(currentPage +1);
  }
}
//function for the previous page
  const prevPage = () => {
    if(currentPage >1){
      setCurrentPage(currentPage - 1);
    }
  }

//main func
const filteredData = (jobs,selected,query)=>{
  let filteredJobs=jobs;
  //filtered binput items
  if(query){
    filteredJobs=filteredItems;
  }
  //category filtering
  if(selected){
    filteredJobs=filteredJobs.filter(
      ({jobLocation,maxPrice,experienceLevel,salaryType,employmentType,postingDate
      })=> 
      jobLocation.toLowerCase() === selected.toLowerCase() ||
      parseInt(maxPrice) <= parseInt(selected) ||
      postingDate >= selected ||
      experienceLevel.toLowerCase() === selected.toLowerCase() ||
      salaryType.toLowerCase() === selected.toLowerCase() ||
      employmentType.toLowerCase() === selected.toLowerCase() 
    );
    console.log(filteredJobs);
  }
  //slice the data based on current page
  const {startIndex,endIndex}= calculatePageRange();
  filteredJobs = filteredJobs.slice(startIndex, endIndex);
  return filteredJobs.map((data,i)=> <Card key={i} data={data}/> )
}
const result=filteredData(jobs,selectedCategory,query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange}/>
      {/*main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/*left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick}/>
        </div>
        {/*job cards */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
        {
          isLoading ? (<p className='font-medium'>Loading...</p>) : result.length > 0 ? (<Jobs result={result}/>) :<>
          <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
          <p>No data found!</p>
          </>
        }
        {/*Pagination here*/}
        {
          result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage === 1}
              className="hover:underline">Previous</button>
              <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)} </span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>Next</button>
            </div>
          ) : ""
        }
        </div>
        {/*right side */}
        <div className='bg-white p-4 rounded'><Newsletter/></div>
        </div>
    </div>
 
  );

  };
export default Home;