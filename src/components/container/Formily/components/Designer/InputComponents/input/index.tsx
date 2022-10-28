import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
	/**
	 * 单个字段配置数据
	 */
	@Prop({
		type: Object,
		default: () => {}
	})
	config!: any;

	/**
	 * 组件所有配置数据
	 */
	@Prop({
		type: Object,
		default: () => ({})
	})
	allConfig!: any;

	render() {
		const fieldProperties = this.config.fieldProperties;
		const componentProperties = this.config.componentProperties;
		const formConfig = this.allConfig.config;

		return fieldProperties.pattern === 'readPretty' ? (
			<div>{fieldProperties.defaultValue === '' ? 'N/A' : fieldProperties.defaultValue}</div>
		) : (
			<a-input
				readOnly
				value={fieldProperties.defaultValue}
				placeholder={componentProperties.placeholder}
				size={componentProperties.size ?? formConfig.size}
				addonAfter={componentProperties.addonAfter}
				addonBefore={componentProperties.addonBefore}
				prefix={componentProperties.prefix}
				suffix={componentProperties.suffix}
				allowClear={componentProperties.allowClear}
				maxLength={componentProperties.maxLength}
				disabled={fieldProperties.pattern === 'disabled'}
			/>
		);
	}
}
