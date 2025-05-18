import React from 'react';
import SendVote from './SendVote';

const Dashboard: React.FC = () => {
	return (
		<div className='mx-auto p-2'>
			<h1 className='text-2xl font-bold mb-4 text-center'>
				Vota por tu canción
			</h1>
			<div className='flex flex-col md:flex-row gap-6'>
				<div className='w-full md:w-1/2 bg-white rounded shadow p-4 mb-4 md:mb-0'>
					<h2 className='text-lg font-semibold mb-2'>
						Canciones Seleccionadas
					</h2>
					<p className='text-gray-500'>
						Aquí irá la lista de canciones seleccionadas y sus votos.
					</p>
				</div>
				<div className='w-full md:w-1/2'>
					<SendVote />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
