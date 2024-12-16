import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import events from "./eventData"; // Import the event data

gsap.registerPlugin(ScrollTrigger);

const Event = () => {
  return (
    <>
      {/* HeroCard Section */}
      <div className="flex justify-center items-center w-full my-0">
        <HeroCard />
      </div>

      {/* Events */}
      <div className="events-box flex flex-wrap justify-center mx-2 mt-10 mb-20 gap-6 sm:gap-8">
        {events.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

// HeroCard component
const HeroCard = () => {
  return (
    <div className="card bg-white w-full sm:max-w-xs md:max-w-sm lg:max-w-[1000px] xl:max-w-[1200px] h-auto rounded-[16px] border shadow-md border-gray-200 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
      {/* Hero Image */}
      <div
        className="mb-4 contact-hero flex items-center justify-center rounded-lg bg-cover bg-center bg-no-repeat w-full h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
        style={{
          backgroundImage: `url("/Events/event-img.png")`, // Background image for the HeroCard
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="event-heading text-3xl sm:text-5xl lg:text-6xl font-semibold text-white"></h1>
      </div>

      {/* HeroCard Description */}
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center">
          Events
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700">
          Stay updated on events and initiatives, from health camps to
          community outreach programs and internships. Join us as we bring
          positive change through impactful events and activities.
        </p>
      </div>
    </div>
  );
};

// Single event card component (existing)
const Card = ({ event }) => {
  return (
    <div className="card bg-white w-full sm:max-w-xs md:max-w-sm lg:w-[386.67px] h-auto rounded-[16px] border shadow-md border-gray-200 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* Event Image */}
      <div className="h-48 lg:h-56 mb-4 rounded-lg overflow-hidden relative">
        <img
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          src={event.image}
          alt={event.title}
        />
      </div>

      {/* Event Description */}
      <div className="flex flex-col justify-between flex-grow">
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">{event.title}</h3>

        {/* Date and Time */}
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <p className="event-date">{event.date}</p>
          <p className="event-time">Time: {event.time}</p>
        </div>

        <p className="event-content text-sm sm:text-base text-gray-700 mb-4">{event.description}</p>

        {/* Show Interest button */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition duration-300 ease-in-out hover:bg-blue-700"
          >
            Show Interest
          </button>
        </div>
      </div>
    </div>
  );
};

// GSAP animations for the event cards
gsap.from(".card", {
  opacity: 0,
  y: 30,
  scale: 0.9,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".card",
    scroller: "body",
    start: "top bottom", // start animation when the card is in the viewport
    end: "bottom top", // end animation when the card leaves the viewport
    scrub: 1,
  },
});

// Parallax Effect on Event Images
gsap.to(".card img", {
  y: -50,
  scale: 1.05,
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".card",
    scroller: "body",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

// Fade out the event heading when scrolling
gsap.to(".event-heading", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".events-box",
    scroller: "body",
    scrub: 1,
  },
});

export default Event;
