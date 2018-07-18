# cocos_creator_ShuffleCard
cocos creator中 利用遮罩实现搓牌效果。

废话少说，直接上效果图。

## 1.旋转后左搓
  ![image](https://github.com/songjian931798/cocos_creator_ShuffleCard/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/1.png)
  
## 2.不旋转上搓
  ![image](https://github.com/songjian931798/cocos_creator_ShuffleCard/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/2.png)
  
## 2.不旋转右搓
  ![image](https://github.com/songjian931798/cocos_creator_ShuffleCard/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/3.png)
  
## 2.不旋转左搓
  ![image](https://github.com/songjian931798/cocos_creator_ShuffleCard/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/4.png)
  
# cardMove 组件使用说明

## 设置回调接口的函数

### setMoveStartHook（）
  这个接口设置的回调函数将会在touch start的时候回调。如果你想在touch start 的时候处理一些任务，你可以使用该接口。</br>
  #### setMoveStartHook 参数
    这个函数需要传一个function作为参数，这个function有一个参数，是当前显示的牌的节点。你可以在这个function中对它做你想做的处理。
  #### setMoveStartHook 使用例子
    setMoveStartHook(function(currentShowNode){</br>
      ..........</br>
    })</br>
    
### setOpenCardOverHook（）
  这个接口设置的回调函数将会在touch end或者 touch cancel的时候回调。如果你想在这个时候处理一些任务，你可以使用该接口。</br>
  #### setOpenCardOverHook 参数
    这个函数需要传一个function作为参数，这个function有一个参数，是当前显示的牌的节点。你可以在这个function中对它做你想做的处理。
  #### setOpenCardOverHook 使用例子
    setOpenCardOverHook(function(currentShowNode){</br>
      ..........</br>
    })</br>
    
    
### setRotateCardHook（）
  这个接口设置的回调函数将会在你点击旋转按钮的时候回调。如果你想在这个时候处理一些任务，你可以使用该接口。</br>
  #### setRotateCardHook 参数
    这个函数需要传一个function作为参数，这个function有三个参数，第一个参数是当前显示的牌的节点，第二个参数是当前组件所绑定的节点，第三个参数是牌是否旋转。你可以在这个function中对它做你想做的处理。
  #### setRotateCardHook 使用例子
    setRotateCardHook(function(currentShowNode，parentNode，isRotate){</br>
      ..........</br>
    })</br>
    
    
## 其他可调用的函数

  ### setRotate（）
    这个函数无参数，如果你想旋转牌，可以调用这个函数。 需要注意的是，如果你使用了setRotateCardHook（）来设置回调的话，你在调用这个函数时会触发这个回调。
  
  ### openCrad（）
    这个函数无参数，如果你想直接开牌，可以调用这个函数。 需要注意的是，如果你使用了setOpenCardOverHook（）来设置回调的话，你在调用这个函数时会触发这个回调。
  
   ### lookCard（）
    这个函数无参数，你在按下眼睛按钮时会触发。 隐藏搓牌按钮
    
   ### notLookCard（）
    这个函数无参数，你在松开眼睛按钮时会触发。 显示搓牌按钮
    
   ### setSensitiveThr（sensitive）
    这个函数用于设置搓牌时的灵敏度，默认的灵敏度为10.
   
   ### setThresholdRight（thresholdRight）
    这个函数用于设置右搓的最大距离，超过则不能再搓，默认 当前牌宽度的0.73倍。
    
   ### setThresholdLift（thresholdLift）
    这个函数用于设置左搓的最大距离，超过则不能再搓，默认 当前牌宽度的0.73倍。
    
   ### setThresholdDown（thresholdDown）
    这个函数用于设置下搓的最大距离，超过则不能再搓，默认 当前牌高度的0.7倍。
    
   ### setThresholdUp（thresholdUp）
    这个函数用于设置上搓的最大距离，超过则不能再搓，默认 当前牌高度的0.7倍。
    
   ### initCard（showCardLocation）
    这个方法很重要，初始化要显示的牌，showCardLocation是牌的编号，例如：0：方块A、 1：梅花A、 2：红桃A、 3：黑桃A、 4：方块2 等等，以此类推。
    
 
## 使用问题
  这个文档很不专业哈，如果大家在使用时有啥问题或疑问，请Issues。我看到会即使回复大家。
