import { Box } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import {
	DeleteAdditionalInfo,
	AddAdditionalInfo,
} from '../../api/details_page';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';

const AdditionalInfoCard = ({ field, deleteHandler }) => {
	const classes = useStyles();

	return (
		<div className={classes.additionalInfoCardParent}>
			{field}
			<span
				className={classes.additionalInfoClearBtn}
				onClick={() => {
					return deleteHandler(field);
				}}
			>
				{' '}
				<ClearIcon style={{ fontSize: '18px' }} />
			</span>
		</div>
	);
};

const ManageAdditionalInfo = ({
	additional_info,
	opening_id,
	setShowLoader,
	getDashboardInfo,
	token,
	setError,
	setShowError,
	setSuccess,
	setShowSuccess,
}) => {
	const classes = useStyles();

	const deleteHandler = (field) => {
		DeleteAdditionalInfo(token, opening_id, field)
			.then((result) => {
				setSuccess('Additional info deleted successfully');
				getDashboardInfo();
				setShowLoader(false);
				setShowSuccess(true);
			})
			.catch((err) => {
				setError('Error deleting additional info');
				getDashboardInfo();
				setShowLoader(false);
				setShowError(true);
			});
		setShowLoader(true);
	};

	const addHandler = async () => {
		const { value: field } = await Swal.fire({
			title: 'Enter the field',
			input: 'text',
			inputLabel: 'Enter the additional info field',
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return 'You need to write something!';
				}
			},
		});
		AddAdditionalInfo(token, opening_id, field)
			.then((result) => {
				setSuccess('Additional info added successfully');
				getDashboardInfo();
				setShowLoader(false);
				setShowSuccess(true);
			})
			.catch((err) => {
				setError('Error deleting additional info');
				getDashboardInfo();
				setShowLoader(false);
				setShowError(true);
			});
		setShowLoader(true);
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				boxShadow: 1,
				borderRadius: 10,
				p: 1,
				width: '200px',
				textAlign: 'center',
				margin: '0.25rem',
			}}
		>
			<div style={{ fontSize: '19px', color: '#334878', fontWeight: '600' }}>
				{' '}
				Additional Info
				<span
					className={classes.additionalInfoAddBtn}
					onClick={() => addHandler()}
				>
					{' '}
					<AddCircleOutlineIcon />
				</span>
			</div>
			<div className={classes.additionalInfo}>
				{additional_info.map((field, i) => {
					return (
						<AdditionalInfoCard
							field={field}
							deleteHandler={deleteHandler}
							key={i}
						/>
					);
				})}
			</div>
		</Box>
	);
};

export default ManageAdditionalInfo;
