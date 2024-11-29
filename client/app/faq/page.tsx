"use client";

import { useState } from "react";
import Link from "next/link";
import { faq } from "@/datalists/faq";
import { Mail } from "lucide-react"

export default function Faq() {
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({});

  const handleAccordion = (id: number) => {
    setOpenAccordions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <main>
      <div className="relative mt-[4.3rem]">
        <div className="w-full bg-black dark:opacity-40">
          <img
            src="/about-us-hero-section.png"
            alt="FAQ hero section"
            className="w-full h-96 object-cover object-center"
          />
        </div>
        <div className="absolute w-full px-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-xl font-medium">FAQ</h1>
          <p className="mt-2 text-4xl text-gray-300 font-bold leading-10 tracking-tight sm:text-5xl sm:leading-none">Frequently Asked Questions</p>
        </div>
      </div>

      <div id="accordion-collapse" data-accordion="collapse" className="max-w-4xl mx-auto my-10 px-5 text-center">
        {faq.map(item => (
          <div key={item.id}>
            <h2 id={`accordion-collapse-heading-${item.id}`} onClick={() => handleAccordion(item.id)}>
              <div
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 bg-gray-5 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                aria-expanded={openAccordions[item.id] || false}
                aria-controls={`accordion-collapse-body-${item.id}`}
              >
                <span className="text-lg text-medium">{item.question}</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 ${openAccordions[item.id] ? '' : 'rotate-180'} shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>
              </div>
            </h2>
            <div
              id={`accordion-collapse-body-${item.id}`}
              className={`${openAccordions[item.id] ? 'block' : 'hidden'}`}
              aria-labelledby={`accordion-collapse-heading-${item.id}`}
            >
              <div className="text-justify p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                {item.answer.map((answer, index) => (
                  <p key={index} className="mb-2 text-gray-500 dark:text-gray-400">
                    {answer}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto my-10 px-5 text-center">
        <div className="flex gap-1 justify-center items-center">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
        </div>
        <h2 className="mt-5 text-2xl md:text-3xl font-medium text-[#6D28D9]">Still have questions?</h2>
        <p className="mt-2 text-gray-500">
          If you have any other questions or feedback, feel free to reach out to us. We're here to help! Mail us at <strong className="text-[#6D28D9] underline">ranjansinhaharikesh@gmail.com</strong> or click on the button below to send us an email.
        </p>
        <Link
          href="mailto:ranjansinhaharikesh.gmail.com"
          className="mt-4 inline-block px-4 py-2 text-white bg-[#6D28D9] rounded-md hover:bg-[#6D28D9] dark:hover:bg-[#6D28D9]">
          <Mail className="w-5 h-5 inline-block -mt-1 mr-2" />
          Mail Us
        </Link>
      </div>
    </main>
  );
}
