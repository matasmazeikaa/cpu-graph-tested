import React from 'react';

function ChartLayerSelect({
	checkmarkProv = '',
	checkmarkReq = '',
	handleProvLayer,
	handleReqLayer,
	provLayer = false,
	reqLayer = false,
	chartLayerSelect = '',
	provCheckbox = '',
	reqCheckbox = '',
}) {
	return (
		<div className={chartLayerSelect}>
			<label
				className={provCheckbox}
				htmlFor="cpuProvisioned"
				data-testid="cpu-provisioned"
			>
				CPU provisioned
				<input
					type="checkbox"
					id="cpuProvisioned"
					checked={provLayer}
					onChange={handleProvLayer}
					data-testid="cpu-provisioned-input"
				/>
				<span className={checkmarkProv} />
			</label>
			<label
				className={reqCheckbox}
				htmlFor="cpuRequested"
				data-testid="cpu-requested"
			>
				CPU requested
				<input
					type="checkbox"
					id="cpuRequested"
					checked={reqLayer}
					onChange={handleReqLayer}
					data-testid="cpu-requested-input"
				/>
				<span className={checkmarkReq} />
			</label>
		</div>
	);
}
export default ChartLayerSelect;
