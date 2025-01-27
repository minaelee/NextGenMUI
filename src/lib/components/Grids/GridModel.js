import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PrintIcon from '@mui/icons-material/Print';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import Lottie from 'react-lottie';
import emptyImage from '../../Assets/empty.gif';
import loadingAnimation from '../../Assets/loading.json';
import CalenderModel from '../Calender';
import { handleExportToExcel, handlePrint, dateObject, monthsOfTheYear } from '../../Utils/Utils';

const buttonStyle = { textTransform: 'capitalize' };

const LoadingIndicator = ({ options }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Lottie options={options} height={300} width={300} />
    </Box>
);

const NoDataIndicator = ({ onAdd, disableAdd }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, py: 4 }}>
        <img src={emptyImage} alt="No data" className="h-48" />
        <Typography>Looks like you don't have any data</Typography>
        {!disableAdd && (
            <Button onClick={onAdd} variant="contained" sx={{ ...buttonStyle, width: 300, mt: 1 }} startIcon={<AddIcon />}>
                New
            </Button>
        )}
    </Box>
);

const GridModel = ({ columns, rows, loading, FilterComponent, GridButtonsComponent, onAdd, disableAdd, disablePrint, disableExport, showGridHeader, onDateChange, onApplyDateChanges, ...gridProps }) => {
    const [dates, setDates] = useState({ startDate: dateObject, endDate: dateObject });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleChangeDates = (type, value) => {
        setDates({ ...dates, [type]: value });
    };

    useEffect(() => {
        if (onDateChange) {
            onDateChange(dates);
        }
    }, [dates]);

    const { startDate: { $D: startDay, $M: startMonth }, endDate: { $D: endDay, $M: endMonth } } = dates;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Box>
            {showGridHeader && (
                <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Box display="flex" gap={3}>
                            {/* Search */}
                        </Box>
                        <Box display="flex" gap={3}>
                            <Button
                                startIcon={<CalendarMonthIcon />}
                                variant="contained"
                                onClick={event => setAnchorEl(event.currentTarget)}
                                sx={buttonStyle}
                            >
                                {monthsOfTheYear[startMonth]} {startDay} -  {monthsOfTheYear[endMonth]} {endDay}
                            </Button>
                            {!disablePrint && (
                                <Button
                                    sx={buttonStyle}
                                    startIcon={<PrintIcon />}
                                    variant="contained"
                                    onClick={handlePrint}
                                >
                                    Print
                                </Button>
                            )}
                            {!disableExport && (
                                <Button
                                    sx={buttonStyle}
                                    startIcon={<ExitToAppIcon />}
                                    variant="contained"
                                    onClick={() => handleExportToExcel(columns, rows)}
                                >
                                    Export
                                </Button>
                            )}
                            <CalenderModel onChange={handleChangeDates} onApplyDateChanges={onApplyDateChanges} anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} />
                            {FilterComponent && <FilterComponent />}
                            {!disableAdd && (
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={onAdd}
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    New
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}

            {GridButtonsComponent && <GridButtonsComponent />}

            {rows.length > 0 && !loading ? (
                <div id="printTable">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        {...gridProps}
                    />
                </div>
            ) : loading ? (
                <LoadingIndicator options={defaultOptions} />
            ) : (
                <NoDataIndicator onAdd={onAdd} disableAdd={disableAdd} />
            )}
        </Box>
    );
};

GridModel.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    paginationMode: PropTypes.oneOf(["server", "client"]),
    FilterComponent: PropTypes.node,
    GridButtonsComponent: PropTypes.node,
    onAdd: PropTypes.func,
    disableAdd: PropTypes.bool,
    disablePrint: PropTypes.bool,
    disableExport: PropTypes.bool,
    showGridHeader: PropTypes.bool
};

GridModel.defaultProps = {
    disableAdd: false,
    disableExport: false,
    disablePrint: false,
    showGridHeader: true
};

export default GridModel;
