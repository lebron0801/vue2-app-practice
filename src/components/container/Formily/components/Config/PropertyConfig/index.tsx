import { Component, Prop, Vue, Watch, Emit, Inject } from 'vue-property-decorator';
import Draggable from 'vuedraggable';
import SwitchType from '../../SwitchType';
import './index.less';
import ControlCenter from '../../ControlCenter';
import { ValidatorInterface } from '../../../Models/Widget/input';
import { createHash, getExecStrs } from '../../../utils/format';
import CustomEditor from '../../CustomEditor';

@Component
export default class PropertyConfig extends Vue {
	/**
	 * 组件所有配置数据
	 */
	@Prop({
		type: Object,
		default: () => {}
	})
	data!: any;

	/**
	 * 当前选中的组件配置数据模型
	 */
	@Prop({
		type: Object,
		default: () => {}
	})
	select!: any;

	@Watch('select')
	private dataChangeHandle() {
		this.drawerVisible = false;
	}

	// 监听表单自定义样式的变化，进而给当前组件选择自定义classname
	@Watch('data.config.customStyle')
	private customStyleChangeHandle() {
		this.classList = getExecStrs(this.data.config.customStyle);
	}

	@Inject('generateComponentList')
	generateComponentList!: (filterNode?: string[]) => any[];

	get show() {
		if (this.select && !this.select.config && Object.keys(this.select).length > 0) {
			return true;
		}

		return false;
	}

	// 是否显示受控中心弹窗
	private visible = false;

	// 校验规则折叠箭头角度
	private rotate = 0;

	// 校验规则列表
	private rules = [
		{ value: 'url', label: 'URL地址' },
		{ value: 'email', label: '邮箱格式' },
		{ value: 'number', label: '数字' },
		{ value: 'integer', label: '整数格式' },
		{ value: 'idcard', label: '身份证格式' },
		{ value: 'phone', label: '手机号格式' },
		{ value: 'zh', label: '中文格式' },
		{ value: 'zip', label: '邮编格式' }
	];

	// 是否显示高级校验配置抽屉
	private drawerVisible = false;

	// 当前所在编辑的高级校验配置对象
	private currentCheckRule: ValidatorInterface | any = {};

	// 组件列表数据
	private componentList: any[] = [];

	// customStyle 转换的列表数据
	private classList: string[] = [];

	render() {
		// 字段属性
		const fieldProperties = this.select && !this.select.config && this.select.fieldProperties;
		// 组件属性
		const componentProperties = this.select && !this.select.config && this.select.componentProperties;
		// 容器属性
		const decoratorProperties = this.select && !this.select.config && this.select.decoratorProperties;

		return (
			<div class="property-config-wrapper">
				{this.show && (
					<a-collapse
						default-active-key="1"
						scopedSlots={{
							expandIcon: (props: any) => {
								return <a-icon type="caret-right" rotate={props.isActive ? 90 : 0} />;
							}
						}}
					>
						<a-collapse-panel key="1" header="字段属性">
							<a-form-model
								props={{ model: fieldProperties }}
								label-col={{ span: 9 }}
								wrapper-col={{ span: 14, offset: 1 }}
								labelAlign="left"
							>
								<a-form-model-item
									label="字段标识"
									prop="name"
									key={this.select.key}
									rules={[
										{
											required: true,
											message: '字段标识不能为空'
										},
										{
											pattern: /^[a-z]+$/i,
											message: '只能使用英文字母'
										}
									]}
								>
									<a-input vModel={fieldProperties.name} />
								</a-form-model-item>
								<a-form-model-item label="标题">
									<a-input vModel={fieldProperties.title} />
								</a-form-model-item>
								<a-form-model-item label="标题国际化标识">
									<a-input vModel={fieldProperties.titleLangKey} />
								</a-form-model-item>
								<a-form-model-item label="描述">
									<a-textarea autoSize vModel={fieldProperties.description} />
								</a-form-model-item>
								<a-form-model-item label="描述国际化标识">
									<a-input vModel={fieldProperties.descriptionLangKey} />
								</a-form-model-item>
								<a-form-model-item>
									<template slot="label">
										<a-tooltip placement="left" title="半隐藏只会隐藏UI，全隐藏会删除数据">
											展示状态
										</a-tooltip>
									</template>
									<a-select vModel={fieldProperties.display}>
										<a-select-option value="visible">显示</a-select-option>
										<a-select-option value="hidden">半隐藏</a-select-option>
										<a-select-option value="none">全隐藏</a-select-option>
									</a-select>
								</a-form-model-item>
								<a-form-model-item label="UI形态">
									<a-select vModel={fieldProperties.pattern}>
										<a-select-option value="editable">可编辑</a-select-option>
										<a-select-option value="disabled">禁用</a-select-option>
										<a-select-option value="readOnly">只读</a-select-option>
										<a-select-option value="readPretty">阅读</a-select-option>
									</a-select>
								</a-form-model-item>
								<a-form-model-item>
									<template slot="label">
										<a-tooltip title='阅读模式下数据格式化函数，格式: function (value){ return "string"}'>
											格式化函数
										</a-tooltip>
									</template>
									<a-popover trigger="click" placement="bottomRight" arrow-point-at-center>
										<template slot="content">
											<div style="width: 300px">
												<CustomEditor
													height="200"
													theme="chrome"
													onChange={(value: string) => {
														fieldProperties.valueFormatter = value;
													}}
													value={fieldProperties.valueFormatter}
													lang="javascript"
												></CustomEditor>
											</div>
										</template>
										<a-button block>表达式</a-button>
									</a-popover>
								</a-form-model-item>
								<a-form-model-item label="默认值">
									<a-input vModel={fieldProperties.defaultValue} />
								</a-form-model-item>
								<a-form-model-item label="必填">
									<a-switch vModel={fieldProperties.required} />
								</a-form-model-item>
								<a-form-model-item label="必填错误消息">
									<a-input vModel={fieldProperties.requiredMessage} />
								</a-form-model-item>
								<a-form-model-item label="必填消息国际化标识">
									<a-input vModel={fieldProperties.requiredMessageLangKey} />
								</a-form-model-item>
								<a-form-model-item label="受控中心">
									<a-button
										block
										onClick={() => {
											this.visible = true;
										}}
									>
										受控配置
									</a-button>
								</a-form-model-item>
								<a-form-model-item>
									<template slot="label">
										<span
											class="property-config-wrapper__check-rule"
											onClick={() => {
												this.rotate = this.rotate === 0 ? 90 : 0;
											}}
										>
											<a-icon
												type="right"
												class="property-config-wrapper__check-rule-icon"
												rotate={this.rotate}
											/>
											<span>校验规则</span>
										</span>
									</template>
									{Array.isArray(fieldProperties.validator) ? (
										<a-select
											allowClear
											placeholder="请选择"
											onChange={(value: string) => {
												fieldProperties.validator = value;
											}}
											options={this.rules}
										></a-select>
									) : (
										<a-select
											vModel={fieldProperties.validator}
											key="default"
											allowClear
											placeholder="请选择"
											options={this.rules}
										></a-select>
									)}
								</a-form-model-item>
								{this.rotate === 90 && (
									<div class="property-config-wrapper__check-rule-advance">
										{Array.isArray(fieldProperties.validator) && (
											<Draggable
												vModel={fieldProperties.validator}
												ghostClass="ghost"
												animation={200}
												handle=".drag-handle"
												move={(e: any) => {
													return true;
												}}
											>
												<transition-group name="fade" tag="div">
													{fieldProperties.validator.map(
														(item: ValidatorInterface & { key: string }, index: number) => {
															return (
																<div
																	class="property-config-wrapper__check-rule-advance-item"
																	key={item.key}
																>
																	<a-row type="flex" justify="center" align="middle">
																		<a-col span={3}>
																			<a-icon
																				type="menu"
																				style="cursor: move"
																				class="drag-handle"
																			/>
																		</a-col>
																		<a-col span={12}>
																			<a-button
																				onClick={() => {
																					this.currentCheckRule =
																						fieldProperties.validator[
																							index
																						];

																					this.componentList = this.generateComponentList(
																						[this.select.key]
																					);
																					this.drawerVisible = true;
																				}}
																			>
																				配置规则
																			</a-button>
																		</a-col>
																		<a-col span={3}>
																			<a-icon
																				type="up"
																				onClick={() => {
																					const temp =
																						fieldProperties.validator;
																					if (temp.length === 1) return;

																					temp.splice(
																						index - 1,
																						1,
																						...temp.splice(
																							index,
																							1,
																							temp[index - 1]
																						)
																					);
																				}}
																			/>
																		</a-col>
																		<a-col span={3}>
																			<a-icon
																				type="down"
																				onClick={() => {
																					const temp =
																						fieldProperties.validator;
																					if (temp.length === index + 1)
																						return;
																					temp.splice(
																						index,
																						1,
																						...temp.splice(
																							index + 1,
																							1,
																							temp[index]
																						)
																					);
																				}}
																			/>
																		</a-col>
																		<a-col span={3}>
																			<a-icon
																				type="delete"
																				onClick={() => {
																					fieldProperties.validator.splice(
																						index,
																						1
																					);
																				}}
																			/>
																		</a-col>
																	</a-row>
																</div>
															);
														}
													)}
												</transition-group>
											</Draggable>
										)}
										<a-button
											type="dashed"
											block
											icon="plus"
											onClick={() => {
												if (!Array.isArray(fieldProperties.validator)) {
													this.$set(fieldProperties, 'validator', []);
												}

												fieldProperties.validator.push({
													key: createHash(12),
													strategy: 'self',
													triggerType: 'onInput',
													driveList: [],
													rangeRuleList: [
														{
															fieldName: '',
															condition: '',
															target: null,
															unit: '',
															message: '',
															messageLangKey: ''
														}
													],
													validator: '',
													message: '',
													messageLangKey: '',
													format: undefined,
													pattern: '',
													len: null,
													max: null,
													min: null,
													exclusiveMaximum: null,
													exclusiveMinimum: null,
													whitespace: false
												});
											}}
										>
											添加校验规则
										</a-button>
									</div>
								)}
							</a-form-model>
						</a-collapse-panel>
						<a-collapse-panel key="2" header="组件属性">
							<a-form-model
								props={{ model: componentProperties }}
								label-col={{ span: 9 }}
								wrapper-col={{ span: 14, offset: 1 }}
								labelAlign="left"
							>
								<a-form-model-item label="尺寸">
									<a-select vModel={componentProperties.size} placeholder="请选择">
										<a-select-option value="large">大</a-select-option>
										<a-select-option value="default">默认</a-select-option>
										<a-select-option value="small">小</a-select-option>
									</a-select>
								</a-form-model-item>
								<a-form-model-item label="前缀标签">
									<a-input vModel={componentProperties.addonBefore} />
								</a-form-model-item>
								<a-form-model-item label="后缀标签">
									<a-input vModel={componentProperties.addonAfter} />
								</a-form-model-item>
								<a-form-model-item label="前缀">
									<a-input vModel={componentProperties.prefix} />
								</a-form-model-item>
								<a-form-model-item label="后缀">
									<a-input vModel={componentProperties.suffix} />
								</a-form-model-item>
								<a-form-model-item label="允许清除内容">
									<a-switch vModel={componentProperties.allowClear} />
								</a-form-model-item>
								<a-form-model-item label="最大长度">
									<a-input-number style="width: 100%" vModel={componentProperties.maxLength} />
								</a-form-model-item>
								<a-form-model-item label="占位提示">
									<a-input vModel={componentProperties.placeholder} />
								</a-form-model-item>
								<a-form-model-item label="占位提示国际化标识">
									<a-input vModel={componentProperties.placeholderLangKey} />
								</a-form-model-item>
							</a-form-model>
						</a-collapse-panel>
						<a-collapse-panel key="3" header="容器属性">
							<a-form-model
								props={{ model: decoratorProperties }}
								label-col={{ span: 9 }}
								wrapper-col={{ span: 14, offset: 1 }}
								labelAlign="left"
							>
								<a-form-model-item label="提示">
									<a-input vModel={decoratorProperties.tooltip} />
								</a-form-model-item>
								<a-form-model-item label="提示国际化标识">
									<a-input vModel={decoratorProperties.tooltipLangKey} />
								</a-form-model-item>
								<a-form-model-item label="标签栅格宽度">
									<a-input-number
										style="width: 100%"
										vModel={decoratorProperties.labelCol}
										min={1}
										max={24}
									/>
								</a-form-model-item>
								<a-form-model-item label="组件栅格宽度">
									<a-input-number
										style="width: 100%"
										vModel={decoratorProperties.wrapperCol}
										min={1}
										max={24}
									/>
								</a-form-model-item>

								<a-form-model-item label="标签宽度">
									<SwitchType
										value={decoratorProperties.labelWidth}
										onChange={(value: string) => {
											decoratorProperties.labelWidth = value;
										}}
									/>
								</a-form-model-item>
								<a-form-model-item label="组件宽度">
									<SwitchType
										value={decoratorProperties.wrapperWidth}
										onChange={(value: string) => {
											decoratorProperties.wrapperWidth = value;
										}}
									/>
								</a-form-model-item>
								<a-form-model-item label="标签对齐方式">
									<a-select vModel={decoratorProperties.labelAlign} placeholder="请选择">
										<a-select-option value="left">左对齐</a-select-option>
										<a-select-option value="right">右对齐</a-select-option>
									</a-select>
								</a-form-model-item>
								<a-form-model-item label="组件对齐方式">
									<a-select vModel={decoratorProperties.wrapperAlign} placeholder="请选择">
										<a-select-option value="left">左对齐</a-select-option>
										<a-select-option value="right">右对齐</a-select-option>
									</a-select>
								</a-form-model-item>
								<a-form-model-item label="是否隐藏标签">
									<a-switch vModel={decoratorProperties.hideLabel} />
								</a-form-model-item>
								<a-form-model-item label="是否有冒号">
									<a-switch vModel={decoratorProperties.colon} />
								</a-form-model-item>
								<a-form-model-item label="自定义类名">
									<a-select mode="tags" vModel={decoratorProperties.customClass}>
										{this.classList.map((item, index) => {
											return (
												<a-select-option key={(index + 9).toString(36) + index} value={item}>
													{item}
												</a-select-option>
											);
										})}
									</a-select>
								</a-form-model-item>
							</a-form-model>
						</a-collapse-panel>
					</a-collapse>
				)}

				{/* 受控中心配置 */}
				{this.show && this.visible && (
					<ControlCenter
						data={fieldProperties.reactions}
						id={this.select.key}
						onConfirm={(data: any) => {
							fieldProperties.reactions = data;
							this.visible = false;
						}}
						onCancel={() => {
							this.visible = false;
						}}
					/>
				)}

				{/* 高级校验规则抽屉 */}
				<a-drawer
					placement="right"
					closable={false}
					keyboard={false}
					getContainer={() => {
						return document.querySelector('.property-config-wrapper');
					}}
					destroyOnClose
					width="250px"
					visible={this.drawerVisible}
					mask={false}
					headerStyle={{ padding: '10px 24px' }}
				>
					<template slot="title">
						<span
							class="property-config-wrapper__close-drawer"
							onClick={() => {
								this.drawerVisible = false;
							}}
						>
							<a-icon type="rollback" /> 返回
						</span>
					</template>
					<div>
						{this.currentCheckRule && (
							<a-form-model
								label-col={{ span: 9 }}
								wrapper-col={{ span: 14, offset: 1 }}
								labelAlign="left"
							>
								<a-form-model-item label="触发类型">
									<a-select vModel={this.currentCheckRule.triggerType} placeholder="请选择">
										<a-select-option value="onInput">输入时</a-select-option>
										<a-select-option value="onFocus">聚焦时</a-select-option>
										<a-select-option value="onBlur">失焦时</a-select-option>
									</a-select>
								</a-form-model-item>
								<a-form-model-item label="校验策略">
									<a-select vModel={this.currentCheckRule.strategy}>
										<a-select-option value="self">自身校验</a-select-option>
										<a-select-option value="drive">驱动校验</a-select-option>
										{/* <a-select-option value="range">范围校验</a-select-option> */}
									</a-select>
								</a-form-model-item>

								{this.currentCheckRule.strategy === 'drive' && (
									<a-form-model-item label="驱动校验字段">
										<a-select
											vModel={this.currentCheckRule.driveList}
											placeholder="请选择"
											optionFilterProp="title"
											allowClear
											mode="multiple"
											options={this.componentList}
										></a-select>
									</a-form-model-item>
								)}

								{this.currentCheckRule.strategy === 'self' && [
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title='格式: function (value){ return "Error Message"}'>
												自定义校验器
											</a-tooltip>
										</template>
										<a-popover trigger="click" placement="bottomRight" arrow-point-at-center>
											<template slot="content">
												<div style="width: 300px">
													<CustomEditor
														height="200"
														theme="chrome"
														onChange={(value: string) => {
															this.currentCheckRule.validator = value;
														}}
														value={this.currentCheckRule.validator}
														lang="javascript"
													></CustomEditor>
												</div>
											</template>
											<a-button block>表达式</a-button>
										</a-popover>
									</a-form-model-item>,
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title="错误消息只对当前规则集的一个内置规则生效，如果需要对不同内置规则定制错误消息，请拆分成多条规则">
												错误消息
											</a-tooltip>
										</template>
										<a-input vModel={this.currentCheckRule.message} />
									</a-form-model-item>,
									<a-form-model-item label="错误消息国际化标识">
										<a-input vModel={this.currentCheckRule.messageLangKey} />
									</a-form-model-item>,
									<a-form-model-item label="格式校验">
										<a-select
											allowClear
											vModel={this.currentCheckRule.format}
											placeholder="请选择"
											onChange={(value: string) => {
												this.currentCheckRule.format = value;
											}}
											options={this.rules}
										></a-select>
									</a-form-model-item>,
									<a-form-model-item label="正则表达式">
										<a-input prefix="/" suffix="/" vModel={this.currentCheckRule.pattern} />
									</a-form-model-item>,
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title="【长度限制】：字符的长度或者数值要等于此值，如果不想校验此规则，可删除其值">
												长度限制
											</a-tooltip>
										</template>
										<a-input-number vModel={this.currentCheckRule.len} style="width: 100%" />
									</a-form-model-item>,
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title="【长度/数值小于】：字符的长度或者数值要小于此值，如果不想校验此规则，可删除其值">
												长度/数值小于
											</a-tooltip>
										</template>
										<a-input-number vModel={this.currentCheckRule.max} style="width: 100%" />
									</a-form-model-item>,
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title="【长度/数值大于】：字符的长度或者数值要大于此值，如果不想校验此规则，可删除其值">
												长度/数值大于
											</a-tooltip>
										</template>
										<a-input-number vModel={this.currentCheckRule.min} style="width: 100%" />
									</a-form-model-item>,
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title="【长度/数值小于等于】：字符的长度或者数值要小于等于此值，如果不想校验此规则，可删除其值">
												长度/数值小于等于
											</a-tooltip>
										</template>
										<a-input-number
											vModel={this.currentCheckRule.exclusiveMaximum}
											style="width: 100%"
										/>
									</a-form-model-item>,
									<a-form-model-item>
										<template slot="label">
											<a-tooltip title="【长度/数值大于等于】：字符的长度或者数值要大于等于此值，如果不想校验此规则，可删除其值">
												长度/数值大于等于
											</a-tooltip>
										</template>
										<a-input-number
											vModel={this.currentCheckRule.exclusiveMinimum}
											style="width: 100%"
										/>
									</a-form-model-item>
								]}

								<a-form-model-item label="不允许有空格">
									<a-switch vModel={this.currentCheckRule.whitespace} />
								</a-form-model-item>
							</a-form-model>
						)}
					</div>
				</a-drawer>
			</div>
		);
	}
}
