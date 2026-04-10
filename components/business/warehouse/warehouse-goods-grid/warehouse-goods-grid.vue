<template>
	<view class="warehouse-goods-grid">
		<warehouse-goods-card
			v-for="item in list"
			:key="item.id"
			:item="item"
			@increase="emit('increase', $event)"
			@decrease="emit('decrease', $event)"
			@count-change="emit('count-change', $event)"
		/>
	</view>
</template>

<script setup>
defineOptions({
	name: 'WarehouseGoodsGrid'
})

defineProps({
	list: {
		type: Array,
		default: () => []
	}
})

const emit = defineEmits(['increase', 'decrease', 'count-change'])
</script>

<style lang="scss" scoped>
.warehouse-goods-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	row-gap: 24rpx;
	column-gap: 12rpx;
}
</style>
