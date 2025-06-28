import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './Invitation/Index';
import VotingIndex from './Voting/Index';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/Vote' element={<VotingIndex />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
