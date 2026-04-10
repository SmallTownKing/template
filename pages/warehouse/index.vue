<template>
	<base-page-shell>
		<view class="warehouse-page">
			<view class="warehouse-page__header">
				<warehouse-top-bar :title="pageState.title" />
				<warehouse-notice-bar :text="pageState.notice" />
			</view>

			<warehouse-content-panel class="warehouse-page__panel" @load-more="handleLoadMore">
				<template #header>
					<warehouse-category-tabs v-model="currentTab" :tabs="displayTabs"
						:vault-label="pageState.vault.label" :vault-count="pageState.vault.count"
						@change="handleTabChange" />
				</template>

				<warehouse-empty-state v-if="!hasCurrentGoods" :image="pageState.emptyState.image"
					:text="pageState.emptyState.text" />
				<warehouse-goods-grid v-else :list="currentGoods" @increase="handleIncrease" @decrease="handleDecrease"
					@count-change="handleCountChange" />

				<base-load-status style="padding: 20rpx 0;" v-if="hasCurrentGoods" loadingText=""
					:status="loadStatus" />
			</warehouse-content-panel>

			<warehouse-action-bar :checked="isCurrentTabFullySelected" :has-goods="hasCurrentGoods"
				:total-price="totalPriceText" @toggle-all="handleToggleAll" @analyze="handleAnalyze" @pack="handlePack"
				@send="handleSend" @sell="handleSell" />
		</view>
	</base-page-shell>
</template>

<script setup>
import { computed, ref } from 'vue'
import { createWarehousePageMock } from './mock'

const pageState = createWarehousePageMock()
const currentTab = ref(0)
const goodsMap = ref(pageState.goodsMap)
const loadingMore = ref(false)
const loadPageMap = ref({
	game: 1,
	card: 1
})
const noMoreMap = ref({
	game: true,
	card: false
})

const currentTabItem = computed(() => {
	return pageState.tabs[currentTab.value] || pageState.tabs[0]
})

const displayTabs = computed(() => {
	return pageState.tabs.map((item) => {
		const goodsList = goodsMap.value[item.id] || []
		return {
			...item,
			count: goodsList.length
		}
	})
})

const currentGoods = computed(() => {
	return goodsMap.value[currentTabItem.value.id] || []
})

const hasCurrentGoods = computed(() => {
	return currentGoods.value.length > 0
})

const currentTabId = computed(() => {
	return currentTabItem.value.id
})

const loadStatus = computed(() => {
	if (!hasCurrentGoods.value) {
		return 'hidden'
	}

	if (loadingMore.value) {
		return 'loading'
	}

	if (noMoreMap.value[currentTabId.value]) {
		return 'finished'
	}

	return 'hidden'
})

const normalizeSelectedCount = (value, availableCount) => {
	const parsedValue = Number(value)
	if (!Number.isFinite(parsedValue)) {
		return 0
	}

	return Math.max(0, Math.min(Math.floor(parsedValue), Math.max(0, Number(availableCount || 0))))
}

const isCurrentTabFullySelected = computed(() => {
	if (!currentGoods.value.length) {
		return false
	}

	return currentGoods.value.every((item) => {
		return normalizeSelectedCount(item.selectedCount, item.availableCount) >= Number(item.availableCount || 0)
	})
})

const totalPrice = computed(() => {
	return currentGoods.value.reduce((groupTotal, item) => {
		return groupTotal + normalizeSelectedCount(item.selectedCount, item.availableCount) * Number(item.unitPrice || 0)
	}, 0)
})

const totalPriceText = computed(() => {
	return `RM${totalPrice.value.toFixed(2)}`
})

const updateCurrentGoods = (updater) => {
	const tabId = currentTabId.value
	const nextList = (goodsMap.value[tabId] || []).map((item) => {
		return updater(item)
	})

	goodsMap.value = {
		...goodsMap.value,
		[tabId]: nextList
	}
}

const handleTabChange = ({ index }) => {
	currentTab.value = index
}

const createMoreGoods = (tabId, pageIndex, size = 6) => {
	const sourceList = goodsMap.value[tabId] || []
	if (!sourceList.length) {
		return []
	}

	const seedItem = sourceList[0]
	const startIndex = sourceList.length + 1

	return Array.from({ length: size }).map((_, offset) => {
		const sequence = startIndex + offset

		return {
			...seedItem,
			id: `${tabId}-more-${pageIndex}-${sequence}`,
			title: `${seedItem.title} ${sequence}`,
			selectedCount: 0
		}
	})
}

const handleIncrease = (item) => {
	updateCurrentGoods((currentItem) => {
		if (currentItem.id !== item.id) {
			return currentItem
		}

		return {
			...currentItem,
			selectedCount: normalizeSelectedCount(Number(currentItem.selectedCount || 0) + 1, currentItem.availableCount)
		}
	})
}

const handleDecrease = (item) => {
	updateCurrentGoods((currentItem) => {
		if (currentItem.id !== item.id) {
			return currentItem
		}

		return {
			...currentItem,
			selectedCount: normalizeSelectedCount(Number(currentItem.selectedCount || 0) - 1, currentItem.availableCount)
		}
	})
}

const handleCountChange = ({ item, value }) => {
	updateCurrentGoods((currentItem) => {
		if (currentItem.id !== item.id) {
			return currentItem
		}

		return {
			...currentItem,
			selectedCount: normalizeSelectedCount(value, currentItem.availableCount)
		}
	})
}

const handleLoadMore = () => {
	const tabId = currentTabId.value
	const currentList = goodsMap.value[tabId] || []

	if (!currentList.length || loadingMore.value || noMoreMap.value[tabId]) {
		return
	}

	loadingMore.value = true

	setTimeout(() => {
		const nextPage = Number(loadPageMap.value[tabId] || 1) + 1
		const nextBatch = createMoreGoods(tabId, nextPage)

		goodsMap.value = {
			...goodsMap.value,
			[tabId]: [...currentList, ...nextBatch]
		}

		loadPageMap.value = {
			...loadPageMap.value,
			[tabId]: nextPage
		}

		noMoreMap.value = {
			...noMoreMap.value,
			[tabId]: nextPage >= 3
		}

		loadingMore.value = false
	}, 500)
}

const handleToggleAll = () => {
	if (!currentGoods.value.length) {
		return
	}

	const nextSelected = isCurrentTabFullySelected.value ? 0 : null

	updateCurrentGoods((item) => {
		return {
			...item,
			selectedCount: nextSelected === null ? item.availableCount : nextSelected
		}
	})
}

const handleAnalyze = () => {
	console.log('warehouse analyze')
}

const handlePack = () => {
	console.log('warehouse pack')
}

const handleSend = () => {
	console.log('warehouse send')
}

const handleSell = () => {
	console.log('warehouse sell')
}
</script>

<style lang="scss" scoped>
.warehouse-page {
	height: calc(100vh - var(--window-bottom) - var(--status-bar-height));
	background: #111;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.warehouse-page__header {
	background: #111111;
	height: 188rpx;
	flex-shrink: 0;
}

.warehouse-page__panel {
	flex: 1;
	min-height: 0;
}
</style>
