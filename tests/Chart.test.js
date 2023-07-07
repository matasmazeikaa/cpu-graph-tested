import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Chart from '../src/Chart';

const createWrapper = () => <Chart timeRange="twenty-four-hour" />;

describe('Chart', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render', () => {
		const wrapper = createWrapper();

		render(wrapper);
	});

	it('should render cpu provisioned input with checked attribute when provLayer is true', async () => {
		const wrapper = createWrapper({ provLayer: true });

		const { getByTestId } = render(wrapper);

		const cpuProvInput = getByTestId('cpu-provisioned-input');

		expect(cpuProvInput.checked).toBeTruthy();

		await act(() => {
			cpuProvInput.click();
		});

		expect(cpuProvInput.checked).toBeFalsy();
	});

	it('should render cpu requested input with checked attribute when reqLayer is true', async () => {
		const wrapper = createWrapper({ reqLayer: true });

		const { getByTestId } = render(wrapper);

		const cpuReqInput = getByTestId('cpu-requested-input');

		expect(cpuReqInput.checked).toBeTruthy();

		await act(() => {
			cpuReqInput.click();
		});

		expect(cpuReqInput.checked).toBeFalsy();
	});
});
