<template>
	<view class="vip-badge" :style="vipSizeStyle">
		<image class="vip-badge__bg" :src="vipImageSrc" mode="scaleToFill"></image>

		<view class="vip-badge__text" :style="textStyle">
			V{{ level }}
		</view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue';

	const props = defineProps({
		level: {
			type: [Number, String],
			default: 1
		},
		scale: {
			type: Number,
			default: 1
		}
	});

	const gradSilver = 'linear-gradient(to bottom, #748FB4 1%, #FFFFFF 33%, #BAC7DA 46%, #FFF 69%, #7896BE 100%)';
	const gradGold = 'linear-gradient(to bottom, #E5B269 1%, #FFFFFF 33%, #F7C839 46%, #FFF 69%, #D3692B 100%)';

	const sizeConfig = {
		1: {
			width: '94rpx',
			height: '62rpx',
			ml: '42rpx',
			mt: '26rpx',
			fs: '16rpx',
			h: '20rpx',
			textWidth: '50rpx',
			textBg: gradSilver
		},
		2: {
			width: '100rpx',
			height: '52rpx',
			ml: '42rpx',
			mt: '19rpx',
			fs: '16rpx',
			h: '22rpx',
			textWidth: '54rpx',
			textBg: gradSilver
		},
		3: {
			width: '106rpx',
			height: '56rpx',
			ml: '45rpx',
			mt: '23rpx',
			fs: '16rpx',
			h: '20rpx',
			textWidth: '54rpx',
			textBg: gradSilver
		},
		4: {
			width: '106rpx',
			height: '54rpx',
			ml: '45rpx',
			mt: '18rpx',
			fs: '16rpx',
			h: '24rpx',
			textWidth: '54rpx',
			textBg: gradSilver
		},
		5: {
			width: '112rpx',
			height: '66rpx',
			ml: '45rpx',
			mt: '28rpx',
			fs: '16rpx',
			h: '20rpx',
			textWidth: '60rpx',
			textBg: gradSilver
		},
		6: {
			width: '106rpx',
			height: '58rpx',
			ml: '45rpx',
			mt: '21rpx',
			fs: '16rpx',
			h: '22rpx',
			textWidth: '54rpx',
			textBg: gradGold
		},
		7: {
			width: '100rpx',
			height: '50rpx',
			ml: '45rpx',
			mt: '15rpx',
			fs: '16rpx',
			h: '22rpx',
			textWidth: '46rpx',
			textBg: gradGold
		},
		8: {
			width: '100rpx',
			height: '50rpx',
			ml: '45rpx',
			mt: '15rpx',
			fs: '16rpx',
			h: '22rpx',
			textWidth: '46rpx',
			textBg: gradGold
		},
		9: {
			width: '98rpx',
			height: '50rpx',
			ml: '42rpx',
			mt: '15rpx',
			fs: '16rpx',
			h: '20rpx',
			textWidth: '46rpx',
			textBg: gradGold
		},
		10: {
			width: '98rpx',
			height: '48rpx',
			ml: '42rpx',
			mt: '18rpx',
			fs: '16rpx',
			h: '20rpx',
			textWidth: '46rpx',
			textBg: gradGold
		}
	};

	const formatScale = (valStr) => {
		if (!valStr || valStr === 'auto') return valStr;
		const num = parseFloat(valStr);
		return (num * props.scale) + 'rpx';
	};

	const validLevel = computed(() => {
		let rawLevel = Number(props.level);
		if (isNaN(rawLevel) || rawLevel < 1) rawLevel = 1;
		let tier = Math.ceil(rawLevel / 10);
		if (tier > 10) tier = 10;
		return tier;
	});

	const vipImageSrc = computed(() => {
		return `/static/vip/vip${validLevel.value}.png`;
	});

	const vipSizeStyle = computed(() => {
		const config = sizeConfig[validLevel.value] || sizeConfig[1];
		return {
			width: formatScale(config.width),
			height: formatScale(config.height)
		};
	});

	const textStyle = computed(() => {
		const config = sizeConfig[validLevel.value] || sizeConfig[1];
		return {
			width: formatScale(config.textWidth),
			left: formatScale(config.ml),
			top: formatScale(config.mt),
			fontSize: formatScale(config.fs),
			height: formatScale(config.h),
			lineHeight: formatScale(config.h),
			backgroundImage: config.textBg || gradSilver
		};
	});
</script>

<style lang="scss" scoped>
	.vip-badge {
		position: relative;
		display: inline-block;

		&__bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 0;
		}

		&__text {
			position: absolute;
			z-index: 2;
			text-align: center;
			font-style: italic;
			font-weight: bold;
			background-clip: text;
			-webkit-background-clip: text;
			color: transparent;
			-webkit-text-fill-color: transparent;
		}
	}
</style>