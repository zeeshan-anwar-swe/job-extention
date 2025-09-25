import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function FAQItem({ question, answer, index }: any) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAnswer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <motion.div
      className="mb-4 md:mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-start">
        <p className="font-medium text-xl leading-7 text-[#010314] flex-1 pr-4">{question}</p>
        <motion.button
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
          onClick={toggleAnswer}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          
          transition={{ duration: 0.2 }}
        >
          {isOpen ? "-" : "+"}
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-2 font-inter font-normal text-base leading-6 text-[#010314]/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  const faqs = [
    {
      question: "What is Koalify?",
      answer: "Koalify is an AI-powered recruitment platform designed to streamline your hiring process.",
    },
    {
      question: "How does Koalify fetch candidate profiles?",
      answer: "Koalify uses AI to search and analyze profiles from various professional networks and databases.",
    },
    {
      question: "What role does the AI assistant play?",
      answer: "The AI assistant helps screen candidates, suggest matches, and automate initial communications.",
    },
    {
      question: "Is Koalify suitable for small businesses?",
      answer: "Yes, Koalify offers plans that scale from individual recruiters to large enterprises.",
    },
    {
      question: "Does Koalify integrate with existing CRM systems?",
      answer: "Yes, Koalify provides API integrations with most popular CRM systems.",
    },
    {
      question: "Can I edit and customize candidate CVs?",
      answer: "Yes, our platform allows you to annotate and customize candidate profiles.",
    },
  ]

  return (
    <section className="max-w-[1280px] w-full mx-auto px-2">
      <motion.div
        className="flex flex-col md:flex-row md:space-x-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col md:w-[50%] text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-semibold text-3xl md:text-[36px] leading-[44px] tracking-[-0.02em] text-[#010314] dark:text-[#010314]">
            FAQS
          </h2>
          <p className="font-normal text-lg md:text-xl leading-7 text-[#010314] mt-4 mb-2">
            Everything you need to know about KolaByte AI.
          </p>
          <p className="font-normal text-lg md:text-xl leading-7 text-[#010314]">
            Can't find the answer you're looking for?
          </p>
          <motion.p
            className="font-normal text-lg md:text-xl leading-7 text-[#001BFF] mt-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Chat to our friendly team.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col md:w-[50%]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FAQ
