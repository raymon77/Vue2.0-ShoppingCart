new Vue({
	el:'#app',
	data:{
		productList:[],
		totalMoney:0,
		allSelectBtn:false,
		isShow:false,
		curProduct:''
	},
	filters:{
		partFilter:function(value,type){
			return '￥'+ value.toFixed(2) + type;
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.createView();
		})
	},
	methods:{
		//绑定数据
		createView:function(){
			this.$http.get('data/cartData.json',{'id':123}).then(res=>{
				this.productList = res.data.result.list;
			})
		},
		//选择商品
		selectProduct:function(item){
			if(typeof item.checked == "undefined"){
				this.$set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			};
			
			//全部选中则全选点亮，相反
			var checkAllFlags = true;
			this.productList.forEach(function(value,index){
			    checkAllFlags = checkAllFlags && value.checked;
			});
			this.allSelectBtn = checkAllFlags;
			
			//计算总金额
			this.calTotalMoney();
		},
		//点击加减
		changeMoney:function(item,type){
			if(type<0){
				item.productQuantity--;
				if(item.productQuantity<1){
					item.productQuantity = 1;
				}
			}else{
				item.productQuantity++;
			}
			//计算总金额
			this.calTotalMoney();
		},
		//计算总金额
		calTotalMoney:function(){
			this.totalMoney = 0;
			this.productList.forEach((item,index)=>{
				if(item.checked){
					this.totalMoney += item.productPrice*item.productQuantity;
				}
			})
		},
		//点击全选
		allSelect:function(flag){
			this.allSelectBtn = flag;
			this.productList.forEach((item,index)=>{
				if(typeof item.checked == "undefined"){
					this.$set(item,'checked',this.allSelectBtn);
				}else{
					item.checked = this.allSelectBtn;
				}
			});
			//计算总金额
			this.calTotalMoney();
		},
		//点击删除
		delBtn:function(item){
			this.isShow = true;
			this.curProduct = item;
		},
		//确定删除
		sureDel:function(){
			this.isShow = false;
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			//计算总金额
			this.calTotalMoney();
		}
		
	}
});
