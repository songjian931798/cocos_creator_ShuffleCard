
cc.Class({
    extends: cc.Component,

    properties: {
        showButtom: {
            default:null,
            type: cc.Node
        },
        moveCard:{
            default:null,
            type: cc.Node
        }
    },

    onLoad () {
        this.showButtom.on(cc.Node.EventType.TOUCH_START, this.clickButtom,this);
    },

    clickButtom:function(){
        this.moveCard.active = true;
        this.moveCard.getComponent("cardMove").initCard(5);
    }

});
