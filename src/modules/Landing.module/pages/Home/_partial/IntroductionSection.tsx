import { motion } from "framer-motion"

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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export const HomeIntroductionSection = () => {
  return (
    <motion.section
      className="overflow-hidden rounded-2xl border-2 border-white "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col md:flex-row">
        <motion.div className="w-full p-6 md:w-1/2 md:p-8 lg:p-12" variants={slideInLeft}>
          <motion.span
            className="bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-sm font-semibold text-transparent md:text-base"
            variants={fadeInUp}
          >
            Introducing Koalify AI
          </motion.span>
          <motion.h2 className="mb-4 mt-2 text-2xl font-medium text-[#010314] md:text-3xl" variants={fadeInUp}>
            Empower Your Hiring and Job Tracking with AI
          </motion.h2>
          <motion.p className="mb-6 text-base text-[#8F8F8F] md:text-lg" variants={fadeInUp}>
            Koalify AI offers a range of core advantages that set us apart in the human resource technology landscape.
            These advantages are designed to make your processes more efficient, data-driven, and ultimately more
            successful.
          </motion.p>
          <motion.button
            className="flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-5 py-2.5 text-white"
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(30, 81, 232, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="font-semibold">Watch Demo</span>
            <motion.img
              src="/assets/play.png"
              alt="Play icon"
              className="ml-2 h-4 w-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
        <motion.div className="relative min-h-[300px] w-full md:w-1/2" variants={slideInRight}>
          <motion.img
            src="/assets/dashboard.png"
            alt="Dashboard"
            className="h-full w-full rounded-3xl object-cover pt-4 lg:object-contain lg:object-right"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#1399C7] to-[#0435A7]"
              variants={scaleIn}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 8px 20px rgba(19, 153, 199, 0.4)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.img
                src="/assets/play.png"
                alt="Play icon"
                className="h-6 w-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
