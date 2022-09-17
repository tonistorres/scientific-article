import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pagination from "../components/Pagination/Pagination";

describe('Testing component Pagination',()=>{


	it("if you don't pass props", () => {

		render(
			<Router>
				<Pagination />,
			</Router>,
		);

		const btnPreviousRenderScreen = screen.getByRole('button', {
			name: /previous/i
		  });
		expect(btnPreviousRenderScreen).toBeInTheDocument();

	  });


});
