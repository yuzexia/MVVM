class mvvm{
	constructor(options) {
		// 先把参数挂载到实例上
		this.$el = options.el;
		this.$data = options.data;

		// 判断是否有el，有el就开始编译
		if(this.$el) {
			// 数据劫持，就是把对象的所有属性都改成get和set方法
			new Observer(this.$data);  
			// 用数据和元素进行编译
			new Compile(this.$el, this);
		}
	}
}