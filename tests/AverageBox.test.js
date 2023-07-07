import React from 'react';
import { render } from '@testing-library/react';
import AverageBox from '../src/AverageBox';

const createWrapper = ({ averageProv = '0', averageReq = '0' }) => (
	<AverageBox
		averageProv={averageProv}
		averageReq={averageReq}
	/>
);

describe('ChartLayerSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render box', () => {
		const wrapper = createWrapper({});

		const { getByText, queryAllByText } = render(wrapper);

		expect(getByText('AVERAGE PROVISIONED')).toBeInTheDocument();
		expect(getByText('AVERAGE REQUESTED')).toBeInTheDocument();
		expect(queryAllByText('CPU / d')).toHaveLength(2);
	});

	it('should render averageProv and averageReq', () => {
		const { getByText } = render(createWrapper({ averageProv: '123', averageReq: '456' }));

		expect(getByText('123')).toBeInTheDocument();
		expect(getByText('456')).toBeInTheDocument();
	});
});
