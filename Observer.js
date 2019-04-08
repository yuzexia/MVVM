class Observer{
	constructor(data) {
		this.observer(data);
	}

	observer(data) {
		// 要将这个data的原有属性改成get和set属性
		if(!data || typeof data !== 'object') {
			return;
		}

		// 要将数据一一劫持，先获取到data的key和value
		Object.keys(data).forEach(key => {
			this.defineReactive(data, key, data[key]);
			this.observer(data[key])
		})

	}

	// 定义响应式
	defineReactive(data, key, value) {
		let that = this;
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get() { // 当取值时调用此方法
				return value;
			},
			set(newValue) { // 当给data属性设置新值时，调用此方法
				if (newValue !== value) {
					that.observer(newValue); // 如果是对象继续劫持
					value = newValue;
				}
			}
		})
	}
}