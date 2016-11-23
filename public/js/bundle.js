/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import React from 'react';
	import ReactDOM from 'react-dom';
	import * as ReactRedux from 'react-redux';
	import * as Redux from 'redux';
	import * as ReactRouter from 'react-router';
	import * as ReactRouterRedux from 'react-router-redux';
	import thunk from 'redux-thunk';
	import catphoApp from './reducers/index.js';
	import App from './components/App.js';
	import NotFound from './components/NotFound.js';
	import ImageListViewer from './containers/ImageListViewer.js';
	import FileUpload from './containers/FileUpload.js';
	
	const store = Redux.createStore(catphoApp, Redux.applyMiddleware(thunk), Redux.compose(Redux.applyMiddleware(ReactRouterRedux.routerMiddleware(ReactRouter.browserHistory))));
	console.log(store.getState());
	
	const history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.browserHistory, store);
	
	const routes = React.createElement(
		ReactRouter.Route,
		{ path: '/', component: App },
		React.createElement(ReactRouter.IndexRoute, { component: ImageListViewer }),
		React.createElement(ReactRouter.Route, { path: 'test', component: ImageListViewer }),
		React.createElement(ReactRouter.Route, { path: 'upload', component: FileUpload }),
		React.createElement(ReactRouter.Route, { path: '*', component: NotFound })
	);
	
	ReactDOM.render(React.createElement(
		ReactRedux.Provider,
		{ store: store },
		React.createElement(ReactRouter.Router, { routes: routes, history: history })
	), document.getElementById('app'));

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWJiMTRhYTIyYjMxODgwNDIzZDkiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJSZWFjdFJlZHV4IiwiUmVkdXgiLCJSZWFjdFJvdXRlciIsIlJlYWN0Um91dGVyUmVkdXgiLCJ0aHVuayIsImNhdHBob0FwcCIsIkFwcCIsIk5vdEZvdW5kIiwiSW1hZ2VMaXN0Vmlld2VyIiwiRmlsZVVwbG9hZCIsInN0b3JlIiwiY3JlYXRlU3RvcmUiLCJhcHBseU1pZGRsZXdhcmUiLCJjb21wb3NlIiwicm91dGVyTWlkZGxld2FyZSIsImJyb3dzZXJIaXN0b3J5IiwiY29uc29sZSIsImxvZyIsImdldFN0YXRlIiwiaGlzdG9yeSIsInN5bmNIaXN0b3J5V2l0aFN0b3JlIiwicm91dGVzIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsUUFBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFFBQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxRQUFPLEtBQUtDLFVBQVosTUFBNEIsYUFBNUI7QUFDQSxRQUFPLEtBQUtDLEtBQVosTUFBdUIsT0FBdkI7QUFDQSxRQUFPLEtBQUtDLFdBQVosTUFBNkIsY0FBN0I7QUFDQSxRQUFPLEtBQUtDLGdCQUFaLE1BQWtDLG9CQUFsQztBQUNBLFFBQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxRQUFPQyxTQUFQLE1BQXNCLHFCQUF0QjtBQUNBLFFBQU9DLEdBQVAsTUFBZ0IscUJBQWhCO0FBQ0EsUUFBT0MsUUFBUCxNQUFxQiwwQkFBckI7QUFDQSxRQUFPQyxlQUFQLE1BQTRCLGlDQUE1QjtBQUNBLFFBQU9DLFVBQVAsTUFBdUIsNEJBQXZCOztBQUVBLE9BQU1DLFFBQVFULE1BQU1VLFdBQU4sQ0FDYk4sU0FEYSxFQUViSixNQUFNVyxlQUFOLENBQXNCUixLQUF0QixDQUZhLEVBR2JILE1BQU1ZLE9BQU4sQ0FBY1osTUFBTVcsZUFBTixDQUFzQlQsaUJBQWlCVyxnQkFBakIsQ0FBa0NaLFlBQVlhLGNBQTlDLENBQXRCLENBQWQsQ0FIYSxDQUFkO0FBS0FDLFNBQVFDLEdBQVIsQ0FBWVAsTUFBTVEsUUFBTixFQUFaOztBQUVBLE9BQU1DLFVBQVVoQixpQkFBaUJpQixvQkFBakIsQ0FBc0NsQixZQUFZYSxjQUFsRCxFQUFrRUwsS0FBbEUsQ0FBaEI7O0FBRUEsT0FBTVcsU0FBVTtBQUFDLGFBQUQsQ0FBYSxLQUFiO0FBQUEsSUFBbUIsTUFBSyxHQUF4QixFQUE0QixXQUFXZixHQUF2QztBQUNaLHNCQUFDLFdBQUQsQ0FBYSxVQUFiLElBQXdCLFdBQVdFLGVBQW5DLEdBRFk7QUFFWixzQkFBQyxXQUFELENBQWEsS0FBYixJQUFtQixNQUFLLE1BQXhCLEVBQStCLFdBQVdBLGVBQTFDLEdBRlk7QUFHWixzQkFBQyxXQUFELENBQWEsS0FBYixJQUFtQixNQUFLLFFBQXhCLEVBQWlDLFdBQVdDLFVBQTVDLEdBSFk7QUFJWixzQkFBQyxXQUFELENBQWEsS0FBYixJQUFtQixNQUFLLEdBQXhCLEVBQTRCLFdBQVdGLFFBQXZDO0FBSlksRUFBaEI7O0FBT0FSLFVBQVN1QixNQUFULENBQ0M7QUFBQyxZQUFELENBQVksUUFBWjtBQUFBLElBQXFCLE9BQU9aLEtBQTVCO0FBQ0Msc0JBQUMsV0FBRCxDQUFhLE1BQWIsSUFBb0IsUUFBUVcsTUFBNUIsRUFBb0MsU0FBU0YsT0FBN0M7QUFERCxFQURELEVBSUNJLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FKRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDViYjE0YWEyMmIzMTg4MDQyM2Q5IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0ICogYXMgUmVhY3RSZWR1eCBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgKiBhcyBSZWR1eCBmcm9tICdyZWR1eCc7XG5pbXBvcnQgKiBhcyBSZWFjdFJvdXRlciBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0ICogYXMgUmVhY3RSb3V0ZXJSZWR1eCBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCBjYXRwaG9BcHAgZnJvbSAnLi9yZWR1Y2Vycy9pbmRleC5qcyc7XG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9BcHAuanMnO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4vY29tcG9uZW50cy9Ob3RGb3VuZC5qcyc7XG5pbXBvcnQgSW1hZ2VMaXN0Vmlld2VyIGZyb20gJy4vY29udGFpbmVycy9JbWFnZUxpc3RWaWV3ZXIuanMnO1xuaW1wb3J0IEZpbGVVcGxvYWQgZnJvbSAnLi9jb250YWluZXJzL0ZpbGVVcGxvYWQuanMnO1xuXG5jb25zdCBzdG9yZSA9IFJlZHV4LmNyZWF0ZVN0b3JlKFxuXHRjYXRwaG9BcHAsXG5cdFJlZHV4LmFwcGx5TWlkZGxld2FyZSh0aHVuayksXG5cdFJlZHV4LmNvbXBvc2UoUmVkdXguYXBwbHlNaWRkbGV3YXJlKFJlYWN0Um91dGVyUmVkdXgucm91dGVyTWlkZGxld2FyZShSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeSkpKVxuKTtcbmNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpO1xuXG5jb25zdCBoaXN0b3J5ID0gUmVhY3RSb3V0ZXJSZWR1eC5zeW5jSGlzdG9yeVdpdGhTdG9yZShSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeSwgc3RvcmUpO1xuXG5jb25zdCByb3V0ZXMgPSAoPFJlYWN0Um91dGVyLlJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxuXHRcdFx0XHQ8UmVhY3RSb3V0ZXIuSW5kZXhSb3V0ZSBjb21wb25lbnQ9e0ltYWdlTGlzdFZpZXdlcn0gLz5cblx0XHRcdFx0PFJlYWN0Um91dGVyLlJvdXRlIHBhdGg9XCJ0ZXN0XCIgY29tcG9uZW50PXtJbWFnZUxpc3RWaWV3ZXJ9IC8+XG5cdFx0XHRcdDxSZWFjdFJvdXRlci5Sb3V0ZSBwYXRoPVwidXBsb2FkXCIgY29tcG9uZW50PXtGaWxlVXBsb2FkfSAvPlxuXHRcdFx0XHQ8UmVhY3RSb3V0ZXIuUm91dGUgcGF0aD1cIipcIiBjb21wb25lbnQ9e05vdEZvdW5kfSAvPlxuXHRcdFx0PC9SZWFjdFJvdXRlci5Sb3V0ZT4pXG5cblJlYWN0RE9NLnJlbmRlcihcblx0PFJlYWN0UmVkdXguUHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHQ8UmVhY3RSb3V0ZXIuUm91dGVyIHJvdXRlcz17cm91dGVzfSBoaXN0b3J5PXtoaXN0b3J5fSAvPlxuXHQ8L1JlYWN0UmVkdXguUHJvdmlkZXI+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==