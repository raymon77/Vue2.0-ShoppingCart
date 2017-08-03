new Vue({
	el:'.container',
	data:{
		addressList:[],
		showNum:3,
		curProductIndex:'0',
		curItem:'',
		isShow:false,
		selectMethod: 1,
		isModAddress:false,
		modName:'',
		modStreetAddress:'',
		modTel:'',
		modAddId:''
	},
	computed:{
		filterAddList:function(){
			return this.addressList.slice(0,this.showNum);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.gainList();
		})
	},
	methods:{
		//提取数据
		gainList:function(){
			this.$http.get('data/address.json',{'id':456}).then(res=>{
				this.addressList = res.data.result;
			})
		},
		//设置默认地址
		setDefault:function(addressId){
			this.addressList.forEach((item,index)=>{
				if(item.addressId == addressId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
			})
		},
		//点击删除
		delBtn:function(item){
			this.isShow = true;
			this.curItem = item;
		},
		//确认删除
		sureDel:function(){
			this.isShow = false;
			var index = this.addressList.indexOf(this.curItem);
			this.addressList.splice(index,1);
		},
		//修改地址
		modAddress:function(item){
			this.isModAddress = true;
			this.modAddId = item.addressId;
			this.modName = item.userName;
			this.modStreetAddress = item.streetName;
			this.modTel = item.tel;
		},
		//确认修改地址
		sureModAdd:function(addressId){
			this.isModAddress = false;
			this.addressList.forEach((item,index)=>{
				if(item.addressId == addressId){
					item.userName = this.modName;
					item.streetName = this.modStreetAddress;
					item.tel = this.modTel;
				}
			});
		}
	}
})
