// 观察者的目的是给需要变化的那个元素增加一个观察者，当数据变化后执行对应方法
class Watcher {
	constructor(vm, expr, cb) {
		this.vm = vm
		this.expr = expr
		this.cb = cb
		// 先获取一下老值
		this.value = this.get()
	}
	getVal(vm, expr) {
		expr = expr.split('.');
		return expr.reduce((prev, next) => {
			return prev[next];
		}, vm.$data)
	}
	// 获取老值
	get(){
		Dep.target = this;
		let value = this.getVal(this.vm, this.expr);
		Dep.target = null;
		return value;
	}

	// 对外暴露的方法
	update() {
		let newValue = this.getVal(this.vm, this.expr);
		let oldValue = this.value;

		if(newValue !== oldValue) {
			this.cb(newValue); // 调用watcher的callback
		}
	}
}

// watcher 用新老值进行比对，如果发生变化，就调用更新方法