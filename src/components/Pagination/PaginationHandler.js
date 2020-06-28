export const handleResetPage = (setStateHandler) => {
    setStateHandler({ page: 0 });
};

export const handleChangePage = (newPage, setStateHandler, callback, ref) => {
    ref.scrollIntoView({ block: 'start', behavior: 'smooth' });
    setStateHandler({ page: newPage }, () => {
        callback();
    });
};

export const handleChangeRowsPerPage = (pageNo, setStateHandler, callback, ref) => {
    ref.scrollIntoView({ block: 'start', behavior: 'smooth' });
    setStateHandler({ page_size: pageNo, page: 0 }, () => {
        callback();
    });
};