import { RouteConfig } from 'vue-router';

const config: RouteConfig = {
	id: '0',
	name: '根节点',
	code: 'root',
	nodeType: 'folder',
	path: '',
	meta: { title: '根节点', requiresAuth: false, icon: '', keepAlive: false },
	children: [
		{
			id: '13',
			name: 'Dashboard',
			code: 'Dashboard',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.Dashboard', requiresAuth: false, icon: 'saas-dashboard', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'Analysis',
					code: 'Analysis',
					nodeType: 'page',
					path: '/Dashboard/Analysis',
					meta: { title: 'Menu.Dashboard.Analysis', requiresAuth: true, icon: '', keepAlive: true },
					children: [
						{
							code: 'add',
							nodeType: 'button',
							meta: { title: '新增', icon: '' },
							name: '新增',
							path: ''
						}
					]
				},
				{
					id: '10',
					name: 'WorkStation',
					code: 'WorkStation',
					nodeType: 'page',
					path: '/Dashboard/WorkStation',
					meta: { title: 'Menu.Dashboard.WorkStation', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '1',
			name: 'Scheduling',
			code: 'Scheduling',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.Scheduling', requiresAuth: false, icon: 'saas-scheduling', keepAlive: false },
			children: [
				{
					id: '2',
					name: 'SchedulingList',
					code: 'SchedulingList',
					nodeType: 'page',
					path: '/Scheduling/SchedulingList',
					meta: { title: 'Menu.Scheduling.SchedulingList', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '3',
					name: 'SchedulingManage',
					code: 'SchedulingManage',
					nodeType: 'page',
					path: '/Scheduling/SchedulingManage',
					meta: { title: 'Menu.Scheduling.SchedulingManage', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '4',
					name: 'SchedulingPublish',
					code: 'SchedulingPublish',
					nodeType: 'page',
					path: '/Scheduling/SchedulingPublish',
					meta: { title: 'Menu.Scheduling.SchedulingPublish', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '5',
			name: 'UserCenter',
			code: 'UserCenter',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.UserCenter', requiresAuth: false, icon: 'saas-user', keepAlive: false },
			children: [
				{
					id: '6',
					name: 'UserList',
					code: 'UserList',
					nodeType: 'page',
					path: '/UserCenter/UserList',
					meta: { title: 'Menu.UserCenter.UserList', requiresAuth: true, icon: '', keepAlive: true }
				},
				{
					id: '7',
					name: 'UserManage',
					code: 'UserManage',
					nodeType: 'page',
					path: '/UserCenter/UserManage',
					meta: { title: 'Menu.UserCenter.UserManage', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '8',
			name: 'Attendance',
			code: 'Attendance',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.Attendance', requiresAuth: false, icon: 'saas-attendance', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'AttendanceList',
					code: 'AttendanceList',
					nodeType: 'page',
					path: '/Attendance/AttendanceList',
					meta: { title: 'Menu.Attendance.AttendanceList', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '10',
					name: 'AttendanceManage',
					code: 'AttendanceManage',
					nodeType: 'page',
					path: '/Attendance/AttendanceManage',
					meta: { title: 'Menu.Attendance.AttendanceManage', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '11',
					name: 'AttendancePeriod',
					code: 'AttendancePeriod',
					nodeType: 'page',
					path: '/Attendance/AttendancePeriod',
					meta: { title: 'Menu.Attendance.AttendancePeriod', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '12',
					name: 'AttendanceRecord',
					code: 'AttendanceRecord',
					nodeType: 'page',
					path: '/Attendance/AttendanceRecord',
					meta: { title: 'Menu.Attendance.AttendanceRecord', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '120',
					name: 'AttendanceResult',
					code: 'AttendanceResult',
					nodeType: 'page',
					path: '/Attendance/AttendanceResult',
					meta: { title: 'Menu.Attendance.AttendanceResult', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '1200',
					name: 'AttendanceCenter',
					code: 'AttendanceCenter',
					nodeType: 'page',
					path: '/Attendance/AttendanceCenter',
					meta: { title: 'Menu.Attendance.AttendanceCenter', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '12000',
					name: 'AttendanceCategory',
					code: 'AttendanceCategory',
					nodeType: 'page',
					path: '/Attendance/AttendanceCategory',
					meta: {
						title: 'Menu.Attendance.AttendanceCategory',
						requiresAuth: true,
						icon: '',
						keepAlive: false
					}
				},
				{
					id: '120000',
					name: 'AttendanceAnalysis',
					code: 'AttendanceAnalysis',
					nodeType: 'page',
					path: '/Attendance/AttendanceAnalysis',
					meta: {
						title: 'Menu.Attendance.AttendanceAnalysis',
						requiresAuth: true,
						icon: '',
						keepAlive: false
					}
				},
				{
					id: '1200000',
					name: 'AttendanceCalculation',
					code: 'AttendanceCalculation',
					nodeType: 'page',
					path: '/Attendance/AttendanceCalculation',
					meta: {
						title: 'Menu.Attendance.AttendanceCalculation',
						requiresAuth: true,
						icon: '',
						keepAlive: false
					}
				},
				{
					id: '12000000',
					name: 'AttendanceModify',
					code: 'AttendanceModify',
					nodeType: 'page',
					path: '/Attendance/AttendanceModify',
					meta: { title: 'Menu.Attendance.AttendanceModify', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '120000000',
					name: 'AttendanceGenerate',
					code: 'AttendanceGenerate',
					nodeType: 'page',
					path: '/Attendance/AttendanceGenerate',
					meta: {
						title: 'Menu.Attendance.AttendanceGenerate',
						requiresAuth: true,
						icon: '',
						keepAlive: false
					}
				},
				{
					id: '1200000000',
					name: 'AttendanceRules',
					code: 'AttendanceRules',
					nodeType: 'page',
					path: '/Attendance/AttendanceRules',
					meta: { title: 'Menu.Attendance.AttendanceRules', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '12000000000',
					name: 'AttendanceChart',
					code: 'AttendanceChart',
					nodeType: 'page',
					path: '/Attendance/AttendanceChart',
					meta: { title: 'Menu.Attendance.AttendanceChart', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '13',
			name: 'ReportPage',
			code: 'ReportPage',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.ReportPage', requiresAuth: false, icon: 'saas-report', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'UserReport',
					code: 'UserReport',
					nodeType: 'folder',
					path: '',
					meta: { title: 'Menu.UserReport', requiresAuth: false, icon: '', keepAlive: false },
					children: [
						{
							id: '10',
							name: 'UserInfoReport',
							code: 'UserInfoReport',
							nodeType: 'page',
							path: '/ReportPage/UserReport/UserInfoReport',
							meta: {
								title: 'Menu.ReportPage.UserReport.UserInfoReport',
								requiresAuth: true,
								icon: '',
								keepAlive: false
							}
						},
						{
							id: '10',
							name: 'UserAttendanceReport',
							code: 'UserAttendanceReport',
							nodeType: 'page',
							path: '/ReportPage/UserReport/UserAttendanceReport',
							meta: {
								title: 'Menu.ReportPage.UserReport.UserAttendanceReport',
								requiresAuth: true,
								icon: '',
								keepAlive: false
							}
						}
					]
				},
				{
					id: '10',
					name: 'OtherReport',
					code: 'OtherReport',
					nodeType: 'page',
					path: '/ReportPage/OtherReport',
					meta: { title: 'Menu.ReportPage.OtherReport', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '13',
			name: 'Account',
			code: 'Account',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.Account', requiresAuth: false, icon: 'saas-user', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'AccountCenter',
					code: 'AccountCenter',
					nodeType: 'page',
					path: '/Account/AccountCenter',
					meta: { title: 'Menu.Account.AccountCenter', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '10',
					name: 'AccountSetting',
					code: 'AccountSetting',
					nodeType: 'page',
					path: '/Account/AccountSetting',
					meta: { title: 'Menu.Account.AccountSetting', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '13',
			name: 'FormPage',
			code: 'FormPage',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.FormPage', requiresAuth: false, icon: 'saas-form', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'BaseForm',
					code: 'BaseForm',
					nodeType: 'page',
					path: '/FormPage/BaseForm',
					meta: { title: 'Menu.FormPage.BaseForm', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '10',
					name: 'SeniorForm',
					code: 'SeniorForm',
					nodeType: 'page',
					path: '/FormPage/SeniorForm',
					meta: { title: 'Menu.FormPage.SeniorForm', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '13',
			name: 'ListPage',
			code: 'ListPage',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.ListPage', requiresAuth: false, icon: 'saas-list', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'QueryList',
					code: 'QueryList',
					nodeType: 'page',
					path: '/ListPage/QueryList',
					meta: { title: 'Menu.ListPage.QueryList', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '10',
					name: 'CardList',
					code: 'CardList',
					nodeType: 'page',
					path: '/ListPage/CardList',
					meta: { title: 'Menu.ListPage.CardList', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		},
		{
			id: '13',
			name: 'Reports',
			code: 'Reports',
			nodeType: 'folder',
			path: '',
			meta: { title: 'Menu.Reports', requiresAuth: false, icon: 'saas-list', keepAlive: false },
			children: [
				{
					id: '9',
					name: 'QueryInfoReport',
					code: 'QueryInfoReport',
					nodeType: 'page',
					type: 'Report',
					path: '',
					meta: { title: 'Menu.QueryInfoReport', requiresAuth: true, icon: '', keepAlive: false }
				},
				{
					id: '10',
					name: 'QueryStateReport',
					code: 'QueryStateReport',
					nodeType: 'page',
					type: 'Report',
					path: '',
					meta: { title: 'Menu.QueryStateReport', requiresAuth: true, icon: '', keepAlive: false }
				}
			]
		}
	]
};

export default config;
