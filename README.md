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
  这是接口设置的回调函数将会在touch start的时候回调。如果你想在touch start 的时候处理一些任务，你可以使用该接口。</br>
#### setMoveStartHook 参数
  这个函数需要传一个function作为参数，这个function有一个参数，是当前显示的牌的节点。你可以在这个function中对它做你想做的处理。
#### setMoveStartHook 使用例子
  setMoveStartHook(function(currentShowNode){
    ..........
  })
