import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectDetails } from 'store/projects/projectFormSlice';


const ProjectDetails = () => {
  const dispatch = useDispatch();
  const projectDetails = useSelector((state: RootState) => state.projectForm.projectDetails);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  dispatch(updateProjectDetails({ [e.target.name]: e.target.value }));
}
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <input
          name="name"
          value={projectDetails.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={projectDetails.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default ProjectDetails
