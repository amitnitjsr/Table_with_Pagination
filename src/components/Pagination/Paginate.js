import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import './Paginate.css';

const useStyles1 = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		marginLeft: 'auto',
		paddingLeft: '2px'
	},
}));

function range(start, end) {
	var ans = [];
	for (let i = start; i <= end; i++) {
		ans.push(i);
	}
	return ans;
}

export default function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = event => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = event => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = event => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = event => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	const handleGoToPage = event => {
		onChangePage(event, event.target.value);
	};

	return (
		<div className={classes.root}>
			<span id="goto"
				className="MuiTypography-root MuiTablePagination-caption MuiTypography-caption MuiTypography-colorInherit"
			>
				Go To Page
			</span>
			<div
				className="MuiInputBase-root MuiTablePagination-input MuiTablePagination-selectRoot"
			>
				<select onChange={handleGoToPage}
					className="MuiSelect-root MuiSelect-select MuiTablePagination-select MuiInputBase-input MuiInputBase-inputSelect"
					labelid="goto" id="select"
					value={page}>
					{range(1, Math.max(0, Math.ceil(count / rowsPerPage) - 1) + 1)
						.map(id => <option key={id} className="MuiTablePagination-menuItem" value={id - 1}>{id}</option>)}
				</select>
				<svg className="MuiSvgIcon-root MuiSelect-icon MuiTablePagination-selectIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M7 10l5 5 5-5z"></path></svg>
			</div>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};



