var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var CheckBoxSkin = (function (_super) {
            __extends(CheckBoxSkin, _super);
            function CheckBoxSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__10_i()];
                this.states = [
                    new egret.gui.State("up", [
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_select_over_png")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_unselect_disabled_png")
                    ]),
                    new egret.gui.State("upAndSelected", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_select_normal_png")
                    ]),
                    new egret.gui.State("downAndSelected", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_unselect_over_png")
                    ]),
                    new egret.gui.State("disabledAndSelected", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_select_disabled_png")
                    ])
                ];
            }
            Object.defineProperty(CheckBoxSkin.prototype, "skinParts", {
                get: function () {
                    return CheckBoxSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            CheckBoxSkin.prototype.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "verticalAlign"], [5, "middle"]);
                return t;
            };
            CheckBoxSkin.prototype.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__8 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "width"], ["scale", 24, "checkbox_unselect_normal_png", 1, 24]);
                return t;
            };
            CheckBoxSkin.prototype.__9_i = function () {
                var t = new egret.gui.Group();
                t.elementsContent = [this.__8_i()];
                return t;
            };
            CheckBoxSkin.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["fontFamily", "maxDisplayedLines", "size", "textAlign", "textColor", "verticalAlign"], ["Tahoma", 1, 20, "center", 0x707070, "middle"]);
                return t;
            };
            CheckBoxSkin.prototype.__10_i = function () {
                var t = new egret.gui.Group();
                t.layout = this.__7_i();
                t.elementsContent = [this.__9_i(), this.labelDisplay_i()];
                return t;
            };
            CheckBoxSkin._skinParts = ["labelDisplay"];
            return CheckBoxSkin;
        })(egret.gui.Skin);
        simple.CheckBoxSkin = CheckBoxSkin;
        CheckBoxSkin.prototype.__class__ = "simple.CheckBoxSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
