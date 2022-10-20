import { React, useState } from 'react';
import { SvgIcon } from '@material-ui/core';
import { Work, Ballot } from '@material-ui/icons';

import seachBarStyles from './seachBarStyles';
import { Redirect } from 'react-router-dom';

const Suggestion = ({ suggestion }) => {
	// text suggestion
	const css = seachBarStyles();
	// ongoing is bool which is true if the suggestion's deadline is in the future
	const [clicked, setClicked] = useState(false);
	const deadline = new Date(suggestion.deadline_datetime);
	const ongoing = deadline > new Date();
	return (
		<>
			<li
				className={css.suggestion}
				onMouseDown={() => {
					setClicked(true);
				}}
			>
				{clicked && (
					<Redirect to={`admin/details/placements/${suggestion.id}`} push />
				)}{' '}
				{/* placement to be changed to opening type. */}
				<h5 className={css.suggestion_h5}>
					{' '}
					<SvgIcon component={Ballot} /> {suggestion.company_name}
				</h5>
				<div>
					{' '}
					<SvgIcon component={Work} /> {suggestion.designation}
				</div>
				{ongoing ? (
					<div className={css.ongoing}>Ongoing</div>
				) : (
					<div className={css.previous}>Previous</div>
				)}
			</li>
		</>
	);
};

export default Suggestion;
