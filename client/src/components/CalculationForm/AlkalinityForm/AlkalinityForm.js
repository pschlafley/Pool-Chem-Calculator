import React from 'react';
import { Formik } from 'formik';

import {
	POOL_TYPES,
	rectangleVolume,
	circularVolume,
	ovalVolume,
	oblongVolume,
} from '../../../calculations/pool-volume';
import { calculateTotalAlkalinity } from '../../../calculations/pool-alkalinity';
import styles from './AlkalinityForm.module.css';

const AlkalinityForm = () => {
	const initialValues = {
		gallons: 0,
		alkalinity: 100, // measured in PPM
		poolType: '',
	};

	return (
		<Formik initialValues={initialValues}>
			<form className={styles.form}>
				<h2>Calculate Alkalinity Needed</h2>
				<div className={styles.inputs}>
					<div>
						<label htmlFor='gallons'>Pool Gallons: </label>
						<input type='number' name='gallons' />
					</div>

					<div>
						<label htmlFor='alkalinity'>Current Alkalinity: </label>
						<input type='number' name='alkalinity' />
					</div>

					<div>
						<label htmlFor='poolType'>Pool Type: </label>
						<select name='poolType' id='poolType'>
							<option value='' selected hidden>
								Select a Pool Type
							</option>
							{POOL_TYPES.map(({ id, label }) => {
								return (
									<option key={id} value={label}>
										{label}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</form>
		</Formik>
	);
};

export default AlkalinityForm;
