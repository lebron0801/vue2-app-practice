const gridModel = {
	/**
	 * 字段属性
	 */
	fieldProperties: {
		/**
		 * @name 控件类型
		 * @description 控件的类型
		 * @type {string}
		 * @default 'grid'
		 */
		type: 'grid',
		/**
		 * @name 字段标识
		 * @description 一般指对应数据库中的列名
		 * @type {string}
		 * @default ''
		 */
		name: '',
		/**
		 * @name 标题
		 * @description 指显示控件的名称，如果配置了国际化标识，将读取指定的数据，否则此处将作为默认值
		 * @type {string}
		 * @default '栅格布局'
		 */
		title: '栅格布局',
		/**
		 * @name 标题国际化标识
		 * @description 指多语言对应的key，不限制标识格式
		 * @type {string}
		 * @default ''
		 */
		titleLangKey: '',
		/**
		 * @name 描述
		 * @description 指给字段进行简单描述或者备注
		 * @type {string}
		 * @default ''
		 */
		description: '',
		/**
		 * @name 描述国际化标识
		 * @description 指多语言对应的key，不限制标识格式
		 * @type {string}
		 * @default ''
		 */
		descriptionLangKey: ''
	},
	/**
	 * 组件属性
	 */
	componentProperties: {
		/**
		 * @name 栅格列
		 * @param {Array.<object>} columns
		 * @param {number} columns[].span 栅格占位格数
		 * @param {Array} columns[].list 栅格中的控件配置
		 */
		columns: [
			{
				span: 12,
				list: []
			},
			{
				span: 12,
				list: []
			}
		],
		/**
		 * @name 栅格间隔
		 * @description 栅格之间的距离，单位px
		 * @type {number}
		 * @default 0
		 */
		gutter: 0,
		/**
		 * @name 水平排列方式
		 * @description flex 布局下的水平排列方式
		 * @param {('start', 'end', 'center', 'space-around', 'space-between')}
		 * @default 'start'
		 */
		justify: 'start',
		/**
		 * @name 垂直排列方式
		 * @description flex 布局下的垂直对齐方式
		 * @param {('top', 'middle', 'bottom')}
		 * @default 'top'
		 */
		align: 'top'
	}
};

export default gridModel;
