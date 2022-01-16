import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { calculateTotalAlkalinity } from '../../../calculations/pool-alkalinity';
import styles from './AlkalinityForm.module.css';

const AlkalinityForm = () => {
	const [alkNeeded, setAlkNeeded] = useState(null);

	const initialValues = {
		gallons: 10_000,
		alkalinity: 100, // measured in PPM
	};

	const schema = yup.object().shape({
		gallons: yup.number().required(),
		alkalinity: yup.number().required(),
	});

	const handleCalculateAlk = ({ gallons, alkalinity }) => {
		const poundsAlkNeeded = calculateTotalAlkalinity(gallons, alkalinity);
		setAlkNeeded(poundsAlkNeeded);
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleCalculateAlk}
			validationSchema={schema}
		>
			{({ handleChange, handleSubmit, dirty, isValid }) => (
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2>Calculate Alkalinity Needed</h2>

					{alkNeeded && (
						<div className={styles.resultContainer}>
							<p>Total Baking Soda to Add:</p>
							<p className={styles.result}>{alkNeeded}</p>
						</div>
					)}

					<div className={styles.inputs}>
						<div>
							<label htmlFor='gallons'>Pool Gallons: </label>
							<input
								type='number'
								name='gallons'
								placeholder='Enter Gallons'
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='alkalinity'>Current Alkalinity (in PPM): </label>
							<input
								type='number'
								name='alkalinity'
								onChange={handleChange}
								placeholder='Enter Alkalinity'
							/>
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
