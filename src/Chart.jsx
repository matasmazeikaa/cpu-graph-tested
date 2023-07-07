import React, { useState } from 'react';
import ChartLayerSelect from './ChartLayerSelect';
import styles from './style.module.css';
import ChartView from './ChartView';

function Chart({
	data,
	isArea = false,
	chartLayerSelect,
	provCheckbox,
	reqCheckbox,
	checkmarkProv,
	checkmarkReq,
	timeRange,
}) {
	const [chartLayer, setChartLayer] = useState({
		cpuProvActive: true,
		cpuReqActive: true,
	});

	const handleProvLayer = (e) => {
		setChartLayer({
			...chartLayer,
			cpuProvActive: e.target.checked,
		});
	};

	const handleReqLayer = (e) => {
		setChartLayer({
			...chartLayer,
			cpuReqActive: e.target.checked,
		});
	};

	const handleProvDataKey = () => (chartLayer.cpuProvActive === true ? 'provisioned' : '');

	const handleReqDataKey = () => (chartLayer.cpuReqActive === true ? 'requested' : '');

	const handleInterval = () => (timeRange === 'twenty-four-hour' ? ' ' : 24);

	return (
		<div className={styles.chart}>
			<ChartView
				isArea={isArea}
				data={data}
				handleProvDataKey={handleProvDataKey()}
				handleReqDataKey={handleReqDataKey()}
				interval={handleInterval()}
			/>
			<ChartLayerSelect
				provLayer={chartLayer.cpuProvActive}
				reqLayer={chartLayer.cpuReqActive}
				handleProvLayer={handleProvLayer}
				handleReqLayer={handleReqLayer}
				chartLayerSelect={chartLayerSelect}
				provCheckbox={provCheckbox}
				reqCheckbox={reqCheckbox}
				checkmarkProv={checkmarkProv}
				checkmarkReq={checkmarkReq}
			/>
		</div>
	);
}
export default Chart;
