"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _DateCalendar = require("@mui/x-date-pickers/DateCalendar");
var _styles = require("@mui/material/styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const StyledMenu = (0, _styles.styled)(props => /*#__PURE__*/_react.default.createElement(_material.Menu, _extends({
  elevation: 0,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right"
  }
}, props)))(_ref => {
  let {
    theme
  } = _ref;
  return {
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
      boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
    }
  };
});
const CalenderModel = _ref2 => {
  let {
    open,
    anchorEl,
    onClose
  } = _ref2;
  const rangeOptions = ["Select past 7 days", "Previous 30 days", "Previous 6 months", "Previous year"];
  return /*#__PURE__*/_react.default.createElement(StyledMenu, {
    anchorEl: anchorEl,
    open: open,
    onClose: onClose,
    id: "calender-range"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      backgroundColor: "white",
      paddingTop: 2,
      paddingX: 3,
      borderRadius: 3,
      width: "max-content"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDayjs.AdapterDayjs
  }, /*#__PURE__*/_react.default.createElement(_DateCalendar.DateCalendar, null)), /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDayjs.AdapterDayjs
  }, /*#__PURE__*/_react.default.createElement(_DateCalendar.DateCalendar, null)))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: "flex",
      justifyContent: "right",
      paddingY: 2.5,
      columnGap: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    size: "small",
    sx: {
      textTransform: "capitalize"
    },
    variant: "outlined",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    size: "small",
    sx: {
      textTransform: "capitalize"
    },
    variant: "contained"
  }, "Apply dates"))));
};
var _default = exports.default = CalenderModel;