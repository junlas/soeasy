module skins.components{
	export class ButtonSkin extends egret.gui.Skin{
		private static _skinParts:Array<string> = ["labelDisplay"];
		public __5:egret.gui.UIAsset;
		private __s:Function = egret.gui.setProperties;
		public __4:egret.gui.UIAsset;
		public labelDisplay:egret.gui.Label;

		public constructor(){
			super();
			
			this.elementsContent = [this.labelDisplay_i()];
			this.__4_i();
			this.__5_i();
			
			this.states = [
				new egret.gui.State ("up",
					[
						new egret.gui.AddItems("__5","","before","labelDisplay")
					])
				,
				new egret.gui.State ("down",
					[
						new egret.gui.AddItems("__4","","before","labelDisplay")
					])
				,
				new egret.gui.State ("disabled",
					[
					])
			];
		}

		public get skinParts():Array<string>{
			return ButtonSkin._skinParts;
		}
		private __5_i():egret.gui.UIAsset{
			var t:egret.gui.UIAsset = new egret.gui.UIAsset();
			this.__5 = t;
			this.__s(t,["bottom","left","right","scale9Grid","source","top"],[0,0,0,egret.gui.getScale9Grid("39,37,19,13"),"custom_normal",0])
			return t;
		}
		private labelDisplay_i():egret.gui.Label{
			var t:egret.gui.Label = new egret.gui.Label();
			this.labelDisplay = t;
			this.__s(t,["bottom","left","right","text","top"],[30,30,30,"button",28])
			return t;
		}
		private __4_i():egret.gui.UIAsset{
			var t:egret.gui.UIAsset = new egret.gui.UIAsset();
			this.__4 = t;
			this.__s(t,["bottom","left","right","scale9Grid","source","top"],[0,0,0,egret.gui.getScale9Grid("36,34,25,24"),"custom_down",0])
			return t;
		}
	}
}