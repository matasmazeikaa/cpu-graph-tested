import React from 'react';

function ChartViewSelect({
	handleAreaClick,
	handleBarClick,
	viewSelect = '',
	areaBtn = '',
	barBtn = '',
}) {
	return (
		<div className={viewSelect}>
			<button
				className={areaBtn}
				onClick={handleAreaClick}
				type="button"
				data-testid="area-button"
			/>
			<button
				className={barBtn}
				onClick={handleBarClick}
				type="button"
				data-testid="bar-button"
			/>
		</div>
	);
}
export default ChartViewSelect;
