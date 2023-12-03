import { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import { 
	 Work } from '@material-ui/icons';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DashboardCardStyles from './DashboardCardStyles.js';
import { SvgIcon, Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';
import { Button } from 'react-bootstrap';
import { WithDrawApplication } from '../../api/dashboard';
import Swal from 'sweetalert2';

function ApplicationCard({
	type,
	id,
	company,
	resume,
	additional_info,
	selected,
	deadline_datetime,
	setError,
	setShowError,
	setSuccess,
	setShowSuccess,
	getDashboardInfo,
	setShowLoader,
	token,
}) {
	const css = DashboardCardStyles();

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const withDraw = (e,type) => {
		
		Swal.fire({
			title: 'WithDraw Application?',
			text: 'Once WithDrawn, you can apply again before the deadline',
			showCancelButton: true,
			confirmButtonText: 'WithDraw',
			denyButtonText: `Cancel`,
			icon: 'warning',
		}).then((res) => {
			if (res.isConfirmed) {
				const data = {
					application_id: id,
					opening_type: type==='placements'?'Placement':'Internship',
				};

				WithDrawApplication(token, data)
					.then((res) => {
						console.log(res);
						setShowSuccess(true);
						setSuccess('Application withdrawn successfully');
						getDashboardInfo();
						setShowLoader(false);
					})
					.catch((err) => {
						console.log(err);

						setShowError(true);

						setError('Error withdrawing application');
						setShowLoader(false);
					});

				setShowLoader(true);
			}
		});

		e.stopPropagation();
	};
	const label_style={
		padding: "5px 10px",
		borderRadius: "20px",
		fontSize: "15px",
		fontWeight: "bold",
		backgroundColor: "#FF3FA4",
		marginLeft: "10px",
		color: "#ffffff",
		}
	return (
		<Fragment>
			<Card className={css.applicationCard}>
				<Link
					to={`student/dashboard/${type}/${id}`}
					style={{ textDecoration: 'none', color: 'black' }}
				>
					<div className={css.applicationInfo}>
						<Grid container className={css.applicationTitleGrid}>
							<Grid
								item
								xs={12}
								sm={9}
								className={css.applicationTitleElements}
							>
								<Typography
									variant='h5'
									component='h6'
									style={{ marginLeft: '20px' }}
								>
									<SvgIcon component={Work} /> {company }
									{type==='internships'?(
										<span style={label_style}>Internship</span>
									):(
										<span style={{...label_style,backgroundColor:"#7057ff"}}>Placement</span>
									)}
								</Typography>
								
							</Grid>
							<Grid item xs={12} sm={3} className={css.applicationTitleStatus}>
								{selected === null ? (
									<Card className={css.selectionCardOngoing}>
										<Typography
											className={css.selectionStatusTitle}
											variant='body1'
										>
											APPLIED
										</Typography>
										<Typography
											className={css.selectionStatusSubtitle}
											variant='body2'
										>
											In Progress...
										</Typography>
									</Card>
								) : (
									<Card
										className={`${css.selectionCardApplication} ${
											selected
												? css.selectionCardAccepted
												: css.selectionCardRejected
										}`}
									>
										<Typography
											className={css.selectionStatusSubtitle}
											variant='body1'
										>
											{selected === true ? 'ACCEPTED' : 'REJECTED'}
										</Typography>
									</Card>
								)}
							</Grid>
						</Grid>

						<Divider className={css.divider} variant='middle' />

						<Grid
							container
							direction='column'
							className={css.applicationGridContainer}
						>
							<Grid item>
								<div className='application-card-fields'>
									<SvgIcon component={InsertDriveFileIcon} />
									{' Resume: '}
									<a href={resume.link}>{resume.name.substring(16)}</a>
								</div>
							</Grid>
							{Object.entries(JSON.parse(additional_info)).map(([key, val]) => (
								<Grid item key={key}>
									<div className='application-card-fields' key={key}>
										<LabelIcon /> {capitalizeFirstLetter(key)}: {val}
									</div>
								</Grid>
							))}
						</Grid>
					</div>
				</Link>

				{deadline_datetime > new Date() ? (
					<div>
						<Divider />
						<Grid item style={{ textAlign: 'center' }}>
							<Button
								className={css.withDrewButton}
								onClick={(e)=>{
									withDraw(e,type);
								}}
							>
								<Typography variant='subtitle2'>
									Withdraw Application
								</Typography>
							</Button>
						</Grid>
					</div>
				) : null}
			</Card>
		</Fragment>
	);
}

export default ApplicationCard;
