import { useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

function CONTACT() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  }

  const handleMailTo = () => {
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.")
      return
    }

    const subject = `New Message from ${name}`
    const body = `Name: ${name}\nEmail: ${email}n\nMessage:\n${message}`

    window.location.href = `mailto:aadi.hadi7111@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const handleCalendly = () => {
    if (!name || !email || !message) {
      alert("Please fill in all fields.")
      return
    }

    const calendlyUrl = `https://calendly.com/saqlainaslam213/30min?`
    window.open(calendlyUrl, "_blank")
  }

  return (
    <div className="bg-[#E0E2F4] w-full h-[calc(75vh)]">
      <section className="mx-auto max-w-[1280px]  bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10">
        {/* contact section start */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto flex flex-col items-start justify-between space-x-0 space-y-5 md:flex-row md:space-x-10">
            <motion.div
              variants={leftVariants}
              className="rounded-4xl relative min-h-[400px] w-full overflow-hidden md:w-1/2"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: `url(/assets/contactbg.jpg)` }}
              ></div>

              <div className="relative z-10 h-full">
                <motion.div
                  className="flex h-full items-center justify-center p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/animated-bear.gif"
                    alt="Animated Bear"
                    className="w-full max-w-[380px] object-contain md:max-w-[600px] lg:max-w-[800px]"
                  />
                </motion.div>
                <div className="px-2 md:px-4">
                  <img src="/assets/shines.png" alt="shines" />
                </div>
                <motion.div
                  className="font-inter px-2 text-[30px] font-normal leading-[38px] tracking-normal text-white md:px-4"
                  variants={itemVariants}
                >
                  <p>Contact Us Today — We Would Love to Hear from You!</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={rightVariants}
              className="flex w-full flex-col items-start space-y-5 md:w-1/2 md:space-y-3"
            >
              <motion.div
                variants={itemVariants}
                className="font-inter text-5xl font-medium leading-none tracking-[-0.02em] text-[#101828]"
              >
                Get in touch
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="font-inter text-center text-base font-normal leading-6 text-[#75777A] md:text-left md:text-lg lg:text-xl"
              >
                Have questions or need assistance? Our team is here to help—reach out and let's connect!
              </motion.div>

              <motion.div variants={itemVariants} className=" flex w-full flex-col space-y-5 md:space-y-3">
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="nameInput" className="font-inter block text-sm font-medium leading-5 text-[#475467]">
                    Full Name*
                  </label>
                  <motion.input
                    type="text"
                    id="nameInput"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:h-10 md:rounded-2xl"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="emailInput" className="font-inter block text-sm font-medium leading-5 text-[#475467]">
                    Email*
                  </label>
                  <motion.input
                    type="email"
                    id="emailInput"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:h-10 md:rounded-2xl"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="message" className="font-inter block text-sm font-medium leading-5 text-[#475467]">
                    Message*
                  </label>
                  <motion.textarea
                    id="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="md:h-45 h-20 w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:rounded-2xl"
                    rows={5}
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  ></motion.textarea>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex w-full flex-col justify-center space-y-3 md:space-y-5"
                >
                  <motion.button
                    type="button"
                    onClick={handleMailTo}
                    className="w-full cursor-pointer rounded-lg border border-[linear-gradient(126.51deg,#1E2AE8_42.05%,#0BA5EC_100%)] bg-[linear-gradient(126.51deg,#1E51E8_42.05%,#0BA5EC_100%)] px-6 py-3 text-lg text-white md:w-auto md:rounded-2xl"
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0 10px 25px rgba(30, 81, 232, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Submit
                  </motion.button>

                  <motion.button
                    onClick={handleCalendly}
                    className="font-inter flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-white bg-white px-6 py-3 text-base font-semibold leading-6 text-[#344054] md:w-auto md:rounded-2xl"
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src="/assets/c.png" alt="c" className="h-5 w-5" />
                    <span className="md:font-medium">Book a Meeting on Calendly</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </section>
    </div>
  )
}
export default CONTACT
