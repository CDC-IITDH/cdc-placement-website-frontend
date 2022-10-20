import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Dashboard.css';
import { Redirect } from 'react-router-dom';
import Searchbar from '../SearchBar/SearchBar';
import { Container, Chip } from '@material-ui/core';
import { Fragment } from 'react';
import Cards from './Cards';

const Dashboard = ({
	dashboardInfo,
	auth,
	setShowLoader,
	profileInfo,
	token,
	setError,
	setShowError,
	setSuccess,
	setShowSuccess,
	getDashboardInfo,
}) => {
	const [isloading, setIsloading] = useState(true);
	const [searched, setSearched] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setIsloading(false);
		setShowLoader(false);
	}, [dashboardInfo]);

	const [dashboardview, setDashboardview] = useState([]);

	useEffect(() => {
		if (dashboardInfo.length > 0) {
			setDashboardview(dashboardInfo[0]);
		}
		clearSearch();
	}, [dashboardInfo]);

	const clearSearch = () => {
		setSearchTerm('');
		setSearched('');
		setDashboardview(dashboardInfo[0]);
	};
	if (dashboardInfo[0]) {
		if (!auth) {
			return <Redirect to='/' />;
		} else {
			return isloading ? (
				<div className='loader-container'>
					<div className='loader' />
				</div>
			) : (
				<div className='Dashboard'>
					{dashboardview && (
						<Searchbar
							searchBarInfo={dashboardInfo[0]}
							setDashboardview={setDashboardview}
							setSearched={setSearched}
							searched={searched}
							dashboardInfo={dashboardInfo}
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					)}
					{searched && (
						<p style={{ 'padding-left': '5%' }}>
							Showing search results for{' '}
							<Chip label={searched} onDelete={clearSearch} />{' '}
						</p>
					)}
					<div className='Listing'>
						<Tabs defaultActiveKey='ongoing'>
							<Tab eventKey='ongoing' title='Current Placements'>
								{dashboardview && dashboardview?.ongoing.length === 0 ? (
									<Container>
										<h4 style={{ color: '#787878' }}>No Listings Available</h4>
									</Container>
								) : (
									<Fragment>
										{dashboardview?.ongoing.map((elem) => {
											// convert elem.deadline_timestamp to date dd/mm/yyyy
											return (
												<Cards
													key={elem.id}
													id={elem.id}
													token={token}
													company_name={elem.company_name}
													compensation_CTC={elem.compensation_CTC}
													description={elem.description}
													designation={elem.designation}
													deadline_datetime={elem.deadline_datetime}
													tier={elem.tier}
													contact_person_name={elem.contact_person_name}
													phone_number={elem.phone_number}
													email={elem.email}
													additional_info={elem.additional_info}
													type='placements'
													profileInfo={profileInfo}
													setError={setError}
													setShowError={setShowError}
													setSuccess={setSuccess}
													setShowSuccess={setShowSuccess}
													setShowLoader={setShowLoader}
													getDashboardInfo={getDashboardInfo}
												/>
											);
										})}
									</Fragment>
								)}
							</Tab>
							<Tab eventKey='previous' title='Previous Placements'>
								{dashboardview && dashboardview?.previous.length === 0 ? (
									<Container>
										<h4 style={{ color: '#787878' }}>No Listings Available</h4>
									</Container>
								) : (
									<Fragment>
										{dashboardview?.previous.map((elem) => {
											return (
												<Cards
													key={elem.id}
													id={elem.id}
													token={token}
													company_name={elem.company_name}
													compensation_CTC={elem.compensation_CTC}
													description={elem.description}
													designation={elem.designation}
													deadline_datetime={elem.deadline_datetime}
													tier={elem.tier}
													contact_person_name={elem.contact_person_name}
													phone_number={elem.phone_number}
													email={elem.email}
													additional_info={elem.additional_info}
													type='placements'
													profileInfo={profileInfo}
													setError={setError}
													setShowError={setShowError}
													setSuccess={setSuccess}
													setShowSuccess={setShowSuccess}
													setShowLoader={setShowLoader}
													getDashboardInfo={getDashboardInfo}
												/>
											);
										})}
									</Fragment>
								)}
							</Tab>
							<Tab eventKey='new' title='New Job Notifications'>
								{dashboardview && dashboardview?.new.length === 0 ? (
									<Container>
										<h4 style={{ color: '#787878' }}>No Listings Available</h4>
									</Container>
								) : (
									<Fragment>
										{dashboardview?.new.map((elem) => {
											// convert elem.deadline_timestamp to date dd/mm/yyyy
											return (
												<Cards
													key={elem.id}
													id={elem.id}
													token={token}
													company_name={elem.company_name}
													compensation_CTC={elem.compensation_CTC}
													description={elem.description}
													designation={elem.designation}
													deadline_datetime={elem.deadline_datetime}
													tier={elem.tier}
													contact_person_name={elem.contact_person_name}
													phone_number={elem.phone_number}
													email={elem.email}
													additional_info={elem.additional_info}
													type='placements'
													profileInfo={profileInfo}
													setError={setError}
													setShowError={setShowError}
													setSuccess={setSuccess}
													setShowSuccess={setShowSuccess}
													setShowLoader={setShowLoader}
													getDashboardInfo={getDashboardInfo}
												/>
											);
										})}
									</Fragment>
								)}
							</Tab>
						</Tabs>
					</div>
				</div>
			);
		}
	} else {
		return '';
	}
};

export default Dashboard;
