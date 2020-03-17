import { IPortfolio } from '../../utils/types';

const getPortfoliosByUserId = (user_id: string | number) => {
	// @TODO return pg query
	// see vicdevs repo for inspo
	const portfolio1: IPortfolio = {
		name: 'Testington Userham',
		value: '2341121',
		cash: '2341121',
		created_at: '2020-03-21'
	};
	const portfolio2: IPortfolio = {
		name: 'Testington Userham',
		value: '2341121',
		cash: '2341121',
		created_at: '2020-03-21'
	};
	return Promise.resolve([portfolio1, portfolio2]);
};

export default getPortfoliosByUserId;
