import Hero from './Hero';
import WeddingDetails from './WeddingDetails';
import RSVPSection from './RSVPSection';

const Index = () => {
	return (
		<div className='min-h-screen bg-black text-white'>
			<Hero />
			<WeddingDetails />
			<RSVPSection />
		</div>
	);
};

export default Index;
