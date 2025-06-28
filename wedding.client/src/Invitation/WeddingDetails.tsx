import { Calendar, MapPin, Shirt } from 'lucide-react';
import { SiGooglemaps, SiWaze } from 'react-icons/si';

const WeddingDetails = () => {
	const details = [
		{
			icon: Calendar,
			title: 'Cuando?',
			content: 'Viernes, Febrero 27, 2026',
			subtitle: 'Ceremonia a las 4:00 PM',
			description: 'Recepción a seguir a las 6:00 PM',
		},
		{
			icon: MapPin,
			title: 'Donde?',
			content: 'Hacienda Riojana',
			subtitle: (
				<div className='flex flex-col items-start gap-2'>
					<span className='flex flex-row gap-4'>
						<a
							href='https://maps.app.goo.gl/WsMP6gz1ZWEYt5ba7'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 underline text-green-300 hover:text-green-400 transition-colors'
						>
							<SiGooglemaps className='w-5 h-5 text-green-400' />
							Google Maps
						</a>
						<a
							href='https://waze.com/ul?ll=6.1769,-75.3382&navigate=yes'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 underline text-green-300 hover:text-green-400 transition-colors'
						>
							<SiWaze className='w-5 h-5 text-green-400' />
							Waze
						</a>
					</span>
					Marinilla, Antioquia
				</div>
			),
			description: 'Parqueadero disponible en el lugar',
		},
		{
			icon: Shirt,
			title: 'Código de Vestimenta',
			content: 'Tipo cóctel',
			subtitle: 'Piensa en elegante y cómodo',
			description: 'Colores bienvenidos, pero por favor evita el blanco',
		},
	];

	return (
		<section className='py-20 px-6 bg-gradient-to-b from-black to-gray-900'>
			<div className='max-w-6xl mx-auto'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-4 text-white'>
						Los Detalles
					</h2>
					<div className='w-24 h-1 bg-green-400 mx-auto rounded-full'></div>
				</div>

				{/* Details Grid */}
				<div className='grid md:grid-cols-3 gap-8'>
					{details.map((detail, index) => (
						<div
							key={index}
							className='group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10'
							style={{ animationDelay: `${index * 0.2}s` }}
						>
							{/* Icon */}
							<div className='mb-6'>
								<div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors'>
									<detail.icon className='w-8 h-8 text-green-400' />
								</div>
							</div>

							{/* Content */}
							<h3 className='text-2xl font-bold text-white mb-3'>
								{detail.title}
							</h3>
							<p className='text-xl text-green-300 font-semibold mb-2'>
								{detail.content}
							</p>
							<div className='text-gray-300 mb-2'>{detail.subtitle}</div>
							<p className='text-gray-400 text-sm'>{detail.description}</p>

							{/* Decorative Element */}
							<div className='mt-6 h-1 w-full bg-gradient-to-r from-transparent via-green-500/30 to-transparent rounded-full'></div>
						</div>
					))}
				</div>

				{/* Additional Info */}
				<div className='mt-16 text-center'>
					<div className='bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 max-w-2xl mx-auto'>
						<h3 className='text-2xl font-bold text-white mb-4'>
							De nosotros para ti
						</h3>
						<p className='text-gray-300 leading-relaxed'>
							Tu presencia es el mejor regalo que podríamos pedir. ¡Estamos
							deseando celebrar este día tan especial con nuestras personas
							favoritas y bailar toda la noche con nuestras canciones favoritas!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WeddingDetails;
