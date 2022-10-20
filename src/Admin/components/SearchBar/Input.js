import React, { useEffect } from 'react';
import seachBarStyles from './seachBarStyles';
import { SvgIcon } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';

const Input = ({
	onSearchSubmit,
	focused,
	setFocused,
	suggestions,
	searched,
	on_click,
	setSearched,
	term,
	setTerm,
	dashboardInfo,
	setDashboardview,
	inputRef,
}) => {
	const css = seachBarStyles();

	const onClick = () => {
		setFocused(true);
		document.getElementById('searchbar').style.border = '2px solid #334878';
	};

	const onBlur = () => {
		setFocused(false);
		document.getElementById('searchbar').style.border = '2px solid #ccc';
	};

	useEffect(() => {
		if (term !== '') {
			onSearchSubmit(term);
		}
	}, [term]);

	return (
		<div className={css.searchbar} id='searchbar'>
			<SvgIcon component={Search} style={{ Width: '5%' }} />
			<form className={css.form} onSubmit={on_click}>
				<input
					ref={inputRef}
					className={css.searchbarinput}
					type='text'
					placeholder='Search offer by company name. . .'
					onFocus={onClick}
					onBlur={onBlur}
					onChange={(e) => setTerm(e.target.value)}
					value={term}
					autoComplete='off'
				/>
			</form>
			{term && (
				<SvgIcon
					component={Close}
					onClick={() => setTerm('')}
					className={css.close}
				/>
			)}
		</div>
	);
};

export default Input;
