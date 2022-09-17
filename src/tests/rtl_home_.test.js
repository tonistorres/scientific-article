import { render, screen,  fireEvent } from '@testing-library/react';
import Home from '../pages/Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Switch Teste Render Component Home',()=>{

	test('checking the existence of the components screen ', () => {
		render(
			<Router>
				<Home />,
			</Router>,
		);
		const btnGoFavorite = screen.getByText(/go favorites/i);
		expect(btnGoFavorite).toBeInTheDocument();

		const imgRender = screen.getByRole('img', {
			name: /logo mettzer/i,
		});
		expect(imgRender).toBeInTheDocument();

		const imgLogoBoy = screen.getByRole('img', {
			name: /logo boy/i
		});

		expect(imgLogoBoy).toBeInTheDocument();

		const comboBoxRender = screen.getByRole('combobox');
		expect(comboBoxRender).toBeInTheDocument();

		const inputText = screen.getByRole('textbox');
		expect(inputText).toBeInTheDocument();

		const btnNext = screen.getByRole('button', {
			name: /next/i
		});

		expect(btnNext).toBeInTheDocument();

		const btnPrevious = screen.getByRole('button', {
			name: /previous/i
		});

		expect(btnPrevious).toBeInTheDocument();

		const displayPage = screen.getByText(/page:/i);
		expect(displayPage).toBeInTheDocument();

	});
});

