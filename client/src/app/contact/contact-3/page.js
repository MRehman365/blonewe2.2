import Features from "@/app/components/Features";
import SubNewsLatter from "@/app/components/SubNewsLatter";
import { CiLock } from "react-icons/ci";
import { LuBuilding2 } from "react-icons/lu";


export default function ContactForm() {
  return (
    <div>
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 bg-bgInput text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 bg-bgInput text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 bg-bgInput text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your message
              </label>
              <textarea
                id="message"
                className="min-h-[150px] w-full rounded-md border border-gray-300 px-3 py-2 bg-bgInput text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white "
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="space-y-8 flex flex-col justify-center">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <LuBuilding2 className="h-5 w-5 text-red-500" />
              Store Contact
            </h3>
            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <p>Germany — 785 15h Street, Office 478/B</p>
              <p>Green Mall Berlin, De 81566</p>
              <p className="mt-4 font-medium">+02 1234 567 88</p>
              <a href="mailto:info@example.com" className="text-primary hover:underline">
                info@example.com
              </a>
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <CiLock className="h-5 w-5 text-red-500" />
              Opening Hours
            </h3>
            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <p>Monday - Friday : 9am - 5pm</p>
              <p>Weekend Closed</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Features />
      <SubNewsLatter />
    </div>
  )
}

