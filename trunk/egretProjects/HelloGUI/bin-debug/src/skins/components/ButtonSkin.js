var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var components;
    (function (components) {
        var ButtonSkin = (function (_super) {
            __extends(ButtonSkin, _super);
            function ButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.labelDisplay_i()];
                this.__4_i();
                this.__5_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("__5", "", "before", "labelDisplay")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("__4", "", "before", "labelDisplay")
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            Object.defineProperty(ButtonSkin.prototype, "skinParts", {
                get: function () {
                    return ButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            ButtonSkin.prototype.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__5 = t;
                this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [0, 0, 0, egret.gui.getScale9Grid("39,37,19,13"), "custom_normal", 0]);
                return t;
            };
            ButtonSkin.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["bottom", "left", "right", "text", "top"], [30, 30, 30, "button", 28]);
                return t;
            };
            ButtonSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [0, 0, 0, egret.gui.getScale9Grid("36,34,25,24"), "custom_down", 0]);
                return t;
            };
            ButtonSkin._skinParts = ["labelDisplay"];
            return ButtonSkin;
        })(egret.gui.Skin);
        components.ButtonSkin = ButtonSkin;
        ButtonSkin.prototype.__class__ = "components.ButtonSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
