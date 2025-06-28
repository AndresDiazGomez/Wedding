import { Heart, Music } from 'lucide-react';

const Hero = () => {
	return (
		<section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-green-900/20 overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-10'>
				<div className='absolute top-20 left-20 w-32 h-32 rounded-full bg-green-500/20 blur-xl animate-pulse'></div>
				<div
					className='absolute bottom-32 right-32 w-48 h-48 rounded-full bg-green-400/10 blur-2xl animate-pulse'
					style={{ animationDelay: '1s' }}
				></div>
				<div
					className='absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white/5 blur-lg animate-pulse'
					style={{ animationDelay: '2s' }}
				></div>
			</div>

			<div className='relative z-10 text-center px-6 max-w-4xl mx-auto'>
				{/* Music Icon */}
				<div className='flex justify-center mb-8'>
					<div className='relative'>
						<Music className='w-16 h-16 text-green-400 animate-bounce' />
						<Heart className='w-8 h-8 text-red-400 absolute -top-2 -right-2 animate-pulse' />
					</div>
				</div>

				{/* Main Title */}
				<h1 className='text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent animate-fade-in'>
					María & Andrés
				</h1>

				{/* Subtitle */}
				<p
					className='text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in'
					style={{ animationDelay: '0.3s' }}
				>
					Sonando ahora: Juntos Por Siempre
				</p>

				{/* Wedding Date Highlight */}
				<div
					className='inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-8 py-4 mb-12 animate-fade-in'
					style={{ animationDelay: '0.6s' }}
				>
					<div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
					<span className='text-lg font-medium text-green-300'>
						Febrero 27, 2026
					</span>
				</div>

				{/* Tagline */}
				<p
					className='text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in'
					style={{ animationDelay: '0.9s' }}
				>
					Unete a nosotros para una celebración de amor, música y nuevos
					comienzos mientras comenzamos nuestra mayor colaboración hasta el
					momento.
				</p>
			</div>

			{/* Scroll Indicator */}
			<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
				<div className='w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center'>
					<div className='w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse'></div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
