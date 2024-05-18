import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PageHeader from '../components/PageHeader';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: 'url',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL',
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <h2>Job Details: {id} </h2>
      <PageHeader title={job.jobTitle} path={'single job'} />
      <h1>{job.jobTitle}</h1>
      <p><strong>Company:</strong> {job.companyName}</p>
      <p><strong>Location:</strong> {job.jobLocation}</p>
      <p><strong>Salary:</strong> {job.minPrice}-{job.maxPrice}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <button className="bg-blue px-8 py-2 text-white" onClick={handleApply}>
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
