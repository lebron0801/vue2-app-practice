/**
 * filter classname for css code
 * @param {string} str - css code
 * @returns {Array<string>} - classname list
 */
export const getExecStrs = (str: string): string[] => {
	const reg = /\.(.+?)\s/g;
	const list = [];
	let result = null;

	do {
		result = reg.exec(str);
		result && list.push(result[1]);
	} while (result);

	return list;
};

/**
 * 创建hash值
 * @param hashLength hash长度
 * @returns 返回生成出来的hash值
 */
export const createHash = (hashLength = 24) => {
	return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
};

/**
 * 根据配置数据生成组件列表数据
 * @param data 根级别的组件配置数据
 * @param filterNode 需要过滤的组件节点唯一编号集合
 */
export const generateComponentList = (data: any, filterNode: string[]) => {
	const arr: any[] = [];

	data.list.forEach((item: any) => {
		if (item.fieldProperties.type === 'grid') {
			item.componentProperties.columns.forEach((element: any) => {
				if (!filterNode.includes(element.key)) {
					arr.push({ value: element.key, key: element.key, title: element.fieldProperties.title });
				}
			});
		} else {
			if (!filterNode.includes(item.key)) {
				arr.push({
					value: item.key,
					key: item.key,
					label: item.fieldProperties.title,
					title: item.fieldProperties.title
				});
			}
		}
	});

	return arr;
};
