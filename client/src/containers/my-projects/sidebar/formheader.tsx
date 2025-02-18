interface FormHeaderComponentProps {
  onSubmit: () => void;
}

export default function FormHeaderComponent({ onSubmit }: FormHeaderComponentProps) {
  return (
    <div className="flex flex-col justify-between my-3 md:flex-row px-10 pt-4">
      <div className="my-3 lg:text-center text-left">
        <h1 className="font-normal text-[20px] lg:text-[32px] py-3 md:py-0 font-display tracking-normal">
          Add or update project details
        </h1>
      </div>
      <div className="grid justify-center grid-cols-2 gap-2 md:flex md:flex-row place-content-center">
        <div>
          <button className="p-2 border rounded-md">Preview Project Page</button>
        </div>
        <div>
          <button className="p-2 border rounded-md">Report Funding</button>
        </div>

        <div>
          <button onClick={onSubmit} className="p-2 border rounded-md bg-green-0">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
