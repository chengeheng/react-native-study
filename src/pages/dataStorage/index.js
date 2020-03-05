import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {changeData} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';

const getItem = key => {
  return AsyncStorage.getItem(key)
    .then(e => e)
    .catch(err => console.error(err));
};

const titleId = 'titleId';
const HomeScreen = props => {
  const dispatch = useDispatch();
  const title = useSelector(state => state.data[titleId] || '');
  useEffect(() => {
    if (title) {
      props.navigation.setOptions({title: title});
    }
  }, [title]);
  return (
    <View style={styles.main}>
      <Text>DataStorage</Text>
      <View style={styles.button}>
        <Button
          onPress={e => {
            dispatch(changeData(titleId, '新标题'));
          }}
          title={'change title by redux'}></Button>
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => {
            getItem('title').then(e => {
              props.navigation.setOptions({title: e});
            });
          }}
          title={'change title by asyncstorage'}></Button>
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => {
            AsyncStorage.setItem('title', '这是我存在手机里的数据');
          }}
          title={'change asyncstorage'}></Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
});
