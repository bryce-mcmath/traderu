import { IPerformance, IPortfolio, IUserStock } from '../../utils/types';

const getPortfolioByPortfolioId = (
	userId: string | number,
	portfolioId: string | number
) => {
	// @TODO return pg query
	const portfolioPerf: IPerformance[] = [
		{ date_time: '2020-03-21', value: '2222112' },
		{ date_time: '2020-03-23', value: '2321312' }
	];
	const tslaPerformance: IPerformance[] = [
		{ date_time: '2020-03-21', value: '2222112' },
		{ date_time: '2020-03-23', value: '2321312' }
	];
	const stocks: IUserStock[] = [
		{ symbol: 'TSLA', currentValue: '32.11', stockPerformance: tslaPerformance }
	];

	const portfolio1: IPortfolio = {
		name: 'Testington Userham',
		value: '2341121',
		cash: '2341121',
		buying_power: '2341121',
		created_at: '2020-03-21',
		portfolioPerformance: portfolioPerf,
		userStocks: stocks
	};
	return Promise.resolve(portfolio1);
};

export default getPortfolioByPortfolioId;
