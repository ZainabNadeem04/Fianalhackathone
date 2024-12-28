import React from 'react'

export default function Contactus() {
  return (
    <>
     
    <div className="bg-gray-900 text-white py-16 ">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4 " id="contactus">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">We’d love to hear from you</h2>
          <div className="w-16 h-16 flex items-center justify-center mb-6">
            <div className="border-2 border-white rounded-full p-8"></div>
          </div>
          <p className="text-sm">
            Privacy Policy · Modern Slavery Statement · Social Impact Statement
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-white text-black rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Contact us</h3>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
            >
              Submit →
            </button>
          </form>
          <div className="mt-6 text-sm">
            <p>
              <strong>Email us:</strong> enquiries@glassmoon.co
            </p>
            <p className="flex space-x-4 mt-2">
              <a href="#" className="hover:underline">
                Instagram
              </a>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  



    </>
  )
}
