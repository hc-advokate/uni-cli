<template>
	<text
		style="text-decoration: underline"
		:href="href"
		@tap="openURL"
		:inWhiteList="inWhiteList"
		>{{ text }}</text
	>
</template>

<script>
	/**
	 * @description u-link是一个外部网页超链接组件，在小程序内打开内部web-view组件或复制url，在app内打开外部浏览器，在h5端打开新网页
	 * @property {String} href 点击后打开的外部网页url，小程序中必须以https://开头
	 * @property {String} text 显示的文字
	 * @property {Boolean} inWhiteList 是否在小程序白名单中，如果在的话，在小程序端会直接打开内置web-view，否则会只会复制url，提示在外部打开
	 * @example * <u-link href="https://ext.dcloud.net.cn" text="https://ext.dcloud.net.cn" :inWhiteList="true"></u-link>
	 */
	export default {
		name: "u-link",
		props: {
			href: {
				type: String,
				default: "",
			},
			text: {
				type: String,
				default: "",
			},
			inWhiteList: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			openURL() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.href); //这里默认使用外部浏览器打开而不是内部web-view组件打开
				// #endif
				// #ifdef H5
				window.open(this.href);
				// #endif
				// #ifdef MP
				if (this.inWhiteList) {
					//如果在小程序的网址白名单中，会走内置webview打开，否则会复制网址提示在外部浏览器打开
					uni.navigateTo({
						url: "/pages/component/web-view/web-view?url=" + this.href,
					});
				} else {
					uni.setClipboardData({
						data: this.href,
					});
					uni.showModal({
						content: "本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址",
						showCancel: false,
					});
				}
				// #endif
			},
		},
	};
</script>

<style></style>
