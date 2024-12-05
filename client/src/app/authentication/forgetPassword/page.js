import SubNewsLatter from '@/app/components/SubNewsLatter'
import Link from 'next/link'

export default function PasswordReset() {
  return (
    <div className="  px-4 sm:px-6 lg:px-8 py-2">
      <div className=" max-w-6xl space-y-8 p-2 mx-auto">
        {/* <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>&gt;</span>
          <Link href="/account" className="hover:text-gray-700">My account</Link>
          <span>&gt;</span>
          <span className="text-gray-700">Lost password</span>
        </nav> */}

        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Lost password
        </h2> */}

        <p className="mt-2 text-sm text-gray-600">
          Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
        </p>

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-500">
              Username or email <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border bg-bgInput border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
          <Link href='/authentication/confirmChange'>
            <button
              type="submit"
              className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Reset password
            </button>
            </Link>
          </div>
        </form>
      </div>
      <SubNewsLatter />
    </div>
  )
}

