import React from 'react';

function TimeRangeBtn({
	handle30Day,
	handle7Day,
	handle24Hour,
	dayTimeRangeBtn = '',
	weekTimeRangeBtn = '',
	monthTimeRangeBtn = '',
}) {
	return (
		<>
			<button
				className={dayTimeRangeBtn}
				onClick={handle24Hour}
				type="button"
				data-testid="day-time-range-btn"
			>
				24 Hours
			</button>
			<button
				className={weekTimeRangeBtn}
				onClick={handle7Day}
				type="button"
				data-testid="week-time-range-btn"
			>
				7 Days
			</button>
			<button
				className={monthTimeRangeBtn}
				onClick={handle30Day}
				type="button"
				data-testid="month-time-range-btn"
			>
				30 Days
			</button>
		</>
	);
}
export default TimeRangeBtn;
