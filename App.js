/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import BleManager from 'react-native-ble-manager';
let devices='0'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    state = {
    devices:null,
    name:null,
    value:null,
    status:''
  };
  componentDidMount(){
    BleManager.start().then(()=>{
           //检查蓝牙打开状态，初始化蓝牙后检查当前蓝牙有没有打开
           BleManager.checkState();
           BleManager.enableBluetooth().then(() => {
                                        this.setState({
                                             status:'蓝牙已经打开！正在扫描中...目前有以下设备'
                                                                 })
                                           BleManager.scan([], 5, false).then((e,index,value) => {
                                                      this.setState({
                                                        devices:this.state.devices.push(1)

                                                      })
                                              });
                                         }).catch((error) => {
                                             this.setState({
                                                   status:'蓝牙已经被关闭！'
                                                    })
                                             });

       }).catch(error=>{
                        this.setState({
                             status:'蓝牙初始化失败！'
                           })

       });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.status}</Text>
         <Text style={styles.welcome}>devices:{this.state.devices}</Text>
         <Text style={styles.welcome}>name:{this.state.name}</Text>
         <Text style={styles.welcome}>value:{this.state.value}</Text>
          <FlatList
                   data={[
                     {key: 'Devin'},
                     {key: 'Jackson'},
                     {key: 'James'},
                     {key: 'Joel'},
                     {key: 'John'},
                     {key: 'Jillian'},
                     {key: 'Jimmy'},
                     {key: 'Julie'},
                   ]}
                   renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                 />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
