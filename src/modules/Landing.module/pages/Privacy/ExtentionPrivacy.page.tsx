import { Link } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/icon/Icon';
import { motion } from 'framer-motion';
import { FAQCollapsePartial } from './_partials/FAQCollapse.partial';
import { CardTitle } from '../../../../components/ui/Card';

// --- Transition Adjustments ---
// 1. Faster stagger (0.05s)
// 2. Tighter spring for smoother, quicker motion

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced stagger time for faster cascade
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 170, // Increased stiffness for less "lag" and bounciness
      damping: 20, // Adjusted damping to match the stiffness
      duration: 0.2, // Added duration for explicit control
    },
  },
};

const ExtentionPrivacy = () => {
  return (
    // Faster overall fade-in (0.3s)
    <motion.div
      className='bg-background'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}>
      {/* Hero Section - Apply container variants */}
      <motion.div
        className='container mx-auto px-4 py-20'
        variants={containerVariants}
        initial='hidden'
        animate='visible'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Icon - Use item variants */}
          <motion.div
            className='bg-primary/10 mb-6 inline-flex items-center justify-center rounded-full'
            variants={itemVariants}>
            <Icon
              size='text-9xl'
              className='rounded-full bg-blue-200 p-2 text-blue-700 dark:to-blue-900 dark:text-blue-200'
              icon='HeroShieldCheck'
            />
          </motion.div>

          {/* Title - Use item variants */}
          <motion.h1 className='text-foreground mb-6 text-5xl font-bold' variants={itemVariants}>
            Privacy-First Browser Extension
          </motion.h1>

          {/* Subtitle - Use item variants */}
          <motion.p
            className='text-muted-foreground mx-auto mb-8 max-w-2xl text-xl'
            variants={itemVariants}>
            A transparent, secure browser extension built with your privacy in mind. We're committed
            to protecting your data and being completely transparent about our practices.
          </motion.p>

          {/* Button - Use item variants */}
          <motion.div className='mb-12 flex justify-center gap-4' variants={itemVariants}>
            <a  href="#qa-section">
              <Button variant='solid' icon='HeroDocumentText' size='xl'>
                Read About Question Answer
              </Button>
            </a>
          </motion.div>

          {/* Trust Indicators - Apply container variants to this row */}
          <motion.div className='mt-16 grid gap-8 md:grid-cols-3' variants={containerVariants}>
            {/* Indicator 1 */}
            <motion.div className='text-center' variants={itemVariants}>
              <div className='bg-primary/10 items-center mb-4 inline-flex justify-center rounded-full'>
                <Button
                  size='xl'
                  rounded='rounded-full'
                  variant='solid'
                  colorIntensity='200'
                  // Icon Suggestion: HeroChatBubbleLeftRight or HeroCommandLine
                  icon='HeroChatBubbleLeftRight'></Button>
              </div>
              <h3 className='text-foreground mb-2 font-semibold'>Can Talk to Extension</h3>
              <p className='text-muted-foreground text-sm'>
                Seamless two-way communication allows you to direct the extension and receive real-time updates.
              </p>
            </motion.div>

            {/* Indicator 2 */}
            <motion.div className='text-center' variants={itemVariants}>
              <div className='bg-primary/10  items-center mb-4 inline-flex justify-center rounded-full'>
                <Button
                  size='xl'
                  rounded='rounded-full'
                  variant='solid'
                  colorIntensity='200'
                  // Icon Suggestion: HeroSparkles or HeroWrench
                  icon='HeroWrench'></Button>
              </div>
              <h3 className='text-foreground mb-2 font-semibold'>Can Take Action</h3>
              <p className='text-muted-foreground text-sm'>
                Execute complex tasks, fill forms, and interact with web elements directly from your commands.
              </p>
            </motion.div>

            {/* Indicator 3 */}
            <motion.div className='text-center' variants={itemVariants}>
              <div className='bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full'>
                <Button
                  size='xl'
                  rounded='rounded-full'
                  variant='solid'
                  colorIntensity='200'
                  // Icon Suggestion: HeroMap or HeroGlobeAlt
                  icon='HeroGlobeAlt'></Button>
              </div>
              <h3 className='text-foreground mb-2 font-semibold'>Can Navigate</h3>
              <p className='text-muted-foreground text-sm'>
                Direct the extension to move between pages, follow links, and explore websites effortlessly.
              </p>
            </motion.div>
          </motion.div>
          {/* QA Section */}
          <section id="qa-section" className='mt-16 space-y-8'>
            <motion.h1 className='text-foreground mb-6 text-5xl font-bold' variants={itemVariants}>
              Frequently Asked Questions about Extension Privacy
            </motion.h1>
            <FAQCollapsePartial
              expandText='Answer'
              title='Why does the extension require the activeTab permission?'
              body='The activeTab permission is required so the extension can interact with the currently active browser tab. This helps recruiters easily navigate between candidate profiles, job creation pages, and dashboard sections without manually refreshing or switching tabs.'
            />
            <FAQCollapsePartial
                title='Why does the extension use cookies?'
                expandText='Answer'
                body='Cookies are used only to maintain secure user sessions within the recruiter’s environment. They help ensure recruiters stay logged in while managing or creating job listings and that their data remains consistent and protected during usage.
'
            />

             <FAQCollapsePartial
                title='Why are host permissions required?'
                expandText='Answer'
                body='Host permissions are necessary to enable the extension to communicate securely with our platform’s authorized domains. These permissions allow features like job posting and candidate tracking while blocking access to any unauthorized sites for maximum security.'
            />

             <FAQCollapsePartial
                title='Why does the extension require scripting permissions?'
                expandText='Answer'
                body='Scripting permissions are needed to automate page-level actions such as filling job forms, updating recruiter data, and simplifying navigation inside the dashboard. All scripts are internal, secure, and never access or share sensitive user information.'
            />

             <FAQCollapsePartial
                title='Why does the extension use storage permissions?'
                expandText='Answer'
                body='The storage permission allows the extension to save recruiter preferences, temporary data, and navigation states locally. This ensures a faster and more personalized experience without requiring users to repeatedly input the same information.'
            />

             <FAQCollapsePartial
                title='Why does the extension need tabs permissions?'
                expandText='Answer'
                body='The tabs permission enables the extension to identify and manage multiple recruiter-related pages or sections open in different tabs. This allows seamless movement between candidate profiles, job listings, and analytics without losing track of workflow.'
            />

             <FAQCollapsePartial
                title='What is the single purpose of this extension?'
                expandText='Answer'
                body='This extension is designed exclusively to simplify and secure the recruiter hiring process. It enhances navigation, speeds up job creation, and ensures a consistent and efficient experience across recruitment tasks.'
            />

             <FAQCollapsePartial
                title='How does the extension handle user data?'
                expandText='Answer'
                body='All user data is processed solely to support the extension’s core recruitment and navigation functions. We do not share, sell, or transmit any personal data to third parties. The extension follows Chrome Web Store Developer Program Policies and all relevant privacy standards.'
            />

             <FAQCollapsePartial
                title='How does the extension ensure security?'
                expandText='Answer'
                body='The extension’s listening logic is deployed separately and restricted to its own secure environment. This ensures only our extension can access it, preventing unauthorized use and maintaining data integrity throughout all recruitment operations.'
            />
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExtentionPrivacy;
