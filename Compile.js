class Compile {
	constructor(el, vm) {
		this.el = this.isElementNode(el) ? el : document.querySelector(el);
		this.vm = vm;

		if(this.el) {
			// 如果这个元素能够获取到，我们才开始编译
			// 1，先把这些真实的DOM移入到内存中 fragment
			let fragment = this.node2fragment(this.el);

			// 2，编译==> 提取想要的元素节点 v-model 和文本节点{{}}
			this.compile(fragment);

			// 3, 
		}
	}
	/* 专门写一些辅助的方法 */
	// 是否为元素节点
	isElementNode(node) {
		return node.nodeType === 1;
	}
	// 判断是否为v-model，v-text等指令
	isDirective(name) {
		return name.includes('v-');
	}
	/* 核心方法 */
	// 编译元素 v-model
	compileElement(node) {
		// 带v-model v-text等的元素
		// 获取当前节点元素的属性
		let attr = node.attributes;

		Array.from(attr).forEach(attr => {
			// 判断属性名是否包含v-
			let attrName = attr.name;

			if (this.isDirective(attrName)) {
				// 获取对应的值放到节点中
				let expr = attr.value;
				// node this.vm.$data expr
				// todo ....
			}
		})
	}
	// 编译文本 {{}}
	compileText(node) {
		// 带{{}}
		let text = node.textContent;
		// 匹配 {{}}
		let reg = /\{\{([^}]+)\}\}/g;

		if (reg.test(text)) {
			// node this.vm.$data expr
			// todo .....
		}
	}
	//
	compile(fragment) {
		// 需要递归
		let childNodes = fragment.childNodes;

		Array.from(childNodes).forEach(node => {
			if (this.isElementNode(node)) {
				// 元素节点，还需要继续深入的检查
				// 这里需要编译元素
				this.compileElement(node);
				this.compile(node);
			} else {
				// 文本节点 
				// 编译文本
				this.compileText(node)
			}
		})
	}


	node2fragment(el) { // 需要将el的内容全部放到内存中
		// 文档碎片 内存中的dom节点
		let fragment = document.createDocumentFragment();
		let firstChild;
		// 循环获取所有的元素
		while(firstChild = el.firstChild) {
			fragment.appendChild(firstChild)
		}
		return fragment; //内存中的节点
	}
}