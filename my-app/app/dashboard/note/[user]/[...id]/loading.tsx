import React from 'react'

const Loading = () => {
  return (
    <div className='w-full min-h-screen p-4 flex flex-col items-center justify-center'>
      <div className='max-w-4xl w-full flex items-center justify-between '>
        <button className='rounded-lg w-16 animate-pulse dark:text-dark-btn dark:bg-dark-btn px-4 py-2'>.</button>
        <button className='rounded-lg w-16 animate-pulse dark:text-dark-btn dark:bg-dark-btn px-4 py-2'>.</button>
      </div>
        <article className='max-w-4xl w-full flex flex-col items-center  min-h-screen rounded-2xl border mt-10 px-4 py-6 dark:border-dark-btn'>
        <span className='h-10 w-full  px-2 dark:bg-dark-btn animate-pulse dark:text-dark-btn'>...</span>
        </article>
    </div>
  )
}

export default Loading