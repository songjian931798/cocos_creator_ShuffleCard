
cc.Class({
    extends: cc.Component,

    properties: {
        // main:{
        //     default: null,        
        //     type: cc.Node,
        // },
        cardMain:{
            default: null,        
            type: cc.Node,
        },
        cardMask: {
            default: null,        
            type: cc.Node,   
        },
        cardFragment:{
            default: null,        
            type: cc.Node, 
        },
        cardBack:{
            default: null,        
            type: cc.Node, 
        },
        backMask:{
            default: null,        
            type: cc.Node,
        },


        rotate:{
            default: null,        
            type: cc.Node,
        },
        open:{
            default: null,        
            type: cc.Node,
        },

        look:{
            default: null,        
            type: cc.Node,
        },
        bg:{
            default: null,        
            type: cc.Node,
        },

        _touchStartX: 0, //手指刚touch屏幕时的X坐标
        _touchStartY: 0, //手指刚touch屏幕时的Y坐标
        _touchMoveX: 0, //保存手指在屏幕上移动时的X坐标
        _touchMoveY: 0, //保存手指在屏幕上移动时的Y坐标
        _currentMoveX: 0, //当前手指在屏幕上移动时的X坐标
        _currentMoveY: 0, //当前手指在屏幕上移动时的Y坐标
        _cardOldHeight: 0, //card的原始高度
        _cardOldWidth: 0, //card的原始宽度
        _thresholdUp: 0, //card上滑的高度阀值。
        _thresholdDown: 0, //card上滑的高度阀值。
        _thresholdLift: 0, //card左滑的宽度阀值。
        _thresholdRight: 0, //card右滑的宽度阀值。
        _sensitiveThr: 10, //灵敏度的阀值,默认为10
        _direction: 0, //card滑动的方向，0表示不滑动，1表示上滑动或右滑，-1表示下滑或左滑,2表示右滑，-2表示左滑。
        _fragmentChildren: [], //fragment节点的所有子节点
        _isRotate: false, //是否旋转
        _openCardOverHook: null,//当牌完全被显示的时候回调，这是一个钩子钩子。
        _moveStartHook: null, //当touchStart时候后回调，这是一个钩子钩子。
        _rotateCardHook: null, //当点击旋转按钮时候后回调，这是一个钩子钩子。
        _currentShowCard: null,//当前显示的牌
    },

    onLoad () {
        this._fragmentChildren = this.cardFragment.children;
        // this._currentShowCard = this._fragmentChildren[49].active = true;

        this._cardOldHeight = this.backMask.height;
        this._cardOldWidth = this.backMask.width;
        this._thresholdUp = this._cardOldHeight*0.7;
        this._thresholdDown = this._cardOldHeight*0.7;
        this._thresholdLift = this._cardOldWidth*0.73;
        this._thresholdRight = this._cardOldWidth*0.73;
        this.backMask.on(cc.Node.EventType.TOUCH_START,this.cardMoveStart,this);
        this.backMask.on(cc.Node.EventType.TOUCH_MOVE,this.cardMoving,this);
        this.backMask.on(cc.Node.EventType.TOUCH_CANCEL,this.cardMoveCancel,this);
        this.backMask.on(cc.Node.EventType.TOUCH_END,this.cardMoveEnd,this);
        this.cardFragment.zIndex = 1;
        this.backMask.zIndex =2;

        this.rotate.on(cc.Node.EventType.TOUCH_START,this.setRotate,this);
        this.open.on(cc.Node.EventType.TOUCH_START,this.openCrad,this);
        this.look.on(cc.Node.EventType.TOUCH_START,this.lookCard,this)
        this.look.on(cc.Node.EventType.TOUCH_END,this.notLookCard,this)
    },
    /**
     * touch开始时候回调
     */
    cardMoveStart:function(evnet){
        if(this._currentShowCard ==null){
             throw '请初始化要显示的牌。请先调用 initCard 方法！';
        }
        
        if(this._moveStartHook!=null && this._currentShowCard !=null){
            this._moveStartHook(this._currentShowCard);
        }

        if(!this._isRotate){
            //因为不旋转的时候上下左右都可以滑动
            this._touchStartY = evnet.getLocationY();
            this._touchMoveY = this._touchStartY;
            this._touchStartX = evnet.getLocationX();
            this._touchMoveX = this._touchStartX;
        }else{
            //旋转了
            this._touchStartX = evnet.getLocationX();
            this._touchMoveX = this._touchStartX;
        }
    },

    /**
     * 设置card的初始化位置
     */
    setShowCardLocation: function(isRotate, moveDirection){
        if(moveDirection == 0){
            //回复到原始状态
            this.cardMask.anchorY = 0.5;
            this.cardMask.anchorX = 0.5;
            this.cardMask.y = 0;
            this.cardMask.x = 0;
            this.backMask.anchorY = 0.5;
            this.backMask.anchorX = 0.5;
            this.cardBack.y = 0;
            this.cardBack.x = 0;
            this.cardFragment.y = 0;
            this.cardFragment.x = 0;
            this.cardFragment.zIndex = 1;
            this.backMask.zIndex =2;
            this.cardMask.width = this._cardOldWidth;
            this.cardMask.height = this._cardOldHeight;
            this.backMask.width = this._cardOldWidth;
            this.backMask.height = this._cardOldHeight;
            return;
        }
        if(!isRotate){
            //不旋转
            if(moveDirection ==1){
                //上滑
                this.cardMask.anchorY = 1;
                this.cardMask.y = 305;
                this.backMask.anchorY = 1;
                this.cardBack.y = -305;
                this.cardFragment.y = -915;
                this.cardFragment.zIndex = 2;
                this.backMask.zIndex =1;
                return;
            }
            if(moveDirection ==-1){
                //下滑
                this.backMask.y = 0;
                return;
            }
            if(moveDirection ==2){
                //右滑
                this.cardMask.anchorX = 1;
                this.cardMask.x = 220;
                this.backMask.anchorX = 1;
                this.cardBack.x = -220;
                this.cardFragment.x = -660;
                this.cardFragment.zIndex = 2;
                this.backMask.zIndex =1;
                return;
            }
            if(moveDirection ==-2){
                //左滑
                this.cardMask.anchorX = 0;
                this.cardMask.x = -220;
                this.backMask.anchorX = 0;
                this.cardBack.x = 220;
                this.cardFragment.x = 660;
                this.cardFragment.zIndex = 2;
                this.backMask.zIndex =1;
                return;
            }

        }else{
            //旋转的时候
            if(moveDirection == 3){
                //旋转后右滑
                this.backMask.y = 0;
                return;
            }

            if(moveDirection == -3){
                //旋转后左滑
                this.cardMask.anchorY = 1;
                this.cardMask.y = 305;
                this.backMask.anchorY = 1;
                this.cardBack.y = -305;
                this.cardFragment.y = -915;
                this.cardFragment.zIndex = 2;
                this.backMask.zIndex =1;
                return;
            }
        }
    },

    /**
     * touch进行中回调
     */
    cardMoving:function(event){
        //确定滑动的方向
        if(this._direction == 0){
            if(!this._isRotate){
                //不旋转的时候
                if(event.getLocationY()-this._touchStartY>this._sensitiveThr){
                    //上滑
                    this._direction = 1;
                }else if(event.getLocationY()-this._touchStartY<-this._sensitiveThr){
                    //下滑
                    this._direction = -1; 
                }else if(event.getLocationX()-this._touchStartX>this._sensitiveThr){
                    //右滑
                    this._direction = 2;
                }else if(event.getLocationX()-this._touchStartX<-this._sensitiveThr){
                    //左滑
                    this._direction = -2;
                }
            }else{
                //旋转了
                if(event.getLocationX()-this._touchStartX>this._sensitiveThr){
                    //右滑
                    this._direction = 3;
                }else if(event.getLocationX()-this._touchStartX<-this._sensitiveThr){
                    //左滑
                    this._direction = -3; 
                }
            }
            //初始化方向
            this.setShowCardLocation(this._isRotate,this._direction);
        }

        if(!this._isRotate){
            //不旋转的时候处理滑动牌
            if(this._direction == 1 && event.getLocationY()-this._touchStartY < this._thresholdUp && event.getLocationY()-this._touchStartY>0){
                this._currentMoveY = event.getLocationY();
                this.backMask.height -= this._currentMoveY-this._touchMoveY;
                this.cardMask.height -= this._currentMoveY-this._touchMoveY;
                this.cardFragment.y += (this._currentMoveY-this._touchMoveY)*2;
                this._touchMoveY = this._currentMoveY;
            }else if(this._direction == -1 && this._touchStartY-event.getLocationY() < this._thresholdDown && event.getLocationY()-this._touchStartY<0){
                this._currentMoveY = event.getLocationY();
                this.backMask.y +=this._currentMoveY-this._touchMoveY;
                this._touchMoveY = this._currentMoveY;
            }else if(this._direction == 2 && event.getLocationX()-this._touchStartX < this._thresholdRight && event.getLocationX()-this._touchStartX>0){
                this._currentMoveX = event.getLocationX();
                if(this._currentMoveX - this._touchStartX>this._cardOldWidth*0.5){
                    //改变锚点
                    this.cardMask.anchorX = 0.5;
                    this.cardMask.width =this._cardOldWidth;
                }
                this.backMask.width -= this._currentMoveX-this._touchMoveX;
                this.cardMask.width -= this._currentMoveX-this._touchMoveX;
                this.cardFragment.x += (this._currentMoveX-this._touchMoveX)*2;
                this._touchMoveX = this._currentMoveX;
            }else if (this._direction == -2 && event.getLocationX()-this._touchStartX > -this._thresholdLift && event.getLocationX()-this._touchStartX<0){
                this._currentMoveX = event.getLocationX();
                if(this._currentMoveX - this._touchStartX<-this._cardOldWidth*0.5){ 
                    //改变锚点
                    this.cardMask.anchorX = 0.5;
                    this.cardMask.width =this._cardOldWidth;
                }
                this.backMask.width += this._currentMoveX-this._touchMoveX;
                this.cardMask.width += this._currentMoveX-this._touchMoveX;
                this.cardFragment.x += (this._currentMoveX-this._touchMoveX)*2;
                this._touchMoveX = this._currentMoveX;
            }
        }else{
            //旋转以后的滑动处理
            if(this._direction == 3 && event.getLocationX()-this._touchStartX < this._thresholdUp && event.getLocationX()-this._touchStartX>0){
                this._currentMoveX = event.getLocationX();
                this.backMask.y -=this._currentMoveX-this._touchMoveX;
                this._touchMoveX = this._currentMoveX;
            }else if(this._direction == -3 && this._touchStartX-event.getLocationX() < this._thresholdDown && event.getLocationX()-this._touchStartX<0){
                this._currentMoveX = event.getLocationX();
                if(this._currentMoveX - this._touchStartX<-this._cardOldHeight*0.5){ 
                    //改变锚点
                    this.cardMask.anchorY = 0.5;
                    this.cardMask.height =this._cardOldHeight;
                }
                this.backMask.height += this._currentMoveX-this._touchMoveX;
                this.cardMask.height += this._currentMoveX-this._touchMoveX;
                this.cardFragment.y -= (this._currentMoveX-this._touchMoveX)*2;
                this._touchMoveX = this._currentMoveX;
            }
        }
    },

    /**
     * touch结束时回调(目标节点区域内离开)
     */
    cardMoveEnd:function(event){
        this.userMoveOver(event);
    },

    /**
     * touch结束时回调(目标节点区域外离开)
     */
    cardMoveCancel:function(event){
        this.userMoveOver(event);
        
    },
    /**
     * touch结束的处理
     */
    userMoveOver:function(event){
        //用户滑松开手指的处理。
        if(!this._isRotate){
            //没有旋转的处理
            if(this._direction == 1){
                //上滑结束的处理
                if(event.getLocationY()-this._touchStartY>this._thresholdUp && event.getLocationY()-this._touchStartY>0){
                    this.backMask.active = false;
                    this.setShowCardLocation(this._isRotate,0);
                    //这里需要添加结束回调
                    if(this._openCardOverHook!=null && this._currentShowCard!=null){
                        this._openCardOverHook(this._currentShowCard)
                    }
                    
                }else{
                    this.backMask.height = this._cardOldHeight;
                    this.cardMask.height = this._cardOldHeight;
                    this.setShowCardLocation(this._isRotate,this._direction);
                }

            }else if(this._direction == -1){
                //下滑结束的处理
                if(event.getLocationY()-this._touchStartY<-this._thresholdDown && event.getLocationY()-this._touchStartY<0){
                    this.backMask.active = false;
                    this.setShowCardLocation(this._isRotate,0);
                    //这里需要添加结束回调
                    if(this._openCardOverHook!=null && this._currentShowCard!=null){
                        this._openCardOverHook(this._currentShowCard)
                    }
                }else{
                    this.setShowCardLocation(this._isRotate,this._direction);
                }
            }else if(this._direction == 2){
                //右滑结束处理
                if(event.getLocationX()-this._touchStartX>this._thresholdRight && event.getLocationX()-this._touchStartX>0){
                    this.backMask.active = false;
                    this.setShowCardLocation(this._isRotate,0);
                    //这里需要添加结束回调
                    if(this._openCardOverHook!=null && this._currentShowCard!=null){
                        this._openCardOverHook(this._currentShowCard)
                    }
                }else{
                    this.backMask.width = this._cardOldWidth;
                    this.cardMask.width = this._cardOldWidth;
                    this.setShowCardLocation(this._isRotate,this._direction);
                }

            }else if(this._direction == -2){
                //左滑结束处理
                if(event.getLocationX()-this._touchStartX<-this._thresholdRight && event.getLocationX()-this._touchStartX<0){
                    this.backMask.active = false;
                    this.setShowCardLocation(this._isRotate,0);
                    //这里需要添加结束回调
                    if(this._openCardOverHook!=null && this._currentShowCard!=null){
                        this._openCardOverHook(this._currentShowCard)
                    }
                }else{
                    this.backMask.width = this._cardOldWidth;
                    this.cardMask.width = this._cardOldWidth;
                    this.setShowCardLocation(this._isRotate,this._direction);
                }
                
            }
        }else{
            //有旋转的处理
            if(this._direction ==-3){
                //左滑结束的处理
                if(event.getLocationX()-this._touchStartX<-this._thresholdUp && event.getLocationX()-this._touchStartX<0){
                    this.backMask.active = false;
                    this.setShowCardLocation(this._isRotate,0);
                    //这里需要添加结束回调
                    if(this._openCardOverHook!=null && this._currentShowCard!=null){
                        this._openCardOverHook(this._currentShowCard)
                    }
                    
                }else{
                    this.backMask.height = this._cardOldHeight;
                    this.cardMask.height = this._cardOldHeight;
                    this.setShowCardLocation(this._isRotate,this._direction);
                }

            }else if(this._direction == 3){
                //右滑结束的处理
                if(event.getLocationX()-this._touchStartX>this._thresholdDown && event.getLocationX()-this._touchStartX>0){
                    this.backMask.active = false;
                    this.setShowCardLocation(this._isRotate,0);
                    //这里需要添加结束回调
                    if(this._openCardOverHook!=null && this._currentShowCard!=null){
                        this._openCardOverHook(this._currentShowCard)
                    }
                }else{
                    this.setShowCardLocation(this._isRotate,this._direction);
                }
            }
        }

        this._direction = 0;//当用户离开的时候，把方向状态改为0
    },




    /**
     * 设置旋转牌
     */
    setRotate:function(){
        if(this._rotateCardHook !=null){
            //点击旋转按钮回调
            this._rotateCardHook(this._currentShowCard,this.cardMain,this._isRotate)
        }else{
            if(this._isRotate){
                this.cardMain.rotation = 0;
                this._isRotate = false;
                this.cardMain.scaleX = 1.8;
                this.cardMain.scaleY = 1.8;
            }else{
                this.cardMain.rotation = -90;
                this._isRotate = true;
                this.cardMain.scaleX = 2.4;
                this.cardMain.scaleY = 2.4;
            }
        }
    },

    /**
     * 直接开牌
     */
    openCrad:function(){
        this.backMask.active = false;
        if(this._openCardOverHook!=null && this._currentShowCard!=null){
            this._openCardOverHook(this._currentShowCard);
        }
    },

    /**
     * 看已经发好的牌
     */
    lookCard:function(){
        this.bg.active = false;
        this.cardMain.active = false;
    },
    /**
     * 回到搓牌界面
     */
    notLookCard:function(){
        this.bg.active = true;
        this.cardMain.active = true;
    },
    
    /**
     * 设置moveStartHook回调
     */
    setMoveStartHook:function(moveStartHook){
        this._moveStartHook = moveStartHook;
    },
    /**
     *设置开牌结束回调
     */
    setOpenCardOverHook: function(openCardEndHook){
        this._openCardOverHook = openCardEndHook;
    },
    /**
     * 设置点击旋转按钮的回调
     */
    setRotateCardHook:function(rotateCardHook){
        this._rotateCardHook = rotateCardHook;
    },

    /**
     * 设置灵敏度
     * 默认 10
     */
    setSensitiveThr:function(sensitive){
        this._sensitiveThr = sensitive;
    },

    /**
     * 设置右滑的最大距离
     * 默认 当前牌宽度的0.73倍
     */
    setThresholdRight:function(thresholdRight){
        this._thresholdRight = thresholdRight;
    },

    /**
     * 设置左滑的最大距离
     * 默认 当前牌宽度的0.73倍
     */
    setThresholdLift:function(thresholdLift){
        this._thresholdLift = thresholdLift;
    },
    
    /**
     * 设置下滑的最大距离
     * 默认 当前牌高度的0.7倍
     */
    setThresholdDown:function(thresholdDown){
        this._thresholdDown = thresholdDown;
    },

    /**
     * 设置上滑的最大距离
     * 默认 当前牌高度的0.7倍
     */
    setThresholdUp:function(thresholdUp){
        this._thresholdUp = thresholdUp;
    },

    /**
     * 这个方法很重要，初始化要显示的牌，信息，等等。
     */
    initCard:function(showCardLocation){
        if(!this.backMask.active){
            this.backMask.active = true;
        }
        this.cardMain.rotation = 0;
        this.setShowCardLocation(false,0);
        this._currentShowCard = this._fragmentChildren[showCardLocation];
        this._currentShowCard.active = true;
    },

    onDestroy(){
        //释放资源
        this.backMask.off(cc.Node.EventType.TOUCH_START,this.moveStart,this);
        this.backMask.off(cc.Node.EventType.TOUCH_MOVE,this.cardMoving,this);
        this.backMask.off(cc.Node.EventType.TOUCH_CANCEL,this.cardMoveCancel,this);
        this.backMask.off(cc.Node.EventType.TOUCH_END,this.cardMoveEnd,this);

        this.rotate.off(cc.Node.EventType.TOUCH_START,this.setRotate,this);
        this.open.off(cc.Node.EventType.TOUCH_START,this.openCrad,this);
        this.look.off(cc.Node.EventType.TOUCH_START,this.lookCard,this);
        this.look.off(cc.Node.EventType.TOUCH_END,this.notLookCard,this);

        this._fragmentChildren = [];
    }
});
