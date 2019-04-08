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

		let dep = new Dep(); // 每个变化的数据，都会对应一个数组，这个数组是存放所有更新的操作
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get() { // 当取值时调用此方法
				Dep.target && dep.addSub(Dep.target);
				return value;
			},
			set(newValue) { // 当给data属性设置新值时，调用此方法
				if (newValue !== value) {
					that.observer(newValue); // 如果是对象继续劫持
					value = newValue;
					dep.notify(); // 通知所有人 数据更新了。
				}
			}
		})
	}
}

class Dep{
	constructor() {
		// 订阅数组
		this.subs= []
	}
	addSub(watcher) {
		this.subs.push(watcher);
	}
	notify() {
		this.subs.forEach(watcher => {
			watcher.update();
		})
	}
}