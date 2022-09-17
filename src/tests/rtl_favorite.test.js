import { render, screen } from '@testing-library/react';
import Favorite from '../pages/Favorite/Favorite';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Switch Teste Render Component Favorite', () => {
	test('checking the existence of the components screen', () => {
		render(
			<Router>
				<Favorite />,
			</Router>,
		);

		const img = screen.getByRole('img', {
			name: /logo mettzer/i,
		});
		expect(img).toBeInTheDocument();

		const buttonHomeRender = screen.getByRole('button', {
			name: /home/i,
		});
		expect(buttonHomeRender).toBeInTheDocument();

		const colAuthors = screen.getByRole('columnheader', {
			name: /authors/i,
		});
		expect(colAuthors).toBeInTheDocument();

		const colType = screen.getByRole('columnheader', {
			name: /type/i,
		});

		expect(colType).toBeInTheDocument();

		const colTitle = screen.getByRole('columnheader', {
			name: /title/i,
		});

		expect(colTitle).toBeInTheDocument();

		const colDecription = screen.getByRole('columnheader', {
			name: /description\(s\)/i,
		});

		expect(colDecription).toBeInTheDocument();

		const colUrls = screen.getByRole('columnheader', {
			name: /url\(s\)/i,
		});

		expect(colUrls).toBeInTheDocument();

		const colFavorite = screen.getByRole('columnheader', {
			name: /favorite/i,
		});

		expect(colFavorite).toBeInTheDocument();
	});
});
