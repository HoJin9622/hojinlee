'use client'

import Image from 'next/image'
import { AiFillGithub } from 'react-icons/ai'
import { ImMail4 } from 'react-icons/im'

export default function Profile() {
  const onGithubClick = () => {
    window.open('https://github.com/HoJin9622', '_blank')
  }

  const onMailClick = () => {
    window.open('mailto:kiss0104040@gmail.com')
  }

  return (
    <div className='py-6 md:flex md:items-center md:justify-between'>
      <div className='flex items-center gap-5'>
        <Image
          className='h-12 w-12 rounded-full'
          src='/images/avatar.jpg'
          width={48}
          height={48}
          alt='avatar'
        />
        <div>
          <div className='text-xl font-medium md:text-4xl'>Jin</div>
          <div className='text-gray-500'>Frontend Web Developer</div>
        </div>
      </div>

      <div className='mt-5 flex items-center gap-2 md:mt-0'>
        <button
          aria-label='github'
          type='button'
          onClick={onGithubClick}
          className='flex h-9 w-9 items-center justify-center overflow-hidden rounded-full'
        >
          <AiFillGithub size={36} />
        </button>
        <button
          aria-label='mail'
          type='button'
          onClick={onMailClick}
          className='flex h-9 w-9 items-center justify-center overflow-hidden rounded-full'
        >
          <ImMail4 size={32} />
        </button>
      </div>
    </div>
  )
}
