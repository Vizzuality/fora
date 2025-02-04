import StepperSidebar from 'containers/projects/sidebar/component_old';
export default function ProjectLayout({children}: {children: React.ReactNode}){
  return (
    <div className='flex'>
        <StepperSidebar/>
        <main className='flex-1 p-8 bg-gray-50'>{children}</main>
    </div>
  )
}