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

	// TODO - add in validation schema

	const handleCalculateAlk = values => {
		console.log(values);
	};

	// TODO - add in conditional inputs based on pool type selected

	return (
		<Formik initialValues={initialValues} onSubmit={handleCalculateAlk}>
			{({ values, handleChange, handleSubmit, dirty, isValid, errors }) => (
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2>Calculate Alkalinity Needed</h2>
					<div className={styles.inputs}>
						<div>
							<label htmlFor='poolType'>Pool Type: </label>
							<select
								name='poolType'
								id='poolType'
								defaultValue={'Select a Pool Type'}
								onChange={handleChange}
							>
								<option value='' hidden>
									Select a Pool Type
								</option>
								{POOL_TYPES.map(({ label }) => {
									return (
										<option key={label} value={label}>
											{label}
										</option>
									);
								})}
							</select>
						</div>

						<div>
							<label htmlFor='gallons'>Pool Gallons: </label>
							<input
								type='number'
								name='gallons'
								value={values.gallons}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='alkalinity'>Current Alkalinity: </label>
							<input type='number' name='alkalinity' onChange={handleChange} />
						</div>

						<button
							type='submit'
							disabled={!dirty || !isValid}
							className={styles.button}
						>
							Calculate
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default AlkalinityForm;
