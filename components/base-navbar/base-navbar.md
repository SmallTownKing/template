# base-navbar

## 组件定位

适用于 `uni-app` 多端项目的基础导航栏组件，默认处理：

- 小程序状态栏高度和胶囊按钮避让
- App/H5 顶部安全区兼容
- 固定定位占位，避免页面内容被顶住
- 标题区、左右操作区、底部扩展区的插槽化自定义

## 基础用法

```vue
<template>
	<base-navbar
		title="订单详情"
		subtitle="支持小程序 / App / H5"
		background="linear-gradient(135deg, #0f766e, #1d4ed8)"
		title-color="#ffffff"
		subtitle-color="rgba(255,255,255,0.72)"
		right-text="保存"
		:shadow="true"
		@right-click="handleSave"
	>
		<template #bottom>
			<view class="search-bar">这里可以放 tabs / search / 筛选区</view>
		</template>
	</base-navbar>
</template>
```

## 使用前提

使用自定义导航栏的页面，需要在 `pages.json` 对应页面下配置：

```json
{
	"navigationStyle": "custom"
}
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 主标题 | `String` | `''` |
| `subtitle` | 副标题 | `String` | `''` |
| `fixed` | 是否固定在顶部 | `Boolean` | `true` |
| `placeholder` | 固定模式下是否自动补占位 | `Boolean` | `true` |
| `safeAreaTop` | 是否补齐顶部安全区 | `Boolean` | `true` |
| `autoCapsuleHeight` | 小程序下是否按胶囊高度自动抬高导航区 | `Boolean` | `true` |
| `useCapsuleSpace` | 小程序下是否给右侧保留胶囊避让宽度 | `Boolean` | `true` |
| `autoNavigate` | 左侧默认按钮是否自动执行返回/回首页 | `Boolean` | `true` |
| `showLeft` | 是否展示左侧区域 | `Boolean` | `true` |
| `leftMode` | 左侧模式：`auto/back/home/text/none` | `String` | `auto` |
| `leftText` | 左侧文字 | `String` | `''` |
| `leftIcon` | 左侧文字图标，适合简单符号；复杂 UI 建议用插槽 | `String` | `''` |
| `homeText` | `leftMode=home` 或 `auto` 回首页时的默认文案 | `String` | `首页` |
| `rightText` | 右侧文字 | `String` | `''` |
| `rightIcon` | 右侧文字图标 | `String` | `''` |
| `showCenter` | 是否显示中间标题区；设为 `false` 时中间整块不渲染，右侧自动贴右 | `Boolean` | `true` |
| `titleAlign` | 标题对齐：`center/left` | `String` | `center` |
| `height` | 主导航区高度，建议传数字或 `px` 字符串 | `Number/String` | `44` |
| `paddingX` | 左右内边距 | `Number/String` | `16` |
| `centerPadding` | 中间标题区左右内边距 | `Number/String` | `12` |
| `sideWidth` | 左右操作区基础宽度 | `Number/String` | `96` |
| `leftWidth` | 左侧区域宽度覆盖值 | `Number/String` | `''` |
| `rightWidth` | 右侧区域宽度覆盖值 | `Number/String` | `''` |
| `contentMaxWidth` | 内容最大宽度，适合 H5 大屏居中 | `Number/String` | `''` |
| `bottomHeight` | 底部扩展区最小高度 | `Number/String` | `0` |
| `zIndex` | 层级 | `Number` | `998` |
| `background` | 背景色或渐变背景 | `String` | `#ffffff` |
| `backgroundImage` | 背景图 URL | `String` | `''` |
| `backgroundOpacity` | 背景层透明度 | `Number` | `1` |
| `backgroundBlur` | 背景毛玻璃强度 | `Number/String` | `0` |
| `showBorder` | 是否显示底部分割线 | `Boolean` | `true` |
| `borderColor` | 分割线颜色 | `String` | `rgba(15, 23, 42, 0.08)` |
| `shadow` | 是否显示阴影 | `Boolean` | `false` |
| `shadowColor` | 阴影颜色 | `String` | `rgba(15, 23, 42, 0.08)` |
| `titleColor` | 标题颜色 | `String` | `#111827` |
| `subtitleColor` | 副标题颜色 | `String` | `#6b7280` |
| `leftColor` | 左侧颜色 | `String` | `#111827` |
| `rightColor` | 右侧颜色 | `String` | `#111827` |
| `titleSize` | 标题字号 | `Number/String` | `17` |
| `subtitleSize` | 副标题字号 | `Number/String` | `12` |
| `actionSize` | 左右操作字号 | `Number/String` | `14` |
| `titleWeight` | 标题字重 | `Number/String` | `600` |
| `actionGap` | 左右图文间距 | `Number/String` | `8` |
| `homePath` | 首页地址 | `String` | `''` |
| `homeType` | 首页跳转方式：`reLaunch/switchTab/redirectTo/navigateTo` | `String` | `reLaunch` |
| `customClass` | 根节点自定义 class | `String` | `''` |
| `customStyle` | 根节点自定义 style | `String/Object` | `''` |
| `contentStyle` | 主导航区自定义 style | `String/Object` | `''` |
| `titleStyle` | 标题自定义 style | `String/Object` | `''` |
| `subtitleStyle` | 副标题自定义 style | `String/Object` | `''` |
| `leftStyle` | 左侧区域自定义 style | `String/Object` | `''` |
| `rightStyle` | 右侧区域自定义 style | `String/Object` | `''` |
| `bottomStyle` | 底部扩展区自定义 style | `String/Object` | `''` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `left` | 自定义左侧内容 |
| `title` | 自定义标题区内容 |
| `right` | 自定义右侧内容 |
| `bottom` | 底部扩展区，可放搜索框、tabs、筛选条 |
| `background` | 整个 navbar 背景层，自定义插画/纹理/遮罩 |

## Events

| 事件名 | 说明 |
| --- | --- |
| `left-click` | 点击左侧区域触发 |
| `right-click` | 点击右侧区域触发 |
| `title-click` | 点击标题区域触发 |
| `ready` | 完成尺寸测量后触发，返回导航栏高度信息 |

## 建议

- 简单返回、标题、保存按钮，直接用 props。
- 复杂品牌头部、头像、搜索、胶囊按钮联动，优先用 `left/title/right/bottom/background` 插槽。
- 如果页面只需要左右操作，不要中间标题，直接传 `:show-center="false"`。
- 页面首屏有沉浸式头图时，可用 `backgroundOpacity`、`backgroundBlur`、`showBorder=false` 做透明导航。
