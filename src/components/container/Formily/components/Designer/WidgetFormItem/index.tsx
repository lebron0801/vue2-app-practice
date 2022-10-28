import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import classnames from 'classnames';
import { createHash } from '../../../utils/format';
import './index.less';

@Component
export default class WidgetFormItem extends Vue {
	/**
	 * 单个字段配置数据
	 */
	@Prop({
		type: Object,
		default: () => {}
	})
	data!: any;

	/**
	 * 组件所有配置数据
	 */
	@Prop({
		type: Object,
		default: () => ({})
	})
	allConfig!: any;

	/**
	 * 当前组件所在的对应的list对象
	 */
	@Prop({
		type: Array,
		default: () => []
	})
	list!: any[];

	/**
	 * 当前组件所在的对应的父级对象
	 */
	@Prop({
		type: Object,
		default: () => {}
	})
	parentContainer!: any;

	/**
	 * 当前选中的字段（基础，高级，布局）配置数据
	 */
	@Prop({
		type: Object,
		default: () => {}
	})
	select!: any;

	/**
	 * 跟新当前选中的输入组件
	 * @param value 当前点击的栅格布局组件配置数据
	 */
	@Emit('select')
	private componentSelectChangeHandle(value: any) {}

	/**
	 * 删除栅格组件
	 * @param value 当前所要删除的栅格组件的配置数据
	 */
	@Emit('remove')
	private componentRemoveHandle(value: any, parentContainer: any) {
		return this.list;
	}

	/**
	 * 复制组件
	 * @param data 复制的数据对象
	 */
	private handleWidgetClone(data: any) {
		const curIndex = this.list.findIndex((item: any) => item.key === data.key);
		let cloneData = {
			...data,
			key: createHash(12)
		};

		cloneData = JSON.parse(JSON.stringify(cloneData));

		this.list.splice(curIndex, 0, cloneData);

		this.$nextTick(() => {
			this.componentSelectChangeHandle(this.list[curIndex + 1]);
		});
	}

	// 动态导入输入组件
	private InputComponent: any = () => import(`../InputComponents/${this.data.fieldProperties.type}`);

	// 计算标签宽度
	get labelWidth() {
		if (this.data.decoratorProperties.labelWidth !== 'auto') {
			return this.data.decoratorProperties.labelWidth;
		}

		if (this.allConfig.config.labelWidth !== 'auto') {
			return this.allConfig.config.labelWidth;
		}

		return '';
	}

	// 计算控件宽度
	get wrapperWidth() {
		if (this.data.decoratorProperties.wrapperWidth !== 'auto') {
			return this.data.decoratorProperties.wrapperWidth;
		}

		if (this.allConfig.config.wrapperWidth !== 'auto') {
			return this.allConfig.config.wrapperWidth;
		}

		return '';
	}

	// 计算组件对齐方式
	get wrapperAlign() {
		if (this.data.decoratorProperties.wrapperAlign) {
			return this.data.decoratorProperties.wrapperAlign === 'left' ? 'flex-start' : 'flex-end';
		}

		if (this.allConfig.config.wrapperAlign) {
			return this.allConfig.config.wrapperAlign === 'left' ? 'flex-start' : 'flex-end';
		}
	}

	render() {
		const data = this.data;

		return (
			<div class="widget-form-item">
				<div
					class={classnames('widget-form-item__item', {
						active: this.select.key == data.key
					})}
					onClick={(e: Event) => {
						e.stopPropagation();
						this.componentSelectChangeHandle(data);
					}}
				>
					<a-form-item
						style={{ visibility: data.fieldProperties.display === 'visible' ? 'visible' : 'hidden' }}
						required={data.fieldProperties.required}
						class={data.componentProperties.size ?? this.allConfig.config.size}
						props={
							this.allConfig.config.layout === 'horizontal'
								? {
										labelCol: {
											span:
												this.data.decoratorProperties.labelCol ?? this.allConfig.config.labelCol
										},
										wrapperCol: {
											span:
												this.data.decoratorProperties.wrapperCol ??
												this.allConfig.config.wrapperCol
										}
								  }
								: null
						}
						colon={data.decoratorProperties.colon}
						labelAlign={data.decoratorProperties.labelAlign ?? this.allConfig.config.labelAlign}
						extra={this.$t(data.fieldProperties.descriptionLangKey) || data.fieldProperties.description}
					>
						{data.decoratorProperties.hideLabel ? null : (
							<template slot="label">
								<span style={{ display: 'inline-block', width: this.labelWidth }}>
									{this.$t(data.fieldProperties.titleLangKey) || data.fieldProperties.title}
									{(this.$t(data.decoratorProperties.tooltipLangKey) !== '' ||
										data.decoratorProperties.tooltip !== '') && (
										<a-tooltip
											title={
												this.$t(data.decoratorProperties.tooltipLangKey) ||
												data.decoratorProperties.tooltip
											}
										>
											<a-icon
												type="info-circle"
												style="color: rgba(0,0,0,.45); position: relative; top: 1px; margin-left: 4px"
											/>
										</a-tooltip>
									)}
								</span>
							</template>
						)}
						<div
							style={{
								display: 'flex',
								justifyContent: this.wrapperAlign
							}}
						>
							{
								<this.InputComponent
									config={data}
									allConfig={this.allConfig}
									style={{ width: this.wrapperWidth }}
								/>
							}
						</div>
					</a-form-item>
				</div>

				{this.select.key == data.key && [
					<div class="widget-form-item__item-action" style="top: 0; right: 56px;">
						<a-tooltip title="删除组件">
							<a-icon
								type="delete"
								onClick={(e: Event) => {
									e.stopPropagation();
									this.componentRemoveHandle(data, this.parentContainer);
								}}
							/>
						</a-tooltip>
					</div>,
					<div class="widget-form-item__item-action" style="top: 0; right: 28px;">
						<a-tooltip title="复制组件">
							<a-icon
								type="copy"
								onClick={(e: Event) => {
									e.stopPropagation();
									this.handleWidgetClone(data);
								}}
							/>
						</a-tooltip>
					</div>,
					<div class="widget-form-item__item-drag" style="top: 0; cursor: move;">
						<a-tooltip title="拖拽排序">
							<a-icon type="drag" class="drag-widget" />
						</a-tooltip>
					</div>
				]}
			</div>
		);
	}
}
