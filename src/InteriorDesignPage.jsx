import React, { useState } from "react";
import Navbar from "./Navbar";
import Contactus from "./Contactus";

const InteriorDesignPage = () => {
  
        const [showMore, setShowMore] = useState(false);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        const handleToggle = () => {
          setShowMore(!showMore);
        };

        const toggleMobileMenu = (isOpen) => {
          setIsMobileMenuOpen(isOpen);
        };
      

    const sections = [
        {
          id: 1,
          title: "Smart Note-Taking",
          description:
            "Say goodbye to cluttered notebooks and scattered thoughts! Our platform offers an intuitive and user-friendly interface for creating, editing, and organizing your study notes.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-0fC0ZCk2dXIbuW2f0AFfh9SXjYKncFMxA&s", // Replace with the correct image URL
        },
        {
          id: 2,
          title: "Collaborative Learning",
          description:
            "Learning is better together! Our platform enables seamless collaboration, allowing you to share notes with friends, classmates, or study groups.",
          image: "https://static.vecteezy.com/system/resources/thumbnails/002/216/681/small_2x/a-man-wearing-mask-sitting-over-the-tower-of-books-while-working-or-studying-through-online-internet-in-covid19-corona-virus-outbreak-situation-social-distancing-e-learning-online-education-free-vector.jpg", // Replace with the correct image URL
        },
        {
          id: 3,
          title: "Advanced Search and Categorization",
          description:
            "Never lose track of your study materials again! Our advanced search and categorization tools let you organize notes by subjects, topics, or tags.",
          image: "https://static.vecteezy.com/system/resources/thumbnails/015/628/476/small_2x/young-people-reading-books-next-to-big-open-paper-hardback-book-study-learning-knowledge-and-education-concept-flat-free-vector.jpg", 
        },
      ];
    

  return (
    <div className="font-sans">
    
    <Navbar onMobileMenuToggle={toggleMobileMenu} />
        <div
      className={`font-sans ${isMobileMenuOpen ? "mt-80" : ""}`}
      style={{ transition: "margin-top 0.3s" }}
    >
      {/* Hero Section */}
     <section className="relative bg-gray-900 text-white" id="home">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60" style={{ backgroundImage: 'url("https://images.stockcake.com/public/8/8/5/88559a73-51bd-427e-9582-243c1586c95d_large/library-study-session-stockcake.jpg")' }}></div>
        <div className="relative flex flex-col items-center justify-center h-screen px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          Welcome to StudySync
          </h1>
          <p className="mt-4 text-lg text-gray-300">
          At StudySync, we believe learning is better together. Our platform is designed to help you and your peers
           create, share, and manage study notes seamlessly. Say goodbye to
           scattered notes and missed study material and make learning collaborative and efficient.
          </p>
         
        </div>
      </section>

      {/* About Us Section */}
      <section
  className="px-6 py-16 bg-white text-center md:px-12 lg:flex lg:items-center lg:text-left mt-20 "
  id="hello"
>
<div className="flex flex-col lg:flex-row items-center gap-10">
  <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
    <img
      src="https://img.freepik.com/free-vector/hand-drawn-college-entrance-exam-illustration_23-2150359350.jpg"
      alt="Interior design"
      className="rounded shadow-lg mx-auto max-w-full h-auto"
    />
  </div>
  <div className="lg:w-1/2">
    <h2 className="text-3xl font-bold md:text-4xl">
    Our Mission
    </h2>
    <p className="mt-4 text-gray-600">
    At StudySync, we know that good notes are the cornerstone of effective learning. Our mission is to transform 
    the way students and professionals create, share, and manage their study materials.
    </p>

    {showMore && (
      <p className="mt-4 text-gray-600">
 Whether you're preparing for exams, collaborating on group projects,
  or just organizing your thoughts, we've got you covered.
      </p>
    )}

    <button
      className="mt-6 px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700"
      onClick={handleToggle}
    >
      {showMore ? "Show Less" : "Read More"}
    </button>
  </div>
</div>

  {/* Updated image container */}
 
</section>

  
     
      {/* Why Us Section */}
       <section className="px-6 py-16 bg-gray-900  text-white mt-40" id="whyus"  style={{ backgroundImage: 'url("https://c0.wallpaperflare.com/preview/700/360/51/bible-wallpaper-devotional-bible-study-thumbnail.jpg")' }}>
        <h2 className="text-3xl font-bold text-center md:text-4xl">
          Why Us?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Creative Excellence</h3>
            <p className="mt-2 text-gray-400">
            Our designs blend art, innovation, and practicality.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Personalized Service</h3>
            <p className="mt-2 text-gray-400">
            Every client is unique, and so is every project.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Attention to Detail</h3>
            <p className="mt-2 text-gray-400">
            We focus on even the smallest elements to create perfection.
            </p>
          </div>
        </div>
      </section>  

      {/* //  Services Section  */}
      <section className="px-6 py-16 bg-white" id="services">
      <div className="font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col gap-10 md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center my-10`}
          >
            <div className="md:w-1/2">
              <img
                src={section.image}
                alt={section.title}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-10 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800">
                0{section.id} / {section.title}
              </h3>
              <p className="text-gray-600 mt-4">{section.description}</p>
             {showMore && (
          <p className="mt-4 text-gray-600">
           Whether you're preparing for exams, collaborating on group projects,
           or just organizing your thoughts, we've got you covered.
        </p>
      )}

      <button
        className="mt-6 px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700"
        onClick={handleToggle}
      >
        {showMore ? "Show Less" : "Read More"}
      </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </section>
      <Contactus/>
      
    </div>
    </div>
   
  );
};

export default InteriorDesignPage;
