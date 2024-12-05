import SubNewsLatter from '@/app/components/SubNewsLatter'
import React from 'react'

const page = () => {
  return (
    <div>
            <div className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="border border-gray-400 rounded-sm p-3 text-gray-500">
          Password reset email has been sent.
        </div>
        
        <p className="text-gray-500 leading-relaxed text-sm">
          A password reset email has been sent to the email address on file for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.
        </p>
      </div>
      <SubNewsLatter />
    </div>
  )
}

export default page
  