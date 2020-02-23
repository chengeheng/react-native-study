<!-- @format -->

# React-natigation 路由

## 安装

推荐安装<code>react-navigation 4.x</code>版本，<code>5.x</code>版本运行总是会出错

1.  安装 react-navigation

    ```
    yarn add react-navigation@4.1.1
    ```

2.  安装 react-navigation 所需依赖

    ```
    yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view react-navigation-stack
    ```

3.  根据 react-native 版本修改配置

    - 0.60 版本及以上

    修改<code>androi/app/build.gradle</code>：

    ```java
    implementation 'androidx.appcompat:appcompat:1.1.0-rc01'

    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
    ```

    - 0.59 版本及以下

    1.  需使用<code>react-native link</code>

    ```js
    react-native link react-native-reanimated
    react-native link react-native-gesture-handler
    react-native link react-native-screens
    react-native link react-native-safe-area-context
    ```

    2.  配置<code>jetifier</code>

    ```js
    npm install --save-dev jetifier
    ```

    3.  添加<code>postinstall</code>脚本到<code>package.json</code>中并运行

    ```js
    // package.json
    "scripts": {
    	"postinstall": "jetifier -r"
    }

    // 运行脚本
    npm run postinstall
    ```

4.  修改<code>MainActivity.java</code>以完成<code>react-native-gesture-handler</code>Android 的安装

    ```java
    package com.reactnavigation.example;

    import com.facebook.react.ReactActivity;
    + import com.facebook.react.ReactActivityDelegate;
    + import com.facebook.react.ReactRootView;
    + import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

    public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
    	return "Example";
    }

    +  @Override
    +  protected ReactActivityDelegate createReactActivityDelegate() {
    +    return new ReactActivityDelegate(this, getMainComponentName()) {
    +      @Override
    +      protected ReactRootView createRootView() {
    +        return new RNGestureHandlerEnabledRootView(MainActivity.this);
    +      }
    +    };
    +  }
    }
    ```

5.  在项目中导入<code>react-native-gesture-handler</code>

    ```js
    import 'react-native-gesture-handler';
    ```

## 使用

1. 首先创建一个堆栈导航器，主要包括两个部分<code>createStackNavigator</code>和<code>createAppContainer</code>。

<code>createStackNavigator</code>是一个返回 React 组件的函数。它接受两个参数，第一个是路由配置对象，第二个是可选的选项对象。每一个新屏幕都放在堆栈的顶部，删除一个屏幕是将它从堆栈的顶部移出。

<code>createAppContainer</code>以<code>createStackNavigator</code>的返回为参数，并可以直接从中导出以用作我们应用程序的根组件。

```js
// App.js
import { createStackNavigator } from "react-navigation-stack";
...


const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen, // 页面组件
            navigationOptions: {
                title: "Home"
            }
        },
        Details: DetailsScreen
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(AppNavigator);
```

2. 屏幕间的切换使用 react-navigation 提供的 api，主要有<code>navigation.navigate</code>、<code>navigation.push</code>、<code>navigation.goBack</code>

```js
class DetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />

        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
```

- navigation 对象会被添加到路由配置中的 React Navigation 组件的 props 里。
- <code>navigation.navigate</code> 在跳转时会在已有的路由堆栈中查找是否已经存在该值，若存在将直接跳转到之前存在的地址。并且只有当路由堆栈中不存在这个新路由时才会添加。
- <code>navigation.push</code>将一个新的路由 push 到堆栈顶端，可以使用<code>navigation.goBack</code>返回。
- 标题栏将自动显示一个后退按钮会调用<code>navigation.goBack</code>，也可以在需要的时候手动调用<code>navigation.goBack</code>。

3. 参数传递

   1. 参数传递
      <code>navigation.navigate</code>函数接受两个参数，第一个为要切换的路由，第二个即为所需传递的参数对象。

   ```js
   props.navigation.navigate('Home', {
     /* params */
   });
   ```

   2. 参数获取
      切换后的页面想要获取传递的参数，可以调用<code>navigation.getParam</code>方法来获取，getParam 有两个参数，第一个为所需获取字段的 paramName，第二个为该字段不存在时的默认值 defaultValue。

   ```js
   class HomeScreen extends React.Component {
     render() {
       return (
         <View
           style={{
             flex: 1,
             alignItems: 'center',
             justifyContent: 'center',
           }}>
           <Text>Home Screen</Text>
           <Button
             title="Go to Details"
             onPress={() => {
               this.props.navigation.navigate('Details', {
                 itemId: 86,
                 otherParam: 'anything you want here',
               });
             }}
             style={{
               marginTop: 10,
             }}
           />
         </View>
       );
     }
   }

   class DetailsScreen extends React.Component {
     render() {
       const {navigation} = this.props;
       return (
         <View
           style={{
             flex: 1,
             alignItems: 'center',
             justifyContent: 'center',
           }}>
           <Text>Details Screen</Text>
           <Text>
             itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
           </Text>
           <Text>
             otherParam:
             {JSON.stringify(
               navigation.getParam('otherParam', 'default value'),
             )}
           </Text>
           <Button
             title="Go to Details... again"
             onPress={() =>
               navigation.push('Details', {
                 itemId: Math.floor(Math.random() * 100),
               })
             }
           />
         </View>
       );
     }
   }
   ```

## 生命周期

<code>React-native</code>组件的生命周期同<code>React</code>一样，同样具有<code>componentDidMount</code>、<code>componentWillUnMount</code>。但是，当使用<code>react-navigation</code>在进行页面切换时，由于堆栈的设计，组件的生命周期触发可能会和设计的不一样。如：

- 从 A 页面使用<code>navigation.navigate</code>跳转到 B 页面，触发了 B 页面的<code>componentDidMount</code>；但是由于 A 页面仍在堆栈中，因此 A 页面的<code>componentWillUnMount</code>不会触发；但是，如果由 B 页面使用<code>navigation.push</code>跳转到 A 页面，此时屏幕中的 A 页面是堆栈中一个新的 A 页面，这时候就会触发 A 页面的<code>componentDidMount</code>；

- 从 A 页面使用<code>navigation.navigate</code>跳转到 B 页面，再由 B 页面使用<code>react-goBack</code>回到 A 页面，A 页面的<code>componentDidMount</code>也不会触发；

对于以上情况，<code>React-navigation</code>提供了四种事件来订阅页面的加载和切换，<code>willFocus</code>、<code>didFocus</code>、<code>willBlur</code>和<code>didBlur</code>。

| 事件                   | 说明                     |
| ---------------------- | ------------------------ |
| <code>willFocus</code> | 将要显示页面时调用       |
| <code>didFocus</code>  | 页面已经加载显示之后调用 |
| <code>willBlur</code>  | 将要移除页面时调用       |
| <code>didBlur</code>   | 页面已经移除之后调用     |

### 给页面添加生命周期函数

1. 在组件的 didMount 函数里写

```js
class Demo extends React.Component {
  componentDidMout() {
    this.viewWillAppear = this.props.navigation.addListener('willFocus', e =>
      console.log('页面将要显示'),
    );
    this.viewDidAppear = this.props.navigation.addListener('didFocus', e =>
      console.log('页面已经显示'),
    );
    this.viewWillDetach = this.props.navigation.addListener('willBlur', e =>
      console.log('页面将要移除'),
    );
    this.viewDidDetach = this.props.navigation.addListener('didBlur', e =>
      console.log('页面已经移除'),
    );
  }

  componentWillUnMout() {
    this.viewWillAppear.remove();
    this.viewDidAppear.remove();
    this.viewWillDetach.remove();
    this.viewDidDetach.remove();
  }
  render() {
    return (
      <View>
        <Text>demo</Text>
      </View>
    );
  }
}

// 或者使用hook
const Demo = props => {
  useEffect(() => {
    let viewWillAppear = this.props.navigation.addListener('willFocus', e =>
      console.log('页面将要显示'),
    );
    return () => {
      viewWillAppear.remove();
    };
  }, []);
  return (
    <View>
      <Text>demo</Text>
    </View>
  );
};
```

2. 使用 props 传入到组件中

上述例子也可以这样写：

```js
const Demo = _ => {
  return (
    <View>
      <Text>demo</Text>
    </View>
  );
};
// 使用组件时添加生命周期
const Outer = _ => {
  return (
    <View>
      <Demo
        onWillFocus={e => console.log('will focus', e)}
        onDidFocus={e => console.log('did focus', e)}
        onWillBlur={e => console.log('will blur', e)}
        onDidBlur={e => console.log('did blur', e)}></Demo>
    </View>
  );
};
```
