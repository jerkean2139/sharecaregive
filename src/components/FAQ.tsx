import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
}

export function FAQ({ title = "Frequently Asked Questions", faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-md">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-8">
          {title}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-[#00304f]">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={`w-6 h-6 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`px-6 pt-0 pb-4 transition-all duration-200 overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                aria-hidden={openIndex !== index}
              >
                <div className="text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
