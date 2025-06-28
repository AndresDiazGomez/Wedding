import { ExternalLink, Heart } from 'lucide-react';
import WhatsappIcon from './Whatsapp';

const RSVPSection = () => {
	return (
		<section className='py-20 px-6 bg-gradient-to-t from-green-900/20 to-gray-900'>
			<div className='max-w-4xl mx-auto text-center'>
				{/* Header */}
				<div className='mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
						Reserva la fecha
					</h2>
					<p className='text-xl text-gray-300 max-w-2xl mx-auto'>
						Ayúdanos a que este día sea perfecto confirmando tu asistencia.
					</p>
				</div>

				{/* RSVP Card */}
				<div className='bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-12 mb-12 relative overflow-hidden'>
					{/* Background Elements */}
					<div className='absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-2xl'></div>
					<div className='absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl'></div>

					<div className='relative z-10'>
						<div className='flex justify-center mb-6'>
							<Heart className='w-12 h-12 text-red-400 animate-pulse' />
						</div>

						<h3 className='text-3xl font-bold text-white mb-4'>
							¿Te unirás a nuestra lista de reproducción?
						</h3>

						<p className='text-gray-300 mb-8 max-w-md mx-auto'>
							Por favor confirma tu asistencia antes del 1 de Noviembre de 2025
						</p>

						{/* RSVP Button */}
						<button
							type='button'
							className='bg-green-500 hover:bg-green-600 text-black font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25'
							onClick={() =>
								window.open('https://forms.google.com/your-rsvp-link', '_blank')
							}
						>
							<div className='flex items-center justify-center gap-3'>
								<span>RSVP ahora</span>
								<ExternalLink className='w-5 h-5' />
							</div>
						</button>

						<p className='text-sm text-gray-400 mt-4'>
							¡No podemos esperar a verte allí! 🎵
						</p>
					</div>
				</div>

				{/* Contact Info */}
				<div className='text-center'>
					<p className='text-gray-400 mb-2'>¿Preguntas? Contáctanos:</p>
					<p className='text-green-300 flex items-center gap-2 justify-center'>
						<WhatsappIcon />
						<a
							href='https://wa.me/573163241009'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-green-400 transition-colors'
						>
							María de los Ángeles
						</a>
					</p>
					<p className='text-green-300 flex items-center gap-2 justify-center'>
						<WhatsappIcon />
						<a
							href='https://wa.me/573005159628'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-green-400 transition-colors'
						>
							Andrés Felipe
						</a>
					</p>
				</div>

				{/* Footer */}
				<div className='mt-16 pt-8 border-t border-gray-700/50'>
					<p className='text-gray-500 flex items-center justify-center gap-2'>
						Hecho con <Heart className='mx-1 w-4 h-4 text-red-400 shrink-0' />{' '}
						mucha música... y sí, también ¡Inteligencia Artificial!
					</p>
				</div>
			</div>
		</section>
	);
};

export default RSVPSection;
