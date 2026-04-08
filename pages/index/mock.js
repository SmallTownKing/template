export const homeScheduleApiResponse = {
	module_name: '本周上新档期',
	module_desc: '这里模拟的是接口原始字段，页面不会直接把它塞给组件。',
	default_tab: 'today',
	tab_list: [
		{
			code: 'today',
			name: '今天',
			badge: '3场'
		},
		{
			code: 'tomorrow',
			name: '明天',
			badge: '2场'
		},
		{
			code: 'weekend',
			name: '周末',
			badge: '5场'
		}
	],
	schedule_map: {
		today: [
			{
				id: 'today-1',
				start_at: '10:00',
				end_at: '12:00',
				module_title: '新手体验专场',
				module_desc: '适合首页首屏活动位，节奏轻，说明直接。'
			},
			{
				id: 'today-2',
				start_at: '14:00',
				end_at: '16:00',
				module_title: '限定卡池预热',
				module_desc: '适合搭配倒计时、概率说明和规则弹窗。'
			},
			{
				id: 'today-3',
				start_at: '20:00',
				end_at: '22:00',
				module_title: '晚间福利场',
				module_desc: '适合做强氛围感视觉，主打转化。'
			}
		],
		tomorrow: [
			{
				id: 'tomorrow-1',
				start_at: '11:00',
				end_at: '13:00',
				module_title: '新品卡面首发',
				module_desc: '可以和分类 tabs、系列筛选联动。'
			},
			{
				id: 'tomorrow-2',
				start_at: '19:30',
				end_at: '21:00',
				module_title: '主题限时返场',
				module_desc: '适合做橱窗感强一点的展示布局。'
			}
		],
		weekend: [
			{
				id: 'weekend-1',
				start_at: '09:30',
				end_at: '11:00',
				module_title: '周末开门红',
				module_desc: '可以加 banner、跑马灯和活动承接区。'
			},
			{
				id: 'weekend-2',
				start_at: '12:00',
				end_at: '14:00',
				module_title: '热门主题补货',
				module_desc: '适合带库存、售罄、订阅提醒等状态。'
			},
			{
				id: 'weekend-3',
				start_at: '15:00',
				end_at: '17:00',
				module_title: '主播联动专场',
				module_desc: '可以扩展头像、直播状态、预约入口。'
			},
			{
				id: 'weekend-4',
				start_at: '18:30',
				end_at: '20:30',
				module_title: '高热卡池冲刺',
				module_desc: '适合大按钮、强对比色 CTA。'
			},
			{
				id: 'weekend-5',
				start_at: '21:00',
				end_at: '23:00',
				module_title: '深夜彩蛋场',
				module_desc: '可以做成低饱和夜场主题。'
			}
		]
	}
}
