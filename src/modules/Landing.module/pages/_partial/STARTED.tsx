import { motion } from "framer-motion"
import startbg from "/assets/startbg.jpg"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
}

function STARTED() {
  return (
    <motion.section
      className="rounded-xl max-w-[1280px] mx-auto font-['Inter'] px-5 md:px-10 lg:px-14 py-6 md:py-10 lg:py-16"
      style={{
        backgroundImage: `url(${startbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <motion.div
          className="font-inter font-normal text-lg leading-[30px] text-[#565C69] text-center"
          variants={itemVariants}
        >
          Ready to Transform Your Hiring Process?
        </motion.div>

        <motion.div
          className="text-center font-semibold md:font-medium text-[36px] leading-[44px] tracking-[-0.02em] text-[#010314]"
          variants={itemVariants}
        >
          Get ready to Shaping Legal Strategies with <br /> AI-Powered Precision and Insight.
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto justify-center"
          variants={itemVariants}
        >
          <div className="flex">
            <motion.button
              className="rounded-lg px-6 py-3 w-full md:w-auto cursor-pointer bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] font-inter font-semibold text-lg leading-7 text-white"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get Started
            </motion.button>
          </div>
          <div className="flex">
            <motion.button
              className="rounded-lg px-6 py-3 w-full md:w-auto bg-[#A6A8B5] cursor-pointer font-inter font-semibold text-lg leading-7 text-white"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default STARTED
