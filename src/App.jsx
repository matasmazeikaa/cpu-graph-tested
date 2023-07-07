import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Chart from './Chart';
import AverageBox from './AverageBox';
import TimeRangeBtn from './TimeRangeBtn';
import ChartViewSelect from './ChartViewSelect';
import { fetchTestData } from './api';

function App() {
	const [cpuData, setCpuData] = useState([]);
	const [timeRange, setTimeRange] = useState('thirty-day');
	const [isArea, setIsArea] = useState(true);
	const [isError, setIsError] = useState(false);

	const handleAreaClick = () => {
		setIsArea(true);
	};

	const handleBarClick = () => {
		setIsArea(false);
	};

	const monthPeriod = -720;
	const weekPeriod = -168;
	const twentyFourHourPeriod = -24;

	const handleIntegerConvert = (input) =>
		input.map((item) => ({
			timestamp: parseInt(item.timestamp, 2),
			value: parseFloat(item.value),
		}));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchTestData();

				const provisionedRaw = response.data.provisioned[0].values;
				const requestedRaw = response.data.requested[0].values;

				const cpuProvisionedData = handleIntegerConvert(provisionedRaw);
				const cpuRequestedData = handleIntegerConvert(requestedRaw);
				const mergedArray1 = [];

				for (let i = 0; i < cpuProvisionedData.length; i += 1) {
					const newArray = {
						timestamp: cpuProvisionedData[i].timestamp,
						provisioned: cpuProvisionedData[i].value / 1000,
						requested: cpuRequestedData[i].value / 1000,
					};
					mergedArray1.push(newArray);
				}

				const hourlyAgregated = mergedArray1.map((item) => {
					const date = new Date(item.timestamp);
					const year = date.getFullYear();
					const month = date.getMonth() + 1;
					const day = date.getDate();
					const hour = date.getHours();
					const minute = date.getMinutes();
					const dateString = `${year}-${month.toString().padStart(2, '0')}-${day
						.toString()
						.padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute
						.toString()
						.padStart(2, '0')}`;
					return { ...item, timestamp: dateString };
				});

				setCpuData(hourlyAgregated);
			} catch (err) {
				setIsError(true);
			}
		};

		fetchData();
	}, []);

	const calculatePeriodAverage = (input) => {
		const timeRangeTemp = cpuData.slice(input);

		const initValue = timeRangeTemp.reduce(
			(acc, curr) => ({
				...acc,
				provSum: acc.provSum + curr.provisioned,
				reqSum: acc.reqSum + curr.requested,
				count: acc.count + 1,
			}),
			{ provSum: 0, reqSum: 0, count: 0 }
		);

		const provisionedAvg = (initValue.provSum / initValue.count).toFixed(2);
		const requestedAvg = (initValue.reqSum / initValue.count).toFixed(2);
		return [provisionedAvg, requestedAvg];
	};

	const handleAverageData = () => {
		if (timeRange === 'thirty-day') {
			return calculatePeriodAverage(monthPeriod);
		}
		if (timeRange === '7-day') {
			return calculatePeriodAverage(weekPeriod);
		}

		return calculatePeriodAverage(twentyFourHourPeriod);
	};

	const handle30Day = () => {
		setTimeRange('thirty-day');
	};

	const handle7Day = () => {
		setTimeRange('7-day');
	};

	const handle24Hour = () => {
		setTimeRange('twenty-four-hour');
	};

	const getDayOfMonth = () =>
		cpuData.map((item) => {
			const dateItems = item.timestamp.split(' ');
			const date = dateItems[0];
			const day = new Date(date).getDate();
			const result = parseInt(String(day), 2);
			return {
				timestamp: result,
				provisioned: item.provisioned.toFixed(2),
				requested: item.requested.toFixed(2),
			};
		});
	const dayOfMonth = getDayOfMonth();

	const getHourOfMonth = () =>
		cpuData.map((item) => {
			const dateItems = item.timestamp.split(' ');
			const date = dateItems[1];
			return {
				timestamp: date,
				provisioned: item.provisioned.toFixed(2),
				requested: item.requested.toFixed(2),
			};
		});

	const hourOfDay = getHourOfMonth();

	const handleChartData = () => {
		if (timeRange === 'thirty-day') {
			return dayOfMonth.slice(-720);
		}
		if (timeRange === '7-day') {
			return dayOfMonth.slice(-168);
		}

		return hourOfDay.slice(-24);
	};

	return isError ? (
		<div>Error fetching data </div>
	) : (
		<div className={styles.body}>
			<div className={styles.main}>
				<div className={styles.sidemenu}>some kind of menu</div>
				<section className={styles.cpuUtilization}>
					<p className={styles.header}>CPU Utilization</p>
					<div className={styles.dash_box}>
						<div className={styles.dashboardMenu}>
							<div className={styles.timeRange}>
								<TimeRangeBtn
									handle24Hour={handle24Hour}
									handle7Day={handle7Day}
									handle30Day={handle30Day}
									dayTimeRangeBtn={`${styles.timeRangeBtn} ${
										timeRange === 'twenty-four-hour'
											? styles.timeRangeFocused
											: ''
									}`}
									weekTimeRangeBtn={`${styles.timeRangeBtn} ${
										timeRange === '7-day' ? styles.timeRangeFocused : ''
									}`}
									monthTimeRangeBtn={`${styles.timeRangeBtn} ${
										timeRange === 'thirty-day' ? styles.timeRangeFocused : ''
									}`}
								/>
							</div>
							<div>
								<ChartViewSelect
									handleAreaClick={handleAreaClick}
									handleBarClick={handleBarClick}
									areaBtn={`${styles.areaBtn} ${
										isArea ? styles.areaBtnFocused : ''
									}`}
									barBtn={`${styles.barBtn} ${
										!isArea ? styles.barBtnFocused : ''
									}`}
									viewSelect={styles.viewSelect}
								/>
							</div>
						</div>
						<div className={styles.dashboard}>
							<AverageBox
								averageProv={handleAverageData()[0]}
								averageReq={handleAverageData()[1]}
							/>
							<Chart
								data={handleChartData()}
								isArea={isArea}
								chartLayerSelect={styles.chartLayerSelect}
								provCheckbox={styles.provCheckbox}
								reqCheckbox={styles.reqCheckbox}
								checkmarkProv={styles.checkmarkProv}
								checkmarkReq={styles.checkmarkReq}
								timeRange={timeRange}
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
