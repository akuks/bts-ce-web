import { REQUEST_REPORTS, RECEIVE_REPORTS, NOTIFY_REPORT_REQUEST_ERROR,
         DISMISS_REPORT_REQUEST_ERROR, REQUEST_REPORT_FIELDS, 
         RECEIVE_REPORT_FIELDS, SET_REPORTS_FILTER, RECEIVE_DOWNLOAD_STATUS,
         SET_DOWNLOAD_STATUS, CLEAR_DOWNLOAD_STATUS, CREATE_RPT_RECEIVE_FIELDS,
         CREATE_RPT_PRVW_ERROR, CREATE_RPT_CLEAR_ERROR, CREATE_RPT_CLEAR_STATE,
        CONFIRM_REPORT_CREATED, CREATE_REPORT_REQUEST, REQUEST_REPORT, RECEIVE_REPORT,
        SEND_CREATE_RPT_CATEGORY_REQ, CONFIRM_RPT_CATEGORY_CREATION, 
        SEND_DELETE_RPT_CATEGORY_REQ, CONFIRM_RPT_CATEGORY_DELETION, 
        NOTIFY_REPORT_CATEGORY_CREATION_ERROR, CLEAR_REPORT_TREE_ERROR,
        SEND_RENAME_RPT_CATEGORY_REQ, CONFIRM_RPT_CATEGORY_RENAMING, 
        REQUEST_REPORT_CATEGORY, NOTIFY_REPORT_CATEGORY_RENAME_ERROR,
        CONFIRM_REPORT_CATEGORY_RECEIVED, CLEAR_EDIT_RPT_CATEGORY} 
     from './reports-actions';


let initialState = {
    requestingReports: false,
    requestError: null,
    reports: [],
    filter:{
        text: '',
        reports: true,
        categories: false
    },
    reportsdata:{},
    create: {
        error: null,
        fields: [],
        creating: false // for showing a loading indicator when request is sent to the server
    },
    reportInfo:{}, //holds details or reports being editted,
    new_cat:{}, //Stores the sate of new category creation
    edit_cat: null // edit category details her
};

export default function reports(state = initialState, action){
        switch (action.type) {
            case REQUEST_REPORTS:
                return Object.assign({}, state, { requestingReports: true });
            case REQUEST_REPORT_FIELDS:
                if( typeof state.reportsdata[action.reportId]=== 'undefined' ){
                    return Object.assign({}, state, { 
                        reportsdata: Object.assign({},state.reportsdata, {
                            [action.reportId]: {
                                requesting: true,
                                requestError:  null,
                                fields: [],
                                download: null
                            }
                        })
                    });
                }
            
                return Object.assign({}, state, { 
                    reportdata: Object.assign({},state.reportsdata, {
                        [action.reportId]: {
                            requesting: true,
                            requestError:  null,
                            fields: state.reportsdata[action.reportId].fields,
                            download: state.reportsdata[action.reportId].download,
                        }
                    })
                });
            case RECEIVE_REPORT_FIELDS:
                return Object.assign({}, state, { 
                        reportsdata: Object.assign({},state.reportsdata, {
                            [action.reportId]: {
                                requesting: false,
                                requestError:  null,
                                fields: action.fields,
                                download: null
                            }
                        })
                    });
            case RECEIVE_REPORTS:
                return Object.assign({}, state, { 
                    requestingReports: false,
                    requestError: null,
                    reports: action.reports,
                });
                
            case NOTIFY_REPORT_REQUEST_ERROR:
                return Object.assign({}, state, { 
                    requestingReports: false,
                    requestError: action.error
                });
                
            case DISMISS_REPORT_REQUEST_ERROR:
                return Object.assign({}, state, { requestError: null });
            case SET_REPORTS_FILTER:
                return Object.assign({}, state, { filter: action.filter });
            case RECEIVE_DOWNLOAD_STATUS:
                return {
                        ...state,
                        reportsdata:{
                            ...state.reportsdata,
                            [action.reportId]: {
                                ...state.reportsdata[action.reportId],
                                download: action.statusData
                            }
                        }
                    };
            case SET_DOWNLOAD_STATUS:
                return {
                        ...state,
                        reportsdata:{
                            ...state.reportsdata,
                            [action.reportId]: {
                                ...state.reportsdata[action.reportId],
                                download: { ...state.reportsdata[action.reportId].download, status: action.status, log: action.log }
                            }
                        }
                    };
            case CREATE_RPT_RECEIVE_FIELDS:
                return {
                    ...state,
                    create: { ...state.create, fields: action.fields}
                }
                
            case CREATE_RPT_PRVW_ERROR:
                return {
                    ...state,
                    create: { ...state.create, error: action.error, fields:[], creating: false}
                }
                
            case CREATE_RPT_CLEAR_ERROR:
                return {
                    ...state,
                    create: { ...state.create, error: null}
                }
                
            case CREATE_RPT_CLEAR_STATE:
                return {
                    ...state,
                    create: { fields: [], error: null, creating: false}
                }
                
            case CONFIRM_REPORT_CREATED:
                return {
                    ...state,
                    create: { fields: [], error: null, creating: false}
                }
                
            case CREATE_REPORT_REQUEST:
                return {
                    ...state,
                    create: { ...state.create, creating: true}
                }
                
            case RECEIVE_REPORT:
                return {
                    ...state,
                    reportInfo: { [action.reportId]: {...action.reportInfo, error: null}}
                }
                
            case CLEAR_DOWNLOAD_STATUS:  
                return {
                        ...state,
                        reportsdata:{
                            ...state.reportsdata,
                            [action.reportId]: {
                                ...state.reportsdata[action.reportId],
                                download: null
                            }
                        }
                    };
            case SEND_CREATE_RPT_CATEGORY_REQ:
                return {
                    ...state,
                    new_cat: { ...state.new_cat, requesting: true}
                }
            case CONFIRM_RPT_CATEGORY_CREATION:
                return {
                    ...state,
                    new_cat: { ...state.new_cat, requesting: false}
                }
            case SEND_DELETE_RPT_CATEGORY_REQ:
                return {
                    ...state,
                    requestingReports: true
                }
            case CONFIRM_RPT_CATEGORY_DELETION:
                return {
                    ...state,
                    requestingReports: false
                }
            case NOTIFY_REPORT_CATEGORY_CREATION_ERROR:
                return {
                    ...state,
                    requestingReports: false,
                    requestError: action.error
                }
            case CLEAR_REPORT_TREE_ERROR:
                return {
                    ...state,
                    requestError: null
                }
            case SEND_RENAME_RPT_CATEGORY_REQ:
                return {
                    ...state,
                    requestingReports: true,
                    edit_cat: { ...action.data , requesting: true}
                }
            case CONFIRM_RPT_CATEGORY_RENAMING:
                return {
                    ...state,
                    requestingReports: false,
                    edit_cat: null
                }
            case CONFIRM_REPORT_CATEGORY_RECEIVED:
                return {
                    ...state,
                    requestingReports: false,
                    edit_cat: { ...action.data , requesting: false}
                }
            case REQUEST_REPORT_CATEGORY:
                return {
                   ...state,
                   edit_cat:{ requesting: true}
                }
            case CLEAR_EDIT_RPT_CATEGORY:
                return {
                    ...state,
                    edit_cat: null
                }
            case NOTIFY_REPORT_CATEGORY_RENAME_ERROR:
                return {
                    ...state,
                    edit_cat: { ...state.edit_cat, requesting: false},
                    requestingReports: false,
                    requestError: action.error
                }
            default:
                return state;
        }
}