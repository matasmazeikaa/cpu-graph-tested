import React from 'react';
import { render } from '@testing-library/react';
import ChartLayerSelect from '../src/ChartLayerSelect';

const handleProvLayerMock = jest.fn();
const handleReqLayerMock = jest.fn();

const createWrapper = ({ provLayer, reqLayer } = { provLayer: false, reqLayer: false }) => (
	<ChartLayerSelect
		handleProvLayer={handleProvLayerMock}
		handleReqLayer={handleReqLayerMock}
		provLayer={provLayer}
		reqLayer={reqLayer}
	/>
);

describe('ChartLayerSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render', () => {
		const wrapper = createWrapper();

		render(wrapper);
	});

	it('should render cpu provisioned input with text', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const cpuProvInput = getByTestId('cpu-provisioned');

		expect(cpuProvInput).toBeTruthy();
		expect(cpuProvInput.textContent).toContain('CPU provisioned');
	});

	it('should render cpu requested input with text', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const cpuReqInput = getByTestId('cpu-requested');

		expect(cpuReqInput).toBeTruthy();
		expect(cpuReqInput.textContent).toContain('CPU requested');
	});

	it('should call handleProvLayer when cpu provisioned input is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const cpuProvInput = getByTestId('cpu-provisioned');

		cpuProvInput.click();

		expect(handleProvLayerMock).toHaveBeenCalled();
	});

	it('should call handleReqLayer when cpu requested input is clicked', () => {
		const wrapper = createWrapper();

		const { getByTestId } = render(wrapper);

		const cpuReqInput = getByTestId('cpu-requested');

		cpuReqInput.click();

		expect(handleReqLayerMock).toHaveBeenCalled();
	});

	it('should render cpu provisioned input with checked attribute when provLayer is true', () => {
		const wrapper = createWrapper({ provLayer: true });

		const { getByTestId } = render(wrapper);

		const cpuProvInput = getByTestId('cpu-provisioned-input');

		expect(cpuProvInput).toBeTruthy();
		expect(cpuProvInput.checked).toBeTruthy();
	});

	it('should render cpu requested input with checked attribute when reqLayer is true', () => {
		const wrapper = createWrapper({ reqLayer: true });

		const { getByTestId } = render(wrapper);

		const cpuReqInput = getByTestId('cpu-requested-input');

		expect(cpuReqInput).toBeTruthy();
		expect(cpuReqInput.checked).toBeTruthy();
	});
});
