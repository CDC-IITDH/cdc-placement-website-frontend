import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container, TextField, Grid } from '@mui/material';
import GetStats from '../../api/getStats';
import './Stats.css';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ShowTables = ({
	token,
	setShowLoader,
	setError,
	setShowError,
	setSuccess,
	setShowSuccess,
}) => {
	// state variable to store the data

	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [stats, setStats] = useState({
		average_CTC: { CSE: 0, EE: 0, MMAE: 0 ,EP:0},
		max_CTC: { CSE: 0, EE: 0, MMAE: 0 ,EP:0},
		number_of_students_placed: { CSE: 0, EE: 0, MMAE: 0,EP:0, Total: 0 },
		number_of_students_with_multiple_offers: 0,
		number_of_students_with_no_offers: { CSE: 0, EE: 0, MMAE: 0,EP:0, Total: 0 },
	});

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const labels = [
		'Tier 1',
		'Tier 2',
		'Tier 3',
		'Tier 4',
		'Tier 5',
		'Tier 6',
		'Tier 7',
		'PSU',
	];

	const [chartData, setChartData] = useState({
		labels: labels,
		datasets: [
			{
				label: 'Number of Offers per Tier',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [0, 0, 0, 0, 0, 0, 0, 0],
			},
		],
	});
	useEffect(() => {
		// fetch data from the API
		// set the data to the state variable
		GetStats(token, null).then((res) => {
			console.log(res);

			setData(res.stats);

			setChartData({
				labels: labels,
				datasets: [
					{
						label: 'Offers in CSE',
						backgroundColor: '#4db1f0',
						borderColor: '#4db1f0',
						data: res.tier_count['CSE'],
					},
					{
						label: 'Offers in EE',
						backgroundColor: '#67c781',
						borderColor: '#67c781',
						data: res.tier_count['EE'],
					},
					{
						label: 'Offers in MMAE',
						backgroundColor: '#c4f533',
						borderColor: '#c4f533',
						data: res.tier_count['MMAE'],
					},
					{
						label: 'Offers in EP',
						backgroundColor: '#c4f533',
						borderColor: '#c4f533',
						data: res.tier_count['EP'],
					},
					{
						label: 'Total Offers',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: res.tier_count['Total'],
					},
				],
			});

			setColumns([
				{
					field: 'roll_no',
					headerName: 'Roll number',
					type: 'string',
					width: 150,
					headerAlign: 'center',
				},
				{
					field: 'name',
					headerName: 'Name',
					width: 250,
					headerAlign: 'center',
				},
				{ field: 'branch', headerName: 'Branch', width: 100 },
				{ field: 'cpi', headerName: 'CPI', type: 'number', width: 100 },
				{
					field: 'first_offer',
					headerName: 'First Offer',
					width: 200,
					renderCell: (params) => {
						if (params.row.first_offer === null) {
							return '';
						}

						if (!(params.row.first_offer in res.placement_ids)) {
							// capitalize the first letter
							return (
								params.row.first_offer.charAt(0).toUpperCase() +
								params.row.first_offer.slice(1)
							);
						}
						return (
							<a
								href={
									'/portal/admin/details/placements/' +
									res.placement_ids[params.row.first_offer]
								}
							>
								{params.row.first_offer.charAt(0).toUpperCase() +
									params.row.first_offer.slice(1)}
							</a>
						);
					},
				},
				{
					field: 'first_offer_tier',
					headerName: 'First Offer Tier',
					width: 150,
					type: 'number',
				},
				{
					field: 'first_offer_compensation',
					headerName: 'First Offer CTC',
					width: 150,
					type: 'number',
					renderCell: (params) => {
						if (params.row.first_offer_compensation === null) {
							return '';
						}
						return params.row.first_offer_compensation.toLocaleString('en-IN', {
							maximumFractionDigits: 2,
							style: 'currency',
							currency: 'INR',
						});
					}
				},
				{
					field: 'second_offer',
					headerName: 'Second Offer',
					width: 200,
					renderCell: (params) => {
						if (params.row.second_offer === null) {
							return '';
						}

						if (!(params.row.second_offer in res.placement_ids)) {
							return params.row.second_offer;
						}
						return (
							<a
								href={
									'/portal/admin/details/placements/' +
									res.placement_ids[params.row.second_offer]
								}
							>
								{params.row.second_offer}
							</a>
						);
					},
				},
				{
					field: 'second_offer_tier',
					headerName: 'Second Offer Tier',
					width: 150,
					type: 'number',
				},
				{
					field: 'second_offer_compensation',
					headerName: 'Second Offer CTC',
					width: 150,
					type: 'number',
					renderCell: (params) => {
						if (params.row.second_offer_compensation === null) {
							return '';
						}
						return params.row.second_offer_compensation.toLocaleString('en-IN', {
							maximumFractionDigits: 2,
							style: 'currency',
							currency: 'INR',
						});
					}
				},
			]);

			setStats({
				average_CTC: res.average_CTC,
				max_CTC: res.max_CTC,
				number_of_students_placed: res.number_of_students_placed,
				number_of_students_with_multiple_offers:
					res.number_of_students_with_multiple_offers,
				number_of_students_with_no_offers:
					res.number_of_students_with_no_offers,
			});
			setShowLoader(false);
		});
	}, []);

	return (
		<Grid xl={12}>
			<div
				style={{
					height: '100vh',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#f0f4fc',
				}}
			>
				<Grid container spacing={5} style={{ margin: 'auto' }}>
					<Grid item md={11} xl={6}>
						<TableContainer component={Paper} className='stats-table'>
							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableBody>
									<TableRow>
										<TableCell className='stats-table-label'>
											Number of Students Placed{' '}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_placed['Total']}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='stats-table-label'>
											Number of Students Placed with multiple offers{' '}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_with_multiple_offers}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>

							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										<TableCell align='right' className='stats-table-label'>
											CSE
										</TableCell>
										<TableCell align='right' className='stats-table-label'>
											EE
										</TableCell>
										<TableCell align='right' className='stats-table-label'>
											MMAE
										</TableCell>
										<TableCell align='right' className='stats-table-label'>
											EP
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell className='stats-table-label'>
											Number of Students Placed{' '}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_placed['CSE']}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_placed['EE']}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_placed['MMAE']}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_placed['EP']}
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className='stats-table-label'>
											Number of Students with no offers{' '}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_with_no_offers['CSE']}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_with_no_offers['EE']}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_with_no_offers['MMAE']}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.number_of_students_with_no_offers['EP']}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='stats-table-label'>
											Max CTC{' '}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.max_CTC['CSE'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.max_CTC['EE'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.max_CTC['MMAE'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.max_CTC['EP'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='stats-table-label'>
											Average CTC{' '}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.average_CTC['CSE'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.average_CTC['EE'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.average_CTC['MMAE'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
										<TableCell align='right' className='stats-table-value'>
											{stats.average_CTC['EP'].toLocaleString('en-IN', {
												maximumFractionDigits: 2,
												style: 'currency',
												currency: 'INR',
											})}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={11} xl={6}>
						<Bar
							className='bar-chart'
							data={chartData}
							options={{
								responsive: true,
								title: {
									display: true,
									text: 'Average Rainfall per month',
									fontSize: 20,
								},
								legend: {
									display: true,
									position: 'right',
								},
							}}
						/>
					</Grid>
				</Grid>

				<Grid>
					{data.length > 0 && columns.length ? (
						<div className='stats-parent-frame'>
							<DataGrid
								style={{ backgroundColor: 'white' }}
								rows={data}
								columns={columns}
								pageSize={50}
								components={{ Toolbar: GridToolbar }}
								pagination
								autoHeight
								disableSelectionOnClick
								disableDensitySelector
								componentsProps={{
									toolbar: {
										showQuickFilter: true,
										quickFilterProps: {
											debounceMs: 500,
										},
									},
								}}
								getRowClassName={(params) => {
									const is_offer =
										(params.getValue(params.id, 'first_offer') ? 1 : 0) +
										(params.getValue(params.id, 'second_offer') ? 1 : 0);
									if (is_offer === 2) {
										return 'offer-completed';
									}
									return '';
								}}
							/>
						</div>
					) : (
						''
					)}
				</Grid>
			</div>
		</Grid>
	);
};

export default ShowTables;
