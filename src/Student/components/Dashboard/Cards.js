import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modale from '../ApplyJob/Modale.js';
import {
	AccountBalanceWalletRounded,
	Ballot,
	Work,
	Today,
} from '@material-ui/icons';
import './Dashboard.css';
import DashboardCardStyles from './DashboardCardStyles.js';
import { SvgIcon, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

function Cards({
	type,
	id,
	token,
	company,
	designation,
	compensation,
	deadline_datetime,
	additional_info,
	profileInfo,
	hasApplied,
	selectionStatus,
	setError,
	setShowError,
	setSuccess,
	setShowSuccess,
	setShowLoader,
	getDashboardInfo,
}) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const css = DashboardCardStyles();

	return (
		<>
			<Card className={css.dashboardCard}>
				<Link
					to={`student/dashboard/${type}/${id}`}
					style={{ textDecoration: 'none', color: 'black' }}
				>
					<div className={css.basicInfo}>
						<div className={css.companyName}>
							<h6>
								<SvgIcon component={Work} /> {company}
							</h6>
						</div>

						<Divider className={css.divider} variant='middle' />

						<Row className={css.inner_info}>
							<Col sm={12} md={6} lg={4} className={css.designation}>
								<h6>
									<Row>
										<Col xs={1}>
											<SvgIcon component={Ballot} />
										</Col>
										<Col xs={11} style={{ fontSize: '14px' }}>
											<div style={{ fontWeight: '600' }}> Designation:</div>
											{designation}
										</Col>
									</Row>
								</h6>
							</Col>

							<Col sm={12} md={6} lg={4} className={css.compensation}>
								<h6>
									<Row>
										<Col xs={1}>
											<SvgIcon component={AccountBalanceWalletRounded} />
										</Col>
										<Col xs={11} style={{ fontSize: '14px' }}>
											<div style={{ fontWeight: '600' }}>
												{' '}
												Compensation - CTC:
											</div>
											{compensation.toLocaleString('en-IN', {
												style: 'currency',
												currency: 'INR',
												maximumFractionDigits: '0',
											})}
										</Col>
									</Row>
								</h6>
							</Col>

							<Col sm={12} md={6} lg={4} className={css.deadline_datetime}>
								<h6>
									<Row>
										<Col xs={1}>
											<SvgIcon component={Today} />
										</Col>
										<Col xs={11} style={{ fontSize: '14px' }}>
											<div style={{ fontWeight: '600' }}> Apply before:</div>
											{new Date(deadline_datetime).toDateString() +
												', ' +
												new Date(deadline_datetime).toLocaleTimeString()}
										</Col>
									</Row>
								</h6>
							</Col>
						</Row>
					</div>
				</Link>

				{hasApplied ? (
					selectionStatus === null ? (
						<Card className={css.selectionCard}>
							<Typography className={css.selectionStatusTitle} variant='body1'>
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
							className={`${css.selectionCard} ${
								selectionStatus
									? css.selectionCardAcceptedCard
									: css.selectionCardRejectedCard
							}`}
						>
							<Typography className={css.selectionStatusText} variant='body1'>
								{selectionStatus === true ? 'ACCEPTED' : 'REJECTED'}
							</Typography>
						</Card>
					)
				) : (
					<button
						align='center'
						className={css.apply_job_button}
						onClick={handleShow}
					>
						Apply now
					</button>
				)}
			</Card>

			{show ? (
				<Modale
					show={show}
					setShow={setShow}
					token={token}
					type={type}
					id={id}
					handleClose={handleClose}
					company={company}
					designation={designation}
					compensation={compensation}
					additionalInfo={additional_info}
					profileInfo={profileInfo}
					setError={setError}
					setShowError={setShowError}
					setSuccess={setSuccess}
					setShowSuccess={setShowSuccess}
					setShowLoader={setShowLoader}
					getDashboardInfo={getDashboardInfo}
				/>
			) : (
				''
			)}
		</>
	);
}

export default Cards;
