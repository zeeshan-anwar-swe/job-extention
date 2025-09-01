import { useState } from 'react';
import c from './assets/c.png';
import contactbg from './assets/contactbg.jpg';
import shines from './assets/shines.png';
import FOOTER from '../_partial/FOOTER';

function CONTACT() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleMailTo = () => {
		if (!name || !email || !message) {
			alert('Please fill in all fields.');
			return;
		}

		const subject = `New Message from ${name}`;
		const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

		window.location.href = `mailto:aadi.hadi7111@gmail.com?subject=${encodeURIComponent(
			subject,
		)}&body=${encodeURIComponent(body)}`;
	};

	const handleCalendly = () => {
		if (!name || !email || !message) {
			alert('Please fill in all fields.');
			return;
		}

		const calendlyUrl = `https://calendly.com/saqlainaslam213/30min?`;
		window.open(calendlyUrl, '_blank');
	};

	return (
		<section className='mx-auto max-w-[1280px] bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10'>
			{/* contact section start */}
			<section>
				<div className='container mx-auto flex flex-col items-start justify-between space-x-0 space-y-5 md:flex-row md:space-x-10'>
					<div className='rounded-4xl relative min-h-[400px] w-full overflow-hidden md:w-1/2'>
						<div
							className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60'
							style={{ backgroundImage: `url(${contactbg})` }}></div>

						<div className='relative z-10 h-full'>
							<div className='flex h-full items-center justify-center p-4'>
								<img
									src='/assets/animated-bear.gif'
									alt='Animated Bear'
									className='w-full max-w-[380px] object-contain md:max-w-[600px] lg:max-w-[800px]'
								/>
							</div>
							<div className='px-2 md:px-4'>
								<img src={shines} alt='shines' />
							</div>
							<div className='font-inter px-2 text-[30px] font-normal leading-[38px] tracking-normal text-white md:px-4'>
								<p>Contact Us Today — We Would Love to Hear from You!</p>
							</div>
						</div>
					</div>

					<div className='flex w-full flex-col items-start space-y-5 md:w-1/2 md:space-y-3'>
						<div className='font-inter text-5xl font-medium leading-none tracking-[-0.02em] text-[#101828]'>
							Get in touch
						</div>
						<div className='font-inter text-center text-base font-normal leading-6 text-[#75777A] md:text-left md:text-lg lg:text-xl'>
							Have questions or need assistance? Our team is here to help—reach out
							and let’s connect!
						</div>

						<div className=' flex w-full flex-col space-y-5 md:space-y-3'>
							<div>
								<label
									htmlFor='nameInput'
									className='font-inter block text-sm font-medium leading-5 text-[#475467]'>
									Full Name*
								</label>
								<input
									type='text'
									id='nameInput'
									placeholder='Enter your Name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:h-10 md:rounded-2xl'
									required
								/>
							</div>

							<div>
								<label
									htmlFor='emailInput'
									className='font-inter block text-sm font-medium leading-5 text-[#475467]'>
									Email*
								</label>
								<input
									type='email'
									id='emailInput'
									placeholder='Enter your Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:h-10 md:rounded-2xl'
									required
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='font-inter block text-sm font-medium leading-5 text-[#475467]'>
									Message*
								</label>
								<textarea
									id='message'
									placeholder='Message'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className='md:h-45 h-20 w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:rounded-2xl'
									rows={5}
									required></textarea>
							</div>

							<div className='flex w-full flex-col justify-center space-y-3 md:space-y-5'>
								<button
									type='button'
									onClick={handleMailTo}
									className='w-full cursor-pointer rounded-lg border border-[linear-gradient(126.51deg,#1E2AE8_42.05%,#0BA5EC_100%)] bg-[linear-gradient(126.51deg,#1E51E8_42.05%,#0BA5EC_100%)] px-6 py-3 text-lg text-white md:w-auto md:rounded-2xl'>
									Submit
								</button>

								<button
									onClick={handleCalendly}
									className='font-inter flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-white bg-white px-6 py-3 text-base font-semibold leading-6 text-[#344054] md:w-auto md:rounded-2xl'>
									<img src={c} alt='c' className='h-5 w-5' />
									<span className='md:font-medium'>
										Book a Meeting on Calendly
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* footer section start */}
			<section>
				<FOOTER />
			</section>
		</section>
	);
}
export default CONTACT;
