import{ useState } from "react";

function FAQItem({ question, answer }:any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex justify-between items-start">
        <p className="font-medium text-xl leading-7 text-[#010314] flex-1 pr-4">
          {question}
        </p>
        <button
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
          onClick={toggleAnswer}
        >
          {isOpen ? "-" : "+"}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 font-inter font-normal text-base leading-6 text-[#010314]/50">
          {answer}
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "What is KoalaByte?",
      answer:
        "KoalaByte is an AI-powered recruitment platform designed to streamline your hiring process.",
    },
    {
      question: "How does KoalaByte fetch candidate profiles?",
      answer:
        "KoalaByte uses AI to search and analyze profiles from various professional networks and databases.",
    },
    {
      question: "What role does the AI assistant play?",
      answer:
        "The AI assistant helps screen candidates, suggest matches, and automate initial communications.",
    },
    {
      question: "Is KoalaByte suitable for small businesses?",
      answer:
        "Yes, KoalaByte offers plans that scale from individual recruiters to large enterprises.",
    },
    {
      question: "Does KoalaByte integrate with existing CRM systems?",
      answer:
        "Yes, KoalaByte provides API integrations with most popular CRM systems.",
    },
    {
      question: "Can I edit and customize candidate CVs?",
      answer:
        "Yes, our platform allows you to annotate and customize candidate profiles.",
    },
  ];

  return (
    <section className="max-w-[1280px] w-full mx-auto  px-2  ">
      <div className="flex flex-col md:flex-row md:space-x-6 ">
        <div className="flex flex-col md:w-[50%]  text-left">
          <h2 className="font-semibold text-3xl md:text-[36px] leading-[44px] tracking-[-0.02em] text-[#010314]">
            FAQS
          </h2>
          <p className="font-normal text-lg md:text-xl leading-7 text-[#010314] mt-4 mb-2">
            Everything you need to know about KolaByte AI.
          </p>
          <p className="font-normal text-lg md:text-xl leading-7 text-[#010314]">
            Can't find the answer you're looking for?
          </p>
          <p className="font-normal text-lg md:text-xl leading-7 text-[#001BFF] mt-2">
            Chat to our friendly team.
          </p>
        </div>

        <div className="flex flex-col  md:w-[50%] ">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
