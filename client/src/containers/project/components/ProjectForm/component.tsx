import { useMutation, useQuery } from '@tanstack/react-query';
import { useProject } from 'hooks/projects';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetForm } from 'store/projects/projectFormSlice';

const STEP_COMPONENTS = [
  ProjectDetailsStep,
  ContactDetailsStep,
  FocusAreasStep,
  FundingStep
];

interface ProjectFormProps {
  isEdit?: boolean;
  projectId?: string;
}
const ProjectForm = ({isEdit = false, projectId}: ProjectFormProps) => {

  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.projectForm.currentStep);

  const {data: projectData, isLoading} = useProject(projectId, {enabled: isEdit && !!projectId});

  useEffect(() => {
    if(isEdit && projectData){
      dispatch(setFormData(projectData));
    }

    return () => { if(!isEdit) dispatch(resetForm()) };
  }, [dispatch, isEdit, projectData]);

  const mutationOptions = {
    onSuccess: () => dispatch(resetForm()),
    onError: (error: Error) => console.error('Submission error.', error)
  }

  const createMutation = useMutation(, mutationOptions);


  return (
    <div>
      
    </div>
  )
}

export default ProjectForm
