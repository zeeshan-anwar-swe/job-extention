import React, { useState, useCallback } from 'react';
import { FAQCollapsePartial } from './_partials/FAQCollapse.partial';

const useAccordion = (initialState: { [key: string]: boolean }) => {
  const [openStates, setOpenStates] = useState(initialState);

  // Use useCallback to ensure the toggleOpen function reference is stable
  const toggleOpen = useCallback((id: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []); // Empty dependency array ensures it's only created once

  return { openStates, toggleOpen };
};

// Helper component to apply the fix and reduce redundancy
interface AccordionDetailProps {
  id: string;
  title: string;
  content: string;
  openStates: { [key: string]: boolean };
  toggleOpen: (id: string) => void;
}

const AccordionDetail: React.FC<AccordionDetailProps> = ({
  id,
  title,
  content,
  openStates,
  toggleOpen,
}) => {
  return (
    <details
      className='border-t-secondary group flex flex-col border-t py-2 dark:border-t-gray-800'
      open={openStates[id]}
      // REMOVED: onToggle handler as it conflicts with the browser's native toggle
    >
      <summary
        className='flex cursor-pointer items-center justify-between gap-6 py-2'
        // FIX: Use onClick on <summary> with preventDefault to control the state entirely with React
        onClick={(e) => {
          e.preventDefault();
          toggleOpen(id);
        }}>
        <p className='text-text-light dark:text-text-dark text-sm font-medium leading-normal'>
          {title}
        </p>
        <span
          className={`material-symbols-outlined text-text-light dark:text-text-dark ${openStates[id] ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </summary>
      <p className='pb-2 text-sm font-normal leading-normal text-gray-600 dark:text-gray-400'>
        {content}
      </p>
    </details>
  );
};

const PrivacyPolicyPage: React.FC = () => {
  // Map of section IDs to their initial open state (only 'use-of-active-tabs' is open initially)
  const { openStates, toggleOpen } = useAccordion({
    'use-of-active-tabs': true,
    'cookies-policy': false,
    'host-permissions': false,
    'remote-code': false,
    scripting: false,
    storage: false,
  });

  return (
    <div className='group/design-root relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden'>
      <div className='layout-container flex h-full grow flex-col'>
        {/* Main Content */}
        <main className='flex-1 px-4 py-10 sm:px-6 lg:px-8'>
          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-9'>
            {/* Main Policy Content Area */}
            <div className='lg:col-span-9 '>
              {/* Introduction */}
              <section className='scroll-mt-24' id='introduction'>
                <div className='flex flex-wrap justify-between gap-3 p-4'>
                  <p className='text-primary dark:text-primary min-w-72 text-4xl font-black leading-tight tracking-[-0.033em]'>
                    Privacy Policy
                  </p>
                </div>
                <p className='px-4 pb-3 pt-1 text-base font-normal leading-normal'>
                  Your privacy is important to us. It is our policy to respect your privacy
                  regarding any information we may collect from you across our website. We are
                  committed to transparency and have outlined our practices below. This policy
                  explains what information we collect, why we collect it, and how you can manage
                  your information.
                </p>
              </section>

              {/* Justification for Permissions */}
              <section className='mt-10 scroll-mt-24' id='permissions'>
                <h2 className='text-text-light dark:text-text-dark px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em]'>
                  Justification for Permissions
                </h2>
                <div className='flex flex-col gap-4 p-4'>
                  {/* Permission Details: Use of Active Tabs */}

                  <FAQCollapsePartial
                    title='Use of Active Tabs'
                    body='We use active tab permissions to enhance your browsing experience by enabling features that are specific to the page you are currently viewing. This allows us to provide contextual functionality without needing to access all of your browsing history.'
                  />

                  {/* Permission Details: Cookies Policy */}
                  <FAQCollapsePartial
                    title='Cookies Policy'
                    body='Our website uses cookies to improve user experience. These are small files stored on your computer. We use them to remember your preferences, for analytics, and for advertising. You have full control over your cookie settings.'
                  />

                  {/* Permission Details: Host Permissions */}

                  <FAQCollapsePartial
                    title='Host Permissions'
                    body="To provide our full range of services, we require permission to access certain external hosts. This is necessary for features like fetching data from third-party APIs or loading external content. We only request permissions for hosts that are essential for our website's functionality."
                  />

                  {/* Permission Details: Remote Code */}

                  <FAQCollapsePartial
                    title='Remote Code'
                    body='We may use remote code to provide dynamic and up-to-date content. All remote code is sourced from trusted providers and is subject to strict security reviews to protect your system from malicious software.'
                  />

                  {/* Permission Details: Scripting */}

                  <FAQCollapsePartial
                    title='Scripting'
                    body='Our website uses scripting (like JavaScript) to enable interactive features and improve site functionality. You can disable scripting in your browser, but this may affect your experience on our site.'
                  />

                  {/* Permission Details: Storage */}
                  <FAQCollapsePartial
                    title='Storage'
                    body='We use local storage on your device to save preferences and session information. This helps us provide a more personalized and seamless experience without requiring you to log in or set preferences on every visit.'
                  />
                </div>
              </section>

              {/* Single Purpose Description */}
              <section className='mt-10 scroll-mt-24' id='single-purpose'>
                <h2 className='text-text-light dark:text-text-dark px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em]'>
                  Single Purpose Description
                </h2>
                <p className='px-4 pb-3 pt-1 text-base font-normal leading-normal'>
                  All data collected through this website is for the single purpose of improving our
                  services and providing a personalized user experience. We do not sell your
                  personal data to third parties. Our goal is to create a better, more efficient
                  service for you.
                </p>
              </section>

              {/* Compliance Certification */}
              <section className='mt-10 scroll-mt-24' id='compliance'>
                <h2 className='text-text-light dark:text-text-dark px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em]'>
                  Compliance Certification
                </h2>
                <div className='p-4'>
                  <p className='text-text-light dark:text-text-dark text-sm font-medium'>
                    We certify that our data usage practices comply with all relevant regulations,
                    including GDPR and CCPA. We are committed to upholding the highest standards of
                    data protection and privacy for all our users.
                  </p>
                </div>
              </section>

              {/* Contact Email Verification */}
              <section className='mt-10 scroll-mt-24' id='verification'>
                <h2 className='text-text-light dark:text-text-dark px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em]'>
                  Contact Email Verification
                </h2>
                <p className='px-4 pb-3 pt-1 text-base font-normal leading-normal'>
                  To ensure the security of your account and to provide you with important
                  notifications, we require email verification. This is a one-time process that
                  helps us confirm you are the owner of the email address provided. We will send a
                  verification link to your email.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
