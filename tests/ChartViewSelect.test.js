import React from 'react';
import { render } from '@testing-library/react';
import ChartViewSelect from '../src/ChartViewSelect';

const handleAreaClickMock = jest.fn();
const handleBarClickMock = jest.fn();

const createWrapper = () => (
	<ChartViewSelect
		handleAreaClick={handleAreaClickMock}
		handleBarClick={handleBarClickMock}
	/>
);

describe('ChartViewSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render', () => {
		const wrapper = createWrapper();

		render(wrapper);
	});

	it('should render area-click and bar-button buttons', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const areaClickBtn = getByTestId('area-button');
		const barClickBtn = getByTestId('bar-button');

		expect(areaClickBtn).toBeTruthy();
		expect(barClickBtn).toBeTruthy();
	});

	it('should call handleAreaClick when area-click button is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const areaClickBtn = getByTestId('area-button');

		areaClickBtn.click();

		expect(handleAreaClickMock).toHaveBeenCalled();
	});

	it('should call handleBarClick when bar-button button is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const barClickBtn = getByTestId('bar-button');

		barClickBtn.click();

		expect(handleBarClickMock).toHaveBeenCalled();
	});
});
