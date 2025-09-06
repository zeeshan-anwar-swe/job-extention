
import { motion } from "framer-motion"
import bg from "/assets/bg.jpg"
import microphone from "/assets/microphone.png"

export const HomeHeroSection = () => {
  // Variants for the staggered container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Variants for individual item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-5 md:py-8 lg:py-10">
      <div
        className="relative w-full"
        style={{
          backgroundImage: `
              linear-gradient(
                to top,
                rgba(224, 226, 244, 0) 0%,
                rgba(224, 226, 244, 0.5) 50%,
                rgba(224, 226, 244, 1) 100%
              ),
              url(${bg})
            `,
          backgroundSize: "100% 50%",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <section className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-14">
          <motion.div
            className="lg-space-x-8 mx-auto flex flex-col items-start justify-between space-y-8 py-8 md:flex-row md:space-x-5 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Left Column with staggered animation */}
            <motion.div className="w-full md:w-1/2" variants={containerVariants}>
              <motion.div
                className="flex w-fit items-center rounded-full bg-white/50 px-1 py-1 text-sm text-[#010314]/50 lg:text-lg"
                variants={itemVariants}
              >
                <div className="mr-2 rounded-full bg-gradient-to-r from-[#1F51E8] to-[#0D9DEC] px-3 text-sm text-white md:mr-3 lg:text-lg">
                  Find, Track, Hire
                </div>
                Join our beta <button className="cursor-pointer">→</button>
              </motion.div>
              <div className="pt-5">
                <motion.span
                  className="block font-[Urbanist] text-3xl font-semibold text-[#0535A8] md:text-4xl lg:text-6xl"
                  variants={itemVariants}
                >
                  Your Koalifed AI <br /> Recruiting Assistant- <br />
                </motion.span>
                <motion.span
                  className="block font-[Urbanist] text-3xl font-semibold text-[#1E1E1E] md:text-4xl lg:text-6xl"
                  variants={itemVariants}
                >
                  Koalify
                </motion.span>
              </div>
              <motion.div className="py-5 text-justify text-[#475467] lg:text-lg" variants={itemVariants}>
                Koalify revolutionizes recruitment with an AI-powered talking avatar assistant —search candidates,
                manage jobs, and navigate effortlessly using just your voice.
              </motion.div>
              <motion.div variants={itemVariants}>
                <a
                  href="/signup"
                  className="cursor-pointer rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-4 py-2 text-white"
                >
                  Get Started &gt;
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column with staggered animation */}
            <motion.div
              className="rounded-4xl relative flex h-full min-h-[400px] w-full flex-col items-center justify-between bg-[url('./assets/Frame.png')] bg-cover bg-center bg-no-repeat py-6 md:w-1/2 md:py-12"
              variants={containerVariants}
            >
              {/* Top Text */}
              <motion.div
                className="z-10 w-auto rounded-full bg-[#0073FF] px-3 text-sm text-white md:text-lg"
                variants={itemVariants}
              >
                Looking for top talent?
              </motion.div>
              {/* Centered GIF */}
              <motion.div
                className="relative z-10 flex w-full flex-1 items-center justify-center"
                variants={itemVariants}
              >
                <img
                  src="/images/animated-bear.gif"
                  alt="beargif"
                  className="h-full max-h-[300px] w-auto object-contain"
                />
              </motion.div>
              {/* Bottom Button */}
              <motion.div
                className="z-10 flex w-auto items-center rounded-full bg-gradient-to-r from-[#2C5EF4] to-[#0D9BEC] px-3 text-sm text-white"
                variants={itemVariants}
              >
                <img src={microphone || "/placeholder.svg"} alt="Microphone" className="mr-2 h-4 w-4" />
                <span className="text-white">Start Talking</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </section>
  )
}
