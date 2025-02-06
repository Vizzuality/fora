import React from 'react'

const MyProjectsSentence: React.FC<SentenceProps> = ({type}) => {
  
  return (
    <div className='relative text-sm font-semibold text-grey-20 min-h-[16px]'>

     <>
        <div className='inline mr-2 text-[32px] font-display font-thin text-black'>
            An overview of all your Projects
        </div>
     </> 
    </div>
  )
}

export default MyProjectsSentence
