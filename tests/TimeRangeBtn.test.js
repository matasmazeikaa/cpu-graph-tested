import React from 'react';
import { render } from '@testing-library/react';
import TimeRangeBtn from '../src/TimeRangeBtn';

const handle30DayMock = jest.fn();
const handle7DayMock = jest.fn();
const handle24HourMock = jest.fn();

const createWrapper = () => (
	<TimeRangeBtn
		handle30Day={handle30DayMock}
		handle7Day={handle7DayMock}
		handle24Hour={handle24HourMock}
	/>
);

describe('TimeRangeBtn', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render', () => {
		const wrapper = createWrapper();

		render(wrapper);
	});

	it('should render day time range button with 24 hours text', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const dayTimeRangeBtn = getByTestId('day-time-range-btn');

		expect(dayTimeRangeBtn.innerHTML).toContain('24 Hours');
	});

	it('should render week time range button with 7 days text', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const weekTimeRangeBtn = getByTestId('week-time-range-btn');

		expect(weekTimeRangeBtn.innerHTML).toContain('7 Days');
	});

	it('should render month time range button with 30 days text', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const monthTimeRangeBtn = getByTestId('month-time-range-btn');

		expect(monthTimeRangeBtn.innerHTML).toContain('30 Days');
	});

	it('should call handle24Hours when day time range button is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const dayTimeRangeBtn = getByTestId('day-time-range-btn');

		dayTimeRangeBtn.click();

		expect(handle24HourMock).toHaveBeenCalled();
	});

	it('should call handle7Days when week time range button is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const weekTimeRangeBtn = getByTestId('week-time-range-btn');

		weekTimeRangeBtn.click();

		expect(handle7DayMock).toHaveBeenCalled();
	});

	it('should call handle30Days when month time range button is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const monthTimeRangeBtn = getByTestId('month-time-range-btn');

		monthTimeRangeBtn.click();

		expect(handle30DayMock).toHaveBeenCalled();
	});
});
