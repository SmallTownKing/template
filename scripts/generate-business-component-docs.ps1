$ErrorActionPreference = 'Stop'

$components = @(
	@{
		Path = 'components/business/card/card-album-grid'
		Name = 'card-album-grid'
		Description = '用于卡牌页展示卡册、卡面或卡池内容的宫格列表组件，负责把卡片数据按统一栅格方式排出来。'
		Scenes = @('卡牌列表页', '卡册展示页', '系列内容宫格页')
	},
	@{
		Path = 'components/business/card/card-collection-panel'
		Name = 'card-collection-panel'
		Description = '用于展示用户卡牌收藏概览、收集进度或统计信息的面板组件，适合放在卡牌页顶部或中间信息区。'
		Scenes = @('卡牌收藏页', '图鉴进度页', '卡册统计区')
	},
	@{
		Path = 'components/business/card/card-container-popup'
		Name = 'card-container-popup'
		Description = '用于承载卡牌相关弹层内容的弹窗组件，适合做容器选择、卡盒说明、操作确认等交互。'
		Scenes = @('卡盒选择弹层', '容器操作弹窗', '卡牌辅助说明弹层')
	},
	@{
		Path = 'components/business/card/card-detail-panel'
		Name = 'card-detail-panel'
		Description = '用于展示单张卡牌的详细信息、属性、描述和相关操作，是卡牌详情场景的核心信息面板。'
		Scenes = @('卡牌详情页', '卡牌弹层详情', '卡牌信息展示区')
	},
	@{
		Path = 'components/business/card/card-hero'
		Name = 'card-hero'
		Description = '用于卡牌业务页面顶部的头图区或信息首屏，通常承载标题、系列信息、装饰图和入口按钮。'
		Scenes = @('卡牌首页头部', '卡册页头图', '系列专题页首屏')
	},
	@{
		Path = 'components/business/card/card-series-tabs'
		Name = 'card-series-tabs'
		Description = '用于切换卡牌系列、卡册分类或筛选维度的业务 tabs 组件，适合横向分类切换场景。'
		Scenes = @('卡牌系列切换', '卡册分类筛选', '图鉴类型切换')
	},
	@{
		Path = 'components/business/home/home-activity-tabs'
		Name = 'home-activity-tabs'
		Description = '用于首页活动楼层、推荐分组或模块分类切换的 tabs 组件，主要服务首页内容分发。'
		Scenes = @('首页活动分类', '推荐模块切换', '首页内容筛选')
	},
	@{
		Path = 'components/business/home/home-floating-entry'
		Name = 'home-floating-entry'
		Description = '用于首页悬浮入口区的业务组件，通常承载快捷操作、浮动按钮组或固定功能入口。'
		Scenes = @('首页悬浮操作', '快捷入口组', '固定侧边按钮')
	},
	@{
		Path = 'components/business/home/home-floor-section'
		Name = 'home-floor-section'
		Description = '用于首页楼层内容分组的业务区块组件，负责统一楼层标题、描述和内容容器结构。'
		Scenes = @('首页楼层区块', '活动楼层', '首页模块分组')
	},
	@{
		Path = 'components/business/home/home-hero'
		Name = 'home-hero'
		Description = '用于首页首屏头图或 banner 区域的业务组件，通常展示活动宣传、核心卖点和首屏入口。'
		Scenes = @('首页首屏 banner', '活动头图', '首页视觉主入口')
	},
	@{
		Path = 'components/business/home/home-notice-bar'
		Name = 'home-notice-bar'
		Description = '用于首页公告、滚动消息、平台通知等信息提示的业务组件。'
		Scenes = @('首页公告栏', '消息提示区', '平台通知入口')
	},
	@{
		Path = 'components/business/home/home-quick-nav'
		Name = 'home-quick-nav'
		Description = '用于首页快捷导航入口宫格的业务组件，适合承载业务模块入口、玩法入口和频道跳转。'
		Scenes = @('首页快捷入口', '功能导航宫格', '频道入口区')
	},
	@{
		Path = 'components/business/lottery/lottery-bottom-bar'
		Name = 'lottery-bottom-bar'
		Description = '用于抽盒页底部固定操作区的业务组件，通常包含抽一次、抽十次、价格和说明入口。'
		Scenes = @('抽盒页底部操作', '购买操作栏', '固定下单区')
	},
	@{
		Path = 'components/business/lottery/lottery-demon-panel'
		Name = 'lottery-demon-panel'
		Description = '用于展示魔王赏、特殊玩法或高阶池子信息的业务面板组件。'
		Scenes = @('魔王赏模块', '特殊池子展示', '高阶玩法说明区')
	},
	@{
		Path = 'components/business/lottery/lottery-game-switch'
		Name = 'lottery-game-switch'
		Description = '用于切换抽盒玩法、奖池模式或不同业务视图的业务切换组件。'
		Scenes = @('玩法模式切换', '奖池视图切换', '抽盒子页分段切换')
	},
	@{
		Path = 'components/business/lottery/lottery-guarantee-panel'
		Name = 'lottery-guarantee-panel'
		Description = '用于展示保底规则、进度状态、剩余次数等抽盒保底相关信息的业务面板。'
		Scenes = @('保底说明区', '抽盒进度展示', '保底规则模块')
	},
	@{
		Path = 'components/business/lottery/lottery-hero'
		Name = 'lottery-hero'
		Description = '用于抽盒业务页顶部头图区的业务组件，负责展示池子主视觉、标题和核心信息。'
		Scenes = @('抽盒页头部', '池子首屏信息', '活动池头图')
	},
	@{
		Path = 'components/business/lottery/lottery-online-ranking'
		Name = 'lottery-online-ranking'
		Description = '用于展示当前在线榜单、幸运榜或实时排行的业务组件。'
		Scenes = @('在线幸运榜', '抽盒排行区', '实时榜单模块')
	},
	@{
		Path = 'components/business/lottery/lottery-online-users'
		Name = 'lottery-online-users'
		Description = '用于展示当前在线用户、最近参与用户或实时氛围数据的业务组件。'
		Scenes = @('在线用户区', '最近参与展示', '抽盒氛围模块')
	},
	@{
		Path = 'components/business/lottery/lottery-prize-grid'
		Name = 'lottery-prize-grid'
		Description = '用于展示奖品内容、奖项列表或卡面内容的宫格组件，是抽盒页面核心内容区之一。'
		Scenes = @('奖品宫格', '池子内容展示', '抽盒奖项列表')
	},
	@{
		Path = 'components/business/lottery/lottery-result-popup'
		Name = 'lottery-result-popup'
		Description = '用于抽盒完成后展示开奖结果、奖品内容和后续操作按钮的结果弹层组件。'
		Scenes = @('抽盒结果弹窗', '中奖展示层', '结果反馈弹层')
	},
	@{
		Path = 'components/business/lottery/lottery-rule-tabs'
		Name = 'lottery-rule-tabs'
		Description = '用于切换抽盒规则、奖品列表、玩法说明等内容分组的业务 tabs 组件。'
		Scenes = @('规则切换', '奖池信息切换', '抽盒说明分组')
	},
	@{
		Path = 'components/business/market/market-filter-bar'
		Name = 'market-filter-bar'
		Description = '用于集市页顶部筛选、排序、分类或搜索入口区域的业务筛选栏组件。'
		Scenes = @('集市筛选栏', '商品排序区', '市场页顶部操作区')
	},
	@{
		Path = 'components/business/market/market-goods-card'
		Name = 'market-goods-card'
		Description = '用于展示集市商品基础信息的业务卡片组件，通常包含图片、价格、标签和操作入口。'
		Scenes = @('集市商品卡片', '商品列表项', '售卖卡片区')
	},
	@{
		Path = 'components/business/market/market-goods-grid'
		Name = 'market-goods-grid'
		Description = '用于把集市商品按统一宫格或双列布局展示出来的业务列表组件。'
		Scenes = @('集市商品宫格', '市场双列列表', '商品流布局区')
	},
	@{
		Path = 'components/business/market/points-goods-card'
		Name = 'points-goods-card'
		Description = '用于积分商城商品展示的业务卡片组件，主要承载积分价格、兑换信息和商品状态。'
		Scenes = @('积分商品卡片', '兑换商品列表项', '积分商城商品区')
	},
	@{
		Path = 'components/business/market/points-mall-grid'
		Name = 'points-mall-grid'
		Description = '用于积分商城商品宫格展示的业务组件，负责统一列表布局和内容组织。'
		Scenes = @('积分商城宫格', '积分兑换列表', '积分商品流')
	},
	@{
		Path = 'components/business/market/sale-detail-card'
		Name = 'sale-detail-card'
		Description = '用于出售详情页展示商品主体信息、状态和操作说明的业务详情卡片组件。'
		Scenes = @('出售详情页', '售卖详情卡片', '商品详情信息区')
	},
	@{
		Path = 'components/business/market/sale-item'
		Name = 'sale-item'
		Description = '用于我的出售、订单出售记录等列表中的单条售卖项组件。'
		Scenes = @('我的出售列表项', '售卖记录项', '出售订单条目')
	},
	@{
		Path = 'components/business/market/sale-list'
		Name = 'sale-list'
		Description = '用于承载出售列表、售卖记录流或商品管理列表的业务列表组件。'
		Scenes = @('我的出售列表', '售卖记录流', '商品管理列表')
	},
	@{
		Path = 'components/business/ranking/daily-ranking-item'
		Name = 'daily-ranking-item'
		Description = '用于每日榜单中单个排行条目的业务组件，通常展示排名、用户、分值和状态信息。'
		Scenes = @('每日榜单单项', '排行条目', '榜单列表项')
	},
	@{
		Path = 'components/business/ranking/daily-ranking-list'
		Name = 'daily-ranking-list'
		Description = '用于承载每日榜单数据集合的业务列表组件，负责榜单项的统一排列和状态展示。'
		Scenes = @('每日榜单列表', '排行榜主体区', '榜单内容流')
	},
	@{
		Path = 'components/business/ranking/daily-ranking-tabs'
		Name = 'daily-ranking-tabs'
		Description = '用于切换每日榜、周榜、分组榜等榜单维度的业务 tabs 组件。'
		Scenes = @('榜单分类切换', '排行维度切换', '每日榜 tabs')
	},
	@{
		Path = 'components/business/ranking/daily-ranking-top'
		Name = 'daily-ranking-top'
		Description = '用于展示榜单头部信息、前三名高亮区或榜单说明的业务头部组件。'
		Scenes = @('榜单头部', '前三名展示', '榜单首屏信息区')
	},
	@{
		Path = 'components/business/record/draw-record-item'
		Name = 'draw-record-item'
		Description = '用于展示单条抽盒记录、开奖记录或订单记录的业务列表项组件。'
		Scenes = @('抽盒记录项', '开奖记录条目', '操作记录列表项')
	},
	@{
		Path = 'components/business/record/draw-record-list'
		Name = 'draw-record-list'
		Description = '用于承载抽盒记录集合、开奖记录列表或分页记录流的业务列表组件。'
		Scenes = @('抽盒记录列表', '开奖记录流', '记录页主体区')
	},
	@{
		Path = 'components/business/record/draw-record-tabs'
		Name = 'draw-record-tabs'
		Description = '用于切换开奖记录、中奖记录、订单记录等不同记录分类的业务 tabs 组件。'
		Scenes = @('记录分类切换', '开奖记录 tabs', '订单记录切换')
	},
	@{
		Path = 'components/business/shared/confirm-sheet'
		Name = 'confirm-sheet'
		Description = '用于承载确认操作、二次校验或重要动作提示的通用业务底部弹层组件。'
		Scenes = @('确认操作弹层', '二次确认面板', '重要操作提示')
	},
	@{
		Path = 'components/business/shared/notice-modal'
		Name = 'notice-modal'
		Description = '用于展示公告、活动通知、运营说明等内容的业务弹窗组件。'
		Scenes = @('公告弹窗', '活动通知层', '平台说明提示')
	},
	@{
		Path = 'components/business/shared/result-modal'
		Name = 'result-modal'
		Description = '用于展示动作完成后的结果反馈，如抽盒结果、提交成功或兑换结果等业务弹窗组件。'
		Scenes = @('结果反馈弹窗', '提交成功提示', '操作结果展示')
	},
	@{
		Path = 'components/business/shared/rule-modal'
		Name = 'rule-modal'
		Description = '用于展示规则说明、活动细则、玩法描述等长文本内容的业务弹窗组件。'
		Scenes = @('规则弹窗', '玩法说明层', '活动细则展示')
	},
	@{
		Path = 'components/business/user/address-form'
		Name = 'address-form'
		Description = '用于新增或编辑收货地址信息的业务表单组件，通常包含姓名、手机和地址字段。'
		Scenes = @('新增地址', '编辑地址', '地址信息表单')
	},
	@{
		Path = 'components/business/user/address-list'
		Name = 'address-list'
		Description = '用于展示用户地址数据集合的业务列表组件，适合收货地址选择和管理场景。'
		Scenes = @('地址管理页', '地址选择列表', '收货地址列表')
	},
	@{
		Path = 'components/business/user/customer-service-panel'
		Name = 'customer-service-panel'
		Description = '用于展示客服入口、联系方式、常见问题入口等内容的业务服务面板组件。'
		Scenes = @('客服中心', '帮助与反馈', '售后联系面板')
	},
	@{
		Path = 'components/business/user/recharge-panel'
		Name = 'recharge-panel'
		Description = '用于充值场景展示金额选项、说明信息和提交操作的业务面板组件。'
		Scenes = @('充值页', '金额选择区', '余额充值模块')
	},
	@{
		Path = 'components/business/user/settings-list'
		Name = 'settings-list'
		Description = '用于设置页展示配置项、开关项和跳转项的业务列表组件。'
		Scenes = @('设置页列表', '配置项列表', '账户设置区')
	},
	@{
		Path = 'components/business/user/user-assets-panel'
		Name = 'user-assets-panel'
		Description = '用于展示用户余额、积分、卡券或其他资产摘要信息的业务面板组件。'
		Scenes = @('个人中心资产区', '余额积分概览', '账户资产面板')
	},
	@{
		Path = 'components/business/user/user-menu-grid'
		Name = 'user-menu-grid'
		Description = '用于个人中心功能入口宫格展示的业务组件，适合承载订单、仓库、地址等入口。'
		Scenes = @('个人中心菜单宫格', '功能入口区', '我的页面导航区')
	},
	@{
		Path = 'components/business/user/user-profile-header'
		Name = 'user-profile-header'
		Description = '用于个人中心顶部展示头像、昵称、等级和基础身份信息的业务头部组件。'
		Scenes = @('个人中心头部', '用户信息首屏', '我的页顶部信息区')
	},
	@{
		Path = 'components/business/user/withdraw-form'
		Name = 'withdraw-form'
		Description = '用于提现场景下输入金额、账户信息和提交申请的业务表单组件。'
		Scenes = @('提现页面', '提现申请表单', '账户转出场景')
	},
	@{
		Path = 'components/business/warehouse/warehouse-action-bar'
		Name = 'warehouse-action-bar'
		Description = '用于仓库页底部固定操作区的业务组件，常用于批量发货、拆分、移动等动作。'
		Scenes = @('仓库底部操作栏', '批量操作区', '发货动作区')
	},
	@{
		Path = 'components/business/warehouse/warehouse-address-sheet'
		Name = 'warehouse-address-sheet'
		Description = '用于仓库发货流程中选择地址、切换地址或展示地址信息的业务弹层组件。'
		Scenes = @('发货地址选择', '仓库地址弹层', '地址确认面板')
	},
	@{
		Path = 'components/business/warehouse/warehouse-filter-tabs'
		Name = 'warehouse-filter-tabs'
		Description = '用于仓库页按状态、分类或条件筛选物品的业务 tabs 组件。'
		Scenes = @('仓库筛选 tabs', '物品状态切换', '仓库分类切换')
	},
	@{
		Path = 'components/business/warehouse/warehouse-goods-card'
		Name = 'warehouse-goods-card'
		Description = '用于展示仓库单个物品、卡片或库存单元的业务卡片组件。'
		Scenes = @('仓库物品卡片', '库存条目展示', '仓库商品项')
	},
	@{
		Path = 'components/business/warehouse/warehouse-goods-grid'
		Name = 'warehouse-goods-grid'
		Description = '用于仓库物品宫格或多列列表展示的业务组件，负责统一仓库内容布局。'
		Scenes = @('仓库宫格列表', '库存网格展示', '物品集合区')
	},
	@{
		Path = 'components/business/warehouse/warehouse-safe-box'
		Name = 'warehouse-safe-box'
		Description = '用于展示保险箱、暂存区或特殊库存区域信息的业务面板组件。'
		Scenes = @('保险箱区域', '特殊库存区', '仓库扩展模块')
	},
	@{
		Path = 'components/business/warehouse/warehouse-shipping-sheet'
		Name = 'warehouse-shipping-sheet'
		Description = '用于仓库发货流程中确认发货信息、物流方式和发货动作的业务弹层组件。'
		Scenes = @('发货确认弹层', '物流确认面板', '仓库发货流程')
	},
	@{
		Path = 'components/business/warehouse/warehouse-split-sheet'
		Name = 'warehouse-split-sheet'
		Description = '用于仓库拆分操作中展示拆分数量、拆分规则和确认动作的业务弹层组件。'
		Scenes = @('拆分弹层', '数量拆分确认', '仓库拆分流程')
	}
)

function New-ComponentDocContent {
	param (
		[Parameter(Mandatory = $true)]
		[hashtable]$Component
	)

	$codeMark = [char]96
	$codeFence = ([string]$codeMark) * 3
	$lines = @(
		"# $($Component.Name)",
		"",
		"## 基础信息",
		"",
		"| 项目 | 内容 |",
		"| --- | --- |",
		"| 组件名称 | ${codeMark}$($Component.Name)${codeMark} |",
		"| 组件路径 | ${codeMark}$($Component.Path)${codeMark} |",
		"| 组件类型 | ${codeMark}业务组件${codeMark} |",
		"| 当前状态 | ${codeMark}待实现${codeMark} |",
		"",
		"## 组件说明",
		"",
		$Component.Description,
		"",
		"## 适用场景",
		""
	)

	$lines += ($Component.Scenes | ForEach-Object { "- $_" })

	$lines += @(
		"",
		"## 基础用法",
		"",
		"${codeFence}vue",
		"<template>",
		"	<$($Component.Name) />",
		"</template>",
		$codeFence,
		"",
		"## Props",
		"",
		"| 参数 | 说明 | 类型 | 默认值 |",
		"| --- | --- | --- | --- |",
		"| - | 当前组件还未实现，待开发时补充 | - | - |",
		"",
		"## Events",
		"",
		"| 事件名 | 说明 | 回调参数 |",
		"| --- | --- | --- |",
		"| - | 当前组件还未实现，待开发时补充 | - |",
		"",
		"## Slots",
		"",
		"| 插槽名 | 说明 |",
		"| --- | --- |",
		"| ${codeMark}default${codeMark} | 默认插槽，后续按组件实际结构补充 |",
		"",
		"## 备注",
		"",
		"- 这是业务组件的文档占位版，已经按组件库文档格式建立。",
		"- 等组件开始开发时，建议同步补充真实的参数、事件、插槽和示例代码。",
		"- 如果组件后续拆成容器组件和展示组件，建议在这里补一段依赖关系说明，方便团队统一使用方式。"
	)

	return ($lines -join "`r`n")
}

foreach ($component in $components) {
	$directory = Join-Path $PWD $component.Path

	if (-not (Test-Path $directory)) {
		New-Item -ItemType Directory -Path $directory -Force | Out-Null
	}

	$fileName = '{0}.md' -f $component.Name
	$filePath = Join-Path $directory $fileName
	$content = New-ComponentDocContent -Component $component
	[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
}
