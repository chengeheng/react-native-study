<!-- @format -->

# React-natigation 路由

## 安装

1.  安装 react-navigation

    ```
    yarn add @react-navigation/native
    ```

2.  安装 react-navigation 所需依赖

    ```
    yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    ```

3.  为了保证 react-native-screens 在 Android 环境中运行，需要对<code>android/app/build.gradle</code>这个文件进行修改：

    ```java
    implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
    ```

4.  在项目中 index.js 或 App.js 中导入<code>react-native-gesture-handler</code>

    ```js
    import 'react-native-gesture-handler';
    ```

## 使用

1. 首先创建一个堆栈导航器

堆栈导航器主要包含两个部分，一个是导航的容器组件<code>NavigationContainer</code>，还有一个是配置组件<code>createStackNavigator</code>。

<code>NavigationContainer</code>用于管理导航树，并包含导航状态的组件。该组件必须包含所有的路由组件，因此通常我们在根目录下引入并渲染这个组件，比如写在<code>App.js</code>。

<code>createStackNavigator</code>是一个返回包含两个属性的对象的函数：<code>Screen</code>和<code>Navigator</code>，这两个都是用于配置路由的 React 组件。<code>Screen</code>对应这页面的每一个页面，<code>Navigator</code>以<code>Screen</code>为子组件来定义路由的配置。

```js
// App.js
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

2. 路由切换

屏幕间的切换使用 react-navigation 提供的 api，主要有<code>navigation.navigate</code>、<code>navigation.push</code>、<code>navigation.goBack</code>以及<code>navigation.popToTop</code>

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
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
```

- 通过<code>Stack.Screen</code>配置的页面会在 props 中添加 navigation 对象和 route 对象；如果不是配置在<code>Stack.screen</code>中的组件想要使用 navigation 和 route 对象，则可以使用 hooks：<code>useNavigation</code>和<code>useRoute</code>。
- <code>navigation.navigate</code> 在跳转时会在已有的路由堆栈中查找是否已经存在该值，若存在将直接跳转到之前存在的地址；如果不存在，则将这个新路由添加到堆栈中，并跳转到这个页面。
- <code>navigation.push</code>将一个新的路由 push 到堆栈顶端，可以使用<code>navigation.goBack</code>返回。
- 标题栏将自动显示一个后退按钮会调用<code>navigation.goBack</code>，也可以在需要的时候手动调用<code>navigation.goBack</code>。
- <code>navigation.popToTop</code>是返回到堆栈里的第一个页面，比如返回首页；但是初始页面直接适用<code>navigation.popToTop</code>会报错。

3. 参数传递

   1. 参数传递
      <code>navigation.navigate</code>函数接受两个参数，第一个为要切换的路由，第二个即为所需传递的参数对象（<code>navigation.push</code>传参方式相同）。

   ```js
   props.navigation.navigate('Home', {
     /* params */
   });
   ```

   2. 参数获取

      切换后的页面想要获取传递的参数，可以从<code>props.route.params</code>对象里面获取。<code>props.route.params</code>及跳转前页面的<code>navigation.navigate</code>（或<code>navigation.push</code>）的第二个参数。

   ```js
   class PageA extends React.Component {
     render() {
       return (
         <View style={styles.main}>
           <Text>DetailPage-A</Text>
           <View style={styles.button}>
             <Button
               title="navigate to pageB"
               onPress={e =>
                 this.props.navigation.navigate('pageB', {
                   source: 'navigate from PageA by navigate',
                 })
               }></Button>
           </View>
           <View style={styles.button}>
             <Button
               title="push to pageB"
               onPress={e =>
                 this.props.navigation.push('pageB', {
                   source: 'navigate from PageA by push',
                 })
               }></Button>
           </View>
         </View>
       );
     }
   }

   const PageB = props => {
     let {source} = props.route.params;
     return (
       <View style={styles.main}>
         <Text>DetailPage-B</Text>
         <View style={styles.button}>
           <Button
             onPress={e => {
               props.navigation.navigate('pageA');
             }}
             title={'navigate to pageA'}></Button>
         </View>
         <View style={styles.button}>
           <Button
             onPress={e => {
               props.navigation.push('pageA');
             }}
             title={'push to pageA'}></Button>
         </View>
         <View style={styles.button}>
           <Button
             onPress={e => {
               props.navigation.setParmas({
                 source: 'pageB by setParams',
               });
             }}
             title={'setParams'}></Button>
         </View>
         <Text style={{margin: 10}}>the text from others is: {source}</Text>
       </View>
     );
   };
   ```

   传递的参数可以在 B 页面通过<code>navigation.setParams({...})</code>更改。

## 生命周期

<code>React-native</code>组件的生命周期同<code>React</code>一样，同样具有<code>componentDidMount</code>、<code>componentWillUnMount</code>。但是，当使用<code>react-navigation</code>在进行页面切换时，由于堆栈的设计，组件的生命周期触发可能会和设计的不一样。如：

- 从 A 页面使用<code>navigation.navigate</code>跳转到 B 页面，触发了 B 页面的<code>componentDidMount</code>；但是由于 A 页面仍在堆栈中，因此 A 页面的<code>componentWillUnMount</code>不会触发；但是，如果由 B 页面使用<code>navigation.push</code>跳转到 A 页面，此时屏幕中的 A 页面是堆栈中一个新的 A 页面，这时候就会触发 A 页面的<code>componentDidMount</code>；

- 从 A 页面使用<code>navigation.navigate</code>跳转到 B 页面，再由 B 页面使用<code>react-goBack</code>回到 A 页面，A 页面的<code>componentDidMount</code>也不会触发；

对于以上情况，<code>React-navigation</code>提供了<code>focus</code>和<code>blur</code>两种事件来订阅页面的加载和切换。

### 给页面添加生命周期函数

1. 在组件的 componentDidMout 函数里写

```js
class PageA extends React.Component {
  componentDidMount() {
    console.log('a didMount');
    this.foucuSubscribe = this.props.navigation.addListener('focus', () => {
      console.log('a is focus');
    });
    this.blurSubscribe = this.props.navigation.addListener('blur', () => {
      console.log('a is blur');
    });
  }

  componentWillUnmount() {
    this.foucuSubscribe();
    this.blurSubscribe();
    console.log('a willUnmount');
  }

  render() {
    return (
      <View style={styles.main}>
        <Text>lifecycle-A</Text>
      </View>
    );
  }
}

// 或者使用hook
const PageA = props => {
  useEffect(() => {
    let foucuSubscribe = props.navigation.addListener('focus', () => {
      console.log('a is focus');
    });
    return () => {
      foucuSubscribe();
    };
  }, []);
  return (
    <View style={styles.main}>
      <Text>lifecycle-A</Text>
    </View>
  );
};
```

2. 使用 react-navigation 自带的 hook

上述例子也可以这样写：

```js
const PageA = props => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('useFocusEffect didMount');
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('useFocusEffect willunMount');
      };
    }, []),
  );
  useEffect(() => {
    console.log('effect didMount');
    return () => {
      console.log('effect willunMount');
    };
  }, []);
  return (
    <View style={styles.main}>
      <Text>lifecycle-A</Text>
    </View>
  );
};
```

## 配置标题栏

标题栏的设置可以在三个不同的地方实现，可以在<code>Stack.Navigator</code>设置，或者在<code>Stack.Screen</code>，或在内部调用<code>navigation.setOptions</code>方法实现自定义修改。

1. <code>Stack.Navigator</code>设置统一样式

```js
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
  {/* screens */}
</Stack.Navigator>
```

<code>Stack.Navigator</code>上设置的在当前<code>Navigator</code>里面的<code>Screens</code>都可以起作用，但是在嵌套路由上是不会起作用的。

2. <code>Stack.Screen</code>设置当前页面的标题样式

<code>Stack.Screen</code>的样式可以覆盖在<code>Stack.Navigator</code>上面设置的统一样式。

```js
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: 'My home' }}
/>
// 在标题栏中可以使用页面跳转的传参，即route对象，也包括navigation对象
<Stack.Screen
  name="Profile"
  component={HomeScreen}
  options={({ route }) => ({ title: route.params.name })}
/>
```

3. <code>navigation.setOptions</code>更改当前标题栏样式

```js
// 页面载入时更改标题为new title
useFocusEffect(
  React.useCallback(() => {
    props.navigation.setOptions({title: 'new title'});
    return () => {};
  }, []),
);
```

### 常用标题栏配置

| 属性        | 作用         | 参数类型           |
| ----------- | ------------ | ------------------ |
| title       | 标题文字     | string             |
| headerTitle | 标题         | string ｜ function |
| headerRight | 标题右侧配置 | function           |
| headerStyle | 标题栏样式   | object             |
