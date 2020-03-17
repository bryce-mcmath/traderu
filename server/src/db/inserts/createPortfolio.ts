import { IPortfolio } from '../../utils/types';

const createPortfolio = (userId: string | number, portfolioName: string) => {
	// @TODO
	// if the name is taken, newPortfolio should be:
	// {errors: [{msg: "You're already using that name for another portfolio!""}]}
	// then we check the format of the JSON response in the front end to decide what gets displayed
	const newPortfolio: IPortfolio = {
		name: 'Risky Biz',
		value: '100000',
		cash: '100000',
		buying_power: '100000',
		created_at: '2020-03-24'
	};
	return Promise.resolve(newPortfolio);
};

export default createPortfolio;
