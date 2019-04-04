class mvvm{
	constructor(options) {
		// 先把参数挂载到实例上
		this.$el = options.el;
		this.$data = options.data;

		// 判断是否有el，有el就开始编译
		if(this.$el) {
			// 用数据和元素进行编译
			new Compile(this.$el, this);
		}
	}
}