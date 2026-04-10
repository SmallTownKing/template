<template>
    <uni-popup
        ref="popupRef"
        type="bottom"
        background-color="transparent"
        :is-mask-click="maskClosable"
        @change="handlePopupChange"
        @maskClick="handleMaskClick"
    >
        <view class="base-login">
            <view class="base-login__toolbar">
                <view class="base-login__close" @tap="close">
                    <view class="base-login__close-line base-login__close-line--first" />
                    <view class="base-login__close-line base-login__close-line--second" />
                </view>
            </view>
            <view class="base-login__body">
                <slot name="header">
                    <view class="base-login__header">
                        <image class="base-login__brand" :src="brandLogo" mode="aspectFit" />
                        <view class="base-login__tabs">
                            <text 
                                class="base-login__tab" 
                                :class="{ 'base-login__tab--active': isLoginMode }"
                                @tap="switchMode(true)"
                            >登录</text>
                            <text class="base-login__tab-divider">/</text>
                            <text 
                                class="base-login__tab" 
                                :class="{ 'base-login__tab--active': !isLoginMode }"
                                @tap="switchMode(false)"
                            >注册</text>
                        </view>
                    </view>
                </slot>

                <view class="base-login__input-box">
                    <slot name="phone-prefix">
                        <text class="base-login__prefix-code">{{ areaCode }}</text>
                    </slot>
                    <input
                        class="base-login__input"
                        type="number"
                        v-model="localPhone"
                        maxlength="11"
                        :placeholder="t('login_007') || '请输入手机号'"
                        placeholder-class="base-login__placeholder"
                    />
                </view>

                <view class="base-login__input-box" v-if="!isLoginMode">
                    <input
                        class="base-login__input"
                        type="number"
                        v-model="smsCode"
                        maxlength="6"
                        placeholder="请输入短信验证码"
                        placeholder-class="base-login__placeholder"
                    />
                    <text 
                        class="base-login__send-code" 
                        :class="{ 'base-login__send-code--disabled': countdown > 0 }"
                        @tap="handleSendCode"
                    >
                        {{ countdown > 0 ? `${countdown}s 后重新获取` : '获取验证码' }}
                    </text>
                </view>

                <view class="base-login__input-box">
                    <input
                        class="base-login__input"
                        type="password"
                        v-model="password"
                        placeholder="请输入密码"
                        placeholder-class="base-login__placeholder"
                    />
                </view>

                <view class="base-login__input-box" v-if="!isLoginMode">
                    <input
                        class="base-login__input"
                        type="password"
                        v-model="confirmPassword"
                        placeholder="请再次确认密码"
                        placeholder-class="base-login__placeholder"
                    />
                </view>

                <view
                    class="base-login__submit"
                    :class="{ 'base-login__submit--active': isSubmitActive }"
                    @tap="handleSubmit"
                >
                    <text class="base-login__submit-text">{{ isLoginMode ? '登录' : '注册并登录' }}</text>
                </view>

            </view>
            <slot name="footer">
                <view class="base-login__footer">
                    <text v-if="showAgreement" class="base-login__agreement">
                        {{ t('login_003') }}
                        <text class="base-login__agreement-link" @tap.stop="emit('agreement')">{{ t('login_004') }}</text>
                        {{ t('login_005') }}
                        <text class="base-login__agreement-link" @tap.stop="emit('privacy')">{{ t('login_006') }}</text>
                    </text>
                </view>
            </slot>
        </view>
    </uni-popup>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAppI18n } from '@/i18n'

const { t } = useAppI18n()
defineOptions({
    name: 'BaseLogin'
})

const props = defineProps({
    modelValue: { type: Boolean, default: false },
    phone: { type: String, default: '' },
    areaCode: { type: String, default: '+86' },
    brandLogo: { type: String, default: 'https://showgo.gg/assets/logo1-CTSqOJ-R.webp' },
    maskClosable: { type: Boolean, default: true },
    showAgreement: { type: Boolean, default: true }
})

const emit = defineEmits([
    'update:modelValue',
    'update:phone',
    'close',
    'submit',
    'sendCode',
    'agreement',
    'privacy'
])

const popupRef = ref(null)
const isOpen = ref(false)

// === 表单状态管理 ===
const isLoginMode = ref(true) 
const localPhone = ref(props.phone) // 【修复】：引入本地变量管理手机号
const password = ref('')
const confirmPassword = ref('')
const smsCode = ref('')
const countdown = ref(0)
let timer = null

// 同步 Props 中的 phone 初始值
watch(() => props.phone, (newVal) => {
    if (newVal !== localPhone.value) {
        localPhone.value = newVal
    }
})

// 将用户输入的手机号实时同步给父组件
watch(localPhone, (newVal) => {
    emit('update:phone', newVal)
})

const switchMode = (mode) => {
    if (isLoginMode.value === mode) return
    isLoginMode.value = mode
    password.value = ''
    confirmPassword.value = ''
    smsCode.value = ''
}

const handleSendCode = () => {
    if (countdown.value > 0) return
    if (!localPhone.value || localPhone.value.length < 11) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
    }
    
    emit('sendCode', { phone: localPhone.value, areaCode: props.areaCode })
    
    countdown.value = 60
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
        }
    }, 1000)
}

const isSubmitActive = computed(() => {
    const hasPhone = localPhone.value && localPhone.value.length > 0
    const hasPassword = password.value && password.value.length > 0
    
    if (isLoginMode.value) {
        return hasPhone && hasPassword
    } else {
        const hasCode = smsCode.value && smsCode.value.length > 0
        const hasConfirm = confirmPassword.value && confirmPassword.value.length > 0
        return hasPhone && hasPassword && hasCode && hasConfirm
    }
})

const handleSubmit = () => {
    if (!isSubmitActive.value) return
    
    if (!isLoginMode.value && password.value !== confirmPassword.value) {
        uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        return
    }
    
    emit('submit', {
        type: isLoginMode.value ? 'login' : 'register',
        phone: localPhone.value, 
        areaCode: props.areaCode,
        password: password.value,
        smsCode: isLoginMode.value ? undefined : smsCode.value
    })
}

const open = () => {
    if (isOpen.value) return
    isOpen.value = true
    emit('update:modelValue', true)
    uni.hideTabBar({ animation: true, fail: () => {} })
    popupRef.value?.open()
}

const close = () => {
    if (!isOpen.value) {
        emit('update:modelValue', false)
        return
    }
    isOpen.value = false
    emit('update:modelValue', false)
    uni.showTabBar({ animation: true, fail: () => {} })
    popupRef.value?.close()
}

watch(
    () => props.modelValue,
    (nextValue) => {
        if (nextValue) {
            open()
        } else if (isOpen.value) {
            close()
        }
    },
    { immediate: true }
)

const handlePopupChange = (event) => {
    const show = Boolean(event?.show)
    isOpen.value = show
    if (!show) {
        emit('update:modelValue', false)
        emit('close')
        uni.showTabBar({ animation: true, fail: () => {} })
    }
}

const handleMaskClick = () => {
    if (props.maskClosable) close()
}

defineExpose({ open, close })
</script>

<style lang="scss" scoped>
/* =========== 下面 CSS 样式保持不变 =========== */
.base-login {
    background: #f6f6fa;
    border-radius: 28rpx 28rpx 0 0;
    padding: 28rpx 28rpx calc(34rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
}

.base-login__toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.base-login__close {
    position: relative;
    width: 48rpx;
    height: 48rpx;
}

.base-login__close-line {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28rpx;
    height: 4rpx;
    background: #111827;
    border-radius: 999rpx;
    transform-origin: center;
}
.base-login__close-line--first { transform: translate(-50%, -50%) rotate(45deg); }
.base-login__close-line--second { transform: translate(-50%, -50%) rotate(-45deg); }

.base-login__body {
}

.base-login__header {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 36rpx;
}

.base-login__brand {
    width: 84rpx;
    height: 84rpx;
    border-radius: 18rpx;
    flex-shrink: 0;
}

.base-login__tabs {
    display: flex;
    align-items: center;
}

.base-login__tab {
    font-size: 32rpx;
    font-weight: 500;
    color: #9ca3af;
    transition: all 0.3s ease;
}

.base-login__tab--active {
    font-size: 40rpx;
    font-weight: 700;
    color: #111827;
}

.base-login__tab-divider {
    font-size: 30rpx;
    color: #d1d5db;
    margin: 0 16rpx;
}

.base-login__input-box {
    display: flex;
    align-items: center;
    height: 96rpx;
    padding: 0 24rpx;
    background: #ffffff;
    border-radius: 16rpx;
    margin-bottom: 24rpx;
}

.base-login__prefix-code {
    font-size: 32rpx;
    font-weight: 500;
    color: #111827;
    margin-right: 16rpx;
}

.base-login__input {
    flex: 1;
    height: 100%;
    font-size: 28rpx;
    color: #111827;
}

.base-login__placeholder {
    color: #c4c9d4;
}

.base-login__send-code {
    font-size: 26rpx;
    color: #ff6b00;
    font-weight: 500;
    padding-left: 20rpx;
    border-left: 2rpx solid #f0f2f5;
}

.base-login__send-code--disabled {
    color: #c4c9d4;
}

.base-login__submit {
    height: 96rpx;
    border-radius: 8rpx;
    margin-top: 26rpx;
    background: #aab0b1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

/* 这就是控制变黑的样式类 */
.base-login__submit--active {
    background: #111827;
}

.base-login__submit-text {
    font-size: 30rpx;
    font-weight: 700;
    color: #ffffff;
}

.base-login__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 94rpx;
}

.base-login__agreement {
    font-size: 22rpx;
    line-height: 1.7;
    color: #9ca3af;
    text-align: center;
}

.base-login__agreement-link {
    color: #f59e0b;
}
</style>