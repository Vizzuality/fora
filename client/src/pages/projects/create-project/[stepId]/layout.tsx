'use client';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { resetForm } from 'store/projects/projectFormSlice';

import ProjectBreadcumb from 'containers/project/new/breadcumb/component';
import StepperSidebar from 'containers/projects/sidebar/component';
import Wrapper from 'containers/wrapper';

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetForm());
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <ProjectBreadcumb />
      <div className="flex min-h-screen">
        <StepperSidebar />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </Wrapper>
  );
}
