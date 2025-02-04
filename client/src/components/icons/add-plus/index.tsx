import {FC, SVGProps } from 'react';

const AddPlusIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 18H13C14.1046 18 15 17.1046 15 16C15 14.8954 14.1046 14 13 14H11C9.89543 14 9 14.8954 9 16C9 17.1046 9.89543 18 11 18Z"
        fill="#212121"
      />
    </svg>
  );
}

export default AddPlusIcon
