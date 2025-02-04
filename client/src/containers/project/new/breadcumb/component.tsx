import React from 'react';

const ProjectBreadcumb = () => {
  return (
    <div className="flex flex-col md:flex-row  justify-between my-2">
      <div className="my-3 text-center">
        <h1 className="font-normal text-[32px] py-3 md:py-0 font-display tracking-normal">Add or update project details</h1>
      </div>
      <div className="md:flex md:flex-row grid grid-cols-2 place-content-center justify-center gap-2">
        <div>
          <button className="rounded-md p-2 border">Preview Project Page</button>
        </div>
        <div>
          <button className="rounded-md p-2 border">Report Funding</button>
        </div>

        <div>
          <button className="rounded-md p-2 border bg-green-0">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectBreadcumb;
