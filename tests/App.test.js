import React from 'react';
import axios from 'axios';

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../src/App';
import testData from './mockThirtyDayData.json';

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve({ data: testData }));

const createWrapper = () => <App />;

describe('App', () => {
	it('should render average provisioned and avaregage requested correctly with current test data', async () => {
		const { getByText, container } = render(createWrapper());

		await waitFor(() => {
			expect(getByText('410.62')).toBeInTheDocument();
			expect(getByText('283.57')).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-area').length).toBeTruthy();
		});
	});

	it('should render average provisioned and avaregage requested correctly with current test data when range is 7 days', async () => {
		const wrapper = createWrapper();

		const { getByTestId, getByText, container } = render(wrapper);

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-area').length).toBeTruthy();
		});

		const weekTimeRangeBtn = getByTestId('week-time-range-btn');

		await act(() => {
			weekTimeRangeBtn.click();
		});

		await waitFor(() => {
			expect(getByText('414.49')).toBeInTheDocument();
			expect(getByText('286.31')).toBeInTheDocument();
		});
	});

	it('should render average provisioned and avaregage requested correctly with current test data when range is day', async () => {
		const wrapper = createWrapper();

		const { getByTestId, getByText, container } = render(wrapper);

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-area').length).toBeTruthy();
		});

		const dayTimeRangeButton = getByTestId('day-time-range-btn');

		await act(() => {
			dayTimeRangeButton.click();
		});

		await waitFor(() => {
			expect(getByText('364.44')).toBeInTheDocument();
			expect(getByText('285.14')).toBeInTheDocument();
		});
	});

	it('should correctly change from 30 day to 7 day to 1 day', async () => {
		const wrapper = createWrapper();

		const { getByTestId, getByText, container } = render(wrapper);

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-area').length).toBeTruthy();
		});

		const weekTimeRangeBtn = getByTestId('week-time-range-btn');
		const dayTimeRangeButton = getByTestId('day-time-range-btn');
		const monthTimeRangeBtn = getByTestId('month-time-range-btn');

		await act(() => {
			weekTimeRangeBtn.click();
		});

		await waitFor(() => {
			expect(getByText('414.49')).toBeInTheDocument();
			expect(getByText('286.31')).toBeInTheDocument();
		});

		await act(() => {
			dayTimeRangeButton.click();
		});

		await waitFor(() => {
			expect(getByText('364.44')).toBeInTheDocument();
			expect(getByText('285.14')).toBeInTheDocument();
		});

		await act(() => {
			monthTimeRangeBtn.click();
		});

		await waitFor(() => {
			expect(getByText('410.62')).toBeInTheDocument();
			expect(getByText('283.57')).toBeInTheDocument();
		});
	});

	it('should render area or bar chart correctly when toggle is clicked', async () => {
		const wrapper = createWrapper();

		const { getByTestId, container } = render(wrapper);

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-area').length).toBeTruthy();
		});

		const areaButton = getByTestId('area-button');
		const barButton = getByTestId('bar-button');

		await act(() => {
			areaButton.click();
		});

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-area').length).toBeTruthy();
		});

		await act(() => {
			barButton.click();
		});

		await waitFor(() => {
			expect(container.getElementsByClassName('recharts-bar').length).toBeTruthy();
		});
	});

	it('should render error in case of mock data fetch error', () => {
		axios.get.mockImplementation(() => Promise.reject(new Error('error')));

		const wrapper = createWrapper();

		const { getByText } = render(wrapper);

		waitFor(() => {
			expect(getByText('Error fetching data')).toBeInTheDocument();
		});
	});
});
