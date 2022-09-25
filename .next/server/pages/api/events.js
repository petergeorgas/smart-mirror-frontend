"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/events";
exports.ids = ["pages/api/events"];
exports.modules = {

/***/ "google-auth-library":
/*!**************************************!*\
  !*** external "google-auth-library" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("googleapis");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "(api)/./pages/api/events.js":
/*!*****************************!*\
  !*** ./pages/api/events.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! googleapis */ \"googleapis\");\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! process */ \"process\");\n/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var google_auth_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! google-auth-library */ \"google-auth-library\");\n/* harmony import */ var google_auth_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(google_auth_library__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nasync function handler(req, res) {\n    const credentialspath = path__WEBPACK_IMPORTED_MODULE_0___default().join(process__WEBPACK_IMPORTED_MODULE_2___default().cwd(), \"credentials.json\");\n    const auth = new googleapis__WEBPACK_IMPORTED_MODULE_1__.google.auth.GoogleAuth({\n        keyFile: credentialspath,\n        scopes: [\n            \"https://www.googleapis.com/auth/calendar\",\n            \"https://www.googleapis.com/auth/calendar.events\"\n        ]\n    });\n    const authclient = await auth.getClient();\n    const calendar = await googleapis__WEBPACK_IMPORTED_MODULE_1__.google.calendar({\n        version: \"v3\",\n        auth: authclient\n    });\n    try {\n        const r = await calendar.events.insert({\n            calendarId: \"primary\",\n            resource: {\n                summary: \"Google I/O 2015\",\n                location: \"800 Howard St., San Francisco, CA 94103\",\n                description: \"A chance to hear more about Google's developer products.\",\n                start: {\n                    \"dateTime\": new Date().toISOString(),\n                    \"timeZone\": \"America/Los_Angeles\"\n                },\n                end: {\n                    \"dateTime\": \"2022-09-28T17:00:00-07:00\",\n                    \"timeZone\": \"America/Los_Angeles\"\n                }\n            }\n        });\n        const responce = await calendar.events.list({\n            calendarId: \"primary\",\n            timeMin: new Date().toISOString(),\n            maxResults: 30,\n            singleEvents: true,\n            orderBy: \"startTime\"\n        });\n        const events = responce.data.items ?? [];\n        res.status(200).json({\n            events: events\n        });\n    } catch (e) {\n        console.log(e);\n        res.status(400).json({\n            error: e.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZXZlbnRzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNVO0FBQ0o7QUFDbUI7QUFFakMsZUFBZUksT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBQztJQUUzQyxNQUFNQyxlQUFlLEdBQUdQLGdEQUFTLENBQUNFLGtEQUFXLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQztJQUNwRSxNQUFNUSxJQUFJLEdBQUcsSUFBSVQsOERBQXNCLENBQUM7UUFDcENVLE9BQU8sRUFBRUosZUFBZTtRQUN4QkssTUFBTSxFQUFFO1lBQ0ksMENBQTBDO1lBQzFDLGlEQUFpRDtTQUNwRDtLQUVaLENBQUM7SUFDRixNQUFNQyxVQUFVLEdBQUcsTUFBTUgsSUFBSSxDQUFDSSxTQUFTLEVBQUU7SUFDekMsTUFBTUMsUUFBUSxHQUFHLE1BQU1kLHVEQUFlLENBQUM7UUFFbkNlLE9BQU8sRUFBRSxJQUFJO1FBQ2JOLElBQUksRUFBRUcsVUFBVTtLQUNuQixDQUFDO0lBQ0YsSUFBRztRQUNDLE1BQU1JLENBQUMsR0FBRyxNQUFNRixRQUFRLENBQUNHLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO1lBQ25DQyxVQUFVLEVBQUUsU0FBUztZQUNyQkMsUUFBUSxFQUFFO2dCQUNOQyxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQkMsUUFBUSxFQUFFLHlDQUF5QztnQkFDbkRDLFdBQVcsRUFBRSwwREFBMkQ7Z0JBQ3hFQyxLQUFLLEVBQUU7b0JBQ0gsVUFBVSxFQUFFLElBQUlDLElBQUksRUFBRSxDQUFDQyxXQUFXLEVBQUU7b0JBQ3BDLFVBQVUsRUFBRSxxQkFBcUI7aUJBQ3BDO2dCQUNEQyxHQUFHLEVBQUU7b0JBQ0QsVUFBVSxFQUFFLDJCQUEyQjtvQkFDdkMsVUFBVSxFQUFFLHFCQUFxQjtpQkFDcEM7YUFDSjtTQUVKLENBQUM7UUFDRixNQUFNQyxRQUFRLEdBQUcsTUFBTWQsUUFBUSxDQUFDRyxNQUFNLENBQUNZLElBQUksQ0FBQztZQUN4Q1YsVUFBVSxFQUFFLFNBQVM7WUFDckJXLE9BQU8sRUFBRSxJQUFJTCxJQUFJLEVBQUUsQ0FBQ0MsV0FBVyxFQUFFO1lBQ2pDSyxVQUFVLEVBQUUsRUFBRTtZQUNkQyxZQUFZLEVBQUUsSUFBSTtZQUNsQkMsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztRQUNGLE1BQU1oQixNQUFNLEdBQUdXLFFBQVEsQ0FBQ00sSUFBSSxDQUFDQyxLQUFLLElBQUksRUFBRTtRQUN4QzlCLEdBQUcsQ0FBQytCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUNwQixNQUFNLEVBQUVBLE1BQU07U0FBQyxDQUFDO0lBQzFDLEVBQ0EsT0FBTXFCLENBQUMsRUFBQztRQUNKQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsQ0FBQyxDQUFDO1FBQ2RqQyxHQUFHLENBQUMrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFDSSxLQUFLLEVBQUVILENBQUMsQ0FBQ0ksT0FBTztTQUFDLENBQUM7SUFDNUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFydG1pcnJvcmNhbGVuZGFyLy4vcGFnZXMvYXBpL2V2ZW50cy5qcz8yNzAwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHtnb29nbGV9IGZyb20gXCJnb29nbGVhcGlzXCJcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSBcInByb2Nlc3NcIlxyXG5pbXBvcnQgeyBHb29nbGVBdXRoIH0gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcyl7XHJcblxyXG4gICAgY29uc3QgY3JlZGVudGlhbHNwYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiY3JlZGVudGlhbHMuanNvblwiKVxyXG4gICAgY29uc3QgYXV0aCA9IG5ldyBnb29nbGUuYXV0aC5Hb29nbGVBdXRoKHtcclxuICAgICAgICBrZXlGaWxlOiBjcmVkZW50aWFsc3BhdGgsIFxyXG4gICAgICAgIHNjb3BlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2NhbGVuZGFyJyxcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9jYWxlbmRhci5ldmVudHMnXHJcbiAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgfSlcclxuICAgIGNvbnN0IGF1dGhjbGllbnQgPSBhd2FpdCBhdXRoLmdldENsaWVudCgpXHJcbiAgICBjb25zdCBjYWxlbmRhciA9IGF3YWl0IGdvb2dsZS5jYWxlbmRhcih7XHJcblxyXG4gICAgICAgIHZlcnNpb246IFwidjNcIiwgXHJcbiAgICAgICAgYXV0aDogYXV0aGNsaWVudFxyXG4gICAgfSlcclxuICAgIHRyeXtcclxuICAgICAgICBjb25zdCByID0gYXdhaXQgY2FsZW5kYXIuZXZlbnRzLmluc2VydCh7XHJcbiAgICAgICAgICAgIGNhbGVuZGFySWQ6ICdwcmltYXJ5JyxcclxuICAgICAgICAgICAgcmVzb3VyY2U6IHtcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6ICdHb29nbGUgSS9PIDIwMTUnLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICc4MDAgSG93YXJkIFN0LiwgU2FuIEZyYW5jaXNjbywgQ0EgOTQxMDMnLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBIGNoYW5jZSB0byBoZWFyIG1vcmUgYWJvdXQgR29vZ2xlXFwncyBkZXZlbG9wZXIgcHJvZHVjdHMuJyxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGVUaW1lJzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICd0aW1lWm9uZSc6ICdBbWVyaWNhL0xvc19BbmdlbGVzJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAnZGF0ZVRpbWUnOiAnMjAyMi0wOS0yOFQxNzowMDowMC0wNzowMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RpbWVab25lJzogJ0FtZXJpY2EvTG9zX0FuZ2VsZXMnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgcmVzcG9uY2UgPSBhd2FpdCBjYWxlbmRhci5ldmVudHMubGlzdCh7XHJcbiAgICAgICAgICAgIGNhbGVuZGFySWQ6IFwicHJpbWFyeVwiLFxyXG4gICAgICAgICAgICB0aW1lTWluOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIG1heFJlc3VsdHM6IDMwLFxyXG4gICAgICAgICAgICBzaW5nbGVFdmVudHM6IHRydWUsXHJcbiAgICAgICAgICAgIG9yZGVyQnk6IFwic3RhcnRUaW1lXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHJlc3BvbmNlLmRhdGEuaXRlbXMgPz8gW11cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ZXZlbnRzOiBldmVudHN9KVxyXG4gICAgfVxyXG4gICAgY2F0Y2goZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6IGUubWVzc2FnZX0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXSwibmFtZXMiOlsicGF0aCIsImdvb2dsZSIsInByb2Nlc3MiLCJHb29nbGVBdXRoIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImNyZWRlbnRpYWxzcGF0aCIsImpvaW4iLCJjd2QiLCJhdXRoIiwia2V5RmlsZSIsInNjb3BlcyIsImF1dGhjbGllbnQiLCJnZXRDbGllbnQiLCJjYWxlbmRhciIsInZlcnNpb24iLCJyIiwiZXZlbnRzIiwiaW5zZXJ0IiwiY2FsZW5kYXJJZCIsInJlc291cmNlIiwic3VtbWFyeSIsImxvY2F0aW9uIiwiZGVzY3JpcHRpb24iLCJzdGFydCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVuZCIsInJlc3BvbmNlIiwibGlzdCIsInRpbWVNaW4iLCJtYXhSZXN1bHRzIiwic2luZ2xlRXZlbnRzIiwib3JkZXJCeSIsImRhdGEiLCJpdGVtcyIsInN0YXR1cyIsImpzb24iLCJlIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/events.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/events.js"));
module.exports = __webpack_exports__;

})();