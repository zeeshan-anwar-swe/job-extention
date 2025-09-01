import driven from '../../../../../public/assets/driven.png';
import link from '../../../../../public/assets/link.png';
import man from '../../../../../public/assets/man.png';
import avatar from '../../../../../public/assets/avatar.png';
import logo from '../../../../../public/assets/logo.png';
import linkdna from '../../../../../public/assets/linkdna.png';
import facebook from '../../../../../public/assets/facebook.png';
import twiter from '../../../../../public/assets/twiter.png';
import copy from '../../../../../public/assets/copy.png';
import STARTED from '../_partial/STARTED';

function BLOGPOST() {
	return (
		<div className='bg-[#E0E2F4]'>
			<section className='mx-auto max-w-[1280px] bg-[#E0E2F4] px-5 md:px-10 lg:px-14 '>
				{/* BLOGPOST section start */}
				<section className=''>
					<div className='container flex flex-col items-start space-y-4'>
						<div className='font-inter flex w-fit items-center rounded-full border-b-black bg-[#B1B1B1]/50 px-1 py-1 text-xs font-medium leading-[18px] text-[#010314]/50 lg:px-1.5 lg:py-1.5'>
							<div className='font-inter mr-1 rounded-full bg-[#010314] px-2 text-center text-xs font-medium leading-[18px] text-white lg:mr-2 lg:px-3'>
								Technology
							</div>
							8 min read
						</div>

						<div className='font-inter text-5xl font-medium leading-none tracking-[-0.02em] text-[#101828] md:text-lg lg:text-5xl'>
							Data-Driven Hiring: How to Make Smarter Recruitment Decisions
						</div>

						<div className='mx-auto flex w-full flex-col justify-between md:flex-row'>
							<div className='mb-4 text-left md:mb-0'>
								<span className='font-inter text-xs font-semibold leading-5 text-[#0C4DCE]'>
									Published on
								</span>
								<br />
								<span className='font-inter text-lg font-medium leading-7 text-[#101828]'>
									17 Jan 2024
								</span>
							</div>
							<div className='text-right'>
								<div className='flex flex-row space-x-2'>
									<div className='relative mb-2 flex w-full items-center md:mb-0 md:w-auto'>
										<input
											type='text'
											placeholder='Copy Link'
											className='font-inter flex-grow rounded-lg border border-gray-300 bg-amber-50 text-center text-xs font-semibold text-[#344054]'
										/>
										<img
											src={copy}
											alt='Copy'
											className='absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform'
										/>
									</div>
									<div>
										<img src={twiter} alt='twiter' className='h-6 w-6' />
									</div>
									<div>
										<img src={facebook} alt='facebook' className='h-6 w-6' />
									</div>
									<div>
										<img src={linkdna} alt='linkdna' className='h-6 w-6' />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='container mx-auto flex flex-col justify-between space-x-0 pt-8 md:flex-row md:space-x-6'>
						<div className='flex w-full flex-col md:w-3/5'>
							<div className='font-inter mb-2 text-[30px] font-semibold leading-[38px] text-[#101828] md:mb-4'>
								Introduction
							</div>
							<div className='font-inter text-justify text-lg font-normal leading-7 text-[#475467]'>
								Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
								suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
								quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris
								posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
								feugiat sapien varius id. Eget quis mi enim, leo lacinia pharetra,
								semper. Eget in voluptat mollis at volutpat lectus velit, sed
								auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant
								diam at. Suscipit tristique risus, at donec. In turpis vel et quam
								imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
							</div>
						</div>
						<div className='flex w-full flex-col space-y-2 rounded-xl border-2 border-white bg-white/60 p-4 md:w-2/5 md:space-y-5 md:p-6'>
							<div>
								<img src={logo} alt='logo' className='items-center' />
							</div>
							<div className='font-inter text-2xl font-semibold leading-8 text-[#101828]'>
								Try AI-Powered Human <br className='md:hidden' /> Resource
								Management.
							</div>
							<div className='font-inter text-base font-normal leading-6 text-[#475467]'>
								Streamline recruitment with intelligent automation, real-time
								candidate insights, and seamless workflow management.
							</div>
							<div className='flex justify-center'>
								<button className='cursor-pointer rounded-lg bg-[linear-gradient(126.51deg,#1E51E8_42.05%,#0BA5EC_100%)] px-4 py-2 text-white'>
									Get Started
								</button>
							</div>
						</div>
					</div>

					<div className='container flex w-full flex-col space-y-2.5 py-4 md:w-3/5 md:space-y-4 md:py-8'>
						<div>
							<img src={driven} alt='driven' className='w-full rounded-lg' />
						</div>

						<div className='flex items-center'>
							<img src={link} alt='link' className='mr-2' />
							<span className='font-inter text-sm font-normal leading-5 text-[#475467]'>
								Image courtesy of Moose Photos via Pexels
							</span>
						</div>

						<div className='font-inter text-justify text-lg font-normal leading-7 text-[#475467]'>
							Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.
							Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie
							sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut
							tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
						</div>

						<div className='w-full rounded-lg'>
							<div className='relative border-l-4 border-blue-500 pl-4'>
								<p className='font-inter text-justify text-2xl font-medium italic leading-9 text-[#101828]'>
									"In a world older and more complete than ours they move finished
									and complete, gifted with extensions of the senses we have lost
									or never attained, living by voices we shall never hear."
								</p>
							</div>
							<div className='mt-6 flex items-center'>
								<img
									src={avatar}
									alt='Demi'
									className='mr-4 h-12 w-12 rounded-full'
								/>
								<div>
									<p className='font-inter text-base font-semibold leading-6 text-[#101828]'>
										Demi Lane
									</p>
									<p className='font-inter text-base font-normal leading-6 text-[#475467]'>
										CEO XYZ Corp
									</p>
								</div>
							</div>
						</div>

						<div className='font-inter text-justify text-lg font-normal leading-7 text-[#475467]'>
							Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio
							nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi
							bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.{' '}
							<br />
							<br />
							Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
							commodo consectetur convallis risus. Sed condimentum enim dignissim
							adipiscing faucibus consequat, urna. Viverra purus et erat auctor
							aliquam. Risus, volutpat vulputate posuere purus sit congue convallis
							aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque
							ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc
							lectus in tellus, pharetra, porttitor. <br /> <br /> Ipsum sit mattis
							nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque
							congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam
							elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus.
							Sed vel, congue felis elit erat nam nibh orci.
						</div>

						<div className='font-inter text-2xl font-semibold leading-8 text-[#101828]'>
							Software and tools
						</div>
						<div className='font-inter text-justify text-lg font-normal leading-7 text-[#475467]'>
							Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
							suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
							montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
							vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
							varius id. <br /> <br /> Eget quis mi enim, leo lacinia pharetra,
							semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor.
							Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at.
							Suscipit tristique risus, at donec. In turpis vel et quam imperdiet.
							Ipsum molestie aliquet sodales id est ac volutpat.
						</div>
						<div className='font-inter text-2xl font-semibold leading-8 text-[#101828]'>
							Other resources
						</div>
						<div className='font-inter text-justify text-lg font-normal leading-7 text-[#475467]'>
							Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas
							sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum
							lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at
							diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus
							vulputate gravida id. Sed quis auctor vulputate hac elementum gravida
							cursus dis. <br /> <br />
							1. Lectus id duis vitae porttitor enim gravida morbi. <br /> 2. Eu
							turpis posuere semper feugiat volutpat elit, ultrices suspendisse.
							Auctor vel in vitae placerat. <br /> 3. Suspendisse maecenas ac donec
							scelerisque diam sed est duis purus.
						</div>

						<div>
							<img src={man} alt='man' className='w-full rounded-lg' />
						</div>

						<div className='flex items-center'>
							<img src={link} alt='link' className='mr-2' />
							<span className='font-inter text-sm font-normal leading-5 text-[#475467]'>
								Image courtesy of Moose Photos via Pexels
							</span>
						</div>

						<div className='font-inter text-justify text-lg font-normal leading-7 text-[#475467]'>
							Lectus leo massa amet posuere. Malesuada mattis non convallis quisque.
							Libero sit et imperdiet bibendum quisque dictum vestibulum in non.
							Pretium ultricies tempor non est diam. Enim ut enim amet amet integer
							cursus. Sit ac commodo pretium sed etiam turpis suspendisse at. <br />
							<br /> Tristique odio senectus nam posuere ornare leo metus, ultricies.
							Blandit duis ultricies vulputate morbi feugiat cras placerat elit.
							Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit
							accumsan. Cursus viverra aenean magna risus elementum faucibus molestie
							pellentesque. Arcu ultricies sed mauris vestibulum.
						</div>
					</div>
				</section>

				{/* Started section start */}
				<section>
					<STARTED />
				</section>
			</section>
		</div>
	);
}
export default BLOGPOST;
