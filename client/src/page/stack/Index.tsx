import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
  Text,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleMangerModule = NativeModules.BleManger; // ble evnet emitter 생성
const bleManagerEmitter = new NativeEventEmitter(BleMangerModule);

const MAC_ADDRESS = 'AC:23:3F:E8:0C:54'; // 우리 비콘 맥 주소

const Index = () => {
  const [isScanning, setIsScanneing] = useState<boolean>(false); // 스캔중일 떄 한번 더 스캔하면 안되서 만든 변수
  const [currentPeriphreal, setPeripheral] = useState<any>(undefined); // 접속한 비콘에 대한 정보
  const handleDiscoverPeripheral = (peripheral: any) => {
    // 비콘 handleing event
    if (peripheral.id === MAC_ADDRESS) {
      setPeripheral(peripheral);
      console.log(peripheral.advertising.serviceData);
    }
  };
  const initEvent = () => {
    // 필요 event 등록

    // 비콘을 찾았을 때
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    // 비콘 scan 동작이 끝났을 때
    bleManagerEmitter.addListener('BleManagerStopScan', () => {
      console.log(new Date().toISOString());
      setIsScanneing(false); // scan 다햇으니 언제든 다시 스캔 할 수 있도록 false로 바꿔준다.
    });
  };

  const initModule = () => {
    // BleManager 시작 구문 무조건 이게 최상위에 위치해야함.
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('started');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const startSearch = () => {
    // scan (UUID,seconds, option)
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          // 스캔 시작했으니 false
          console.log('start searching');
          setIsScanneing(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    // component 가 mount 돨때 init 해줘야 할 것.
    initModule();
    initEvent();
    // startSearch();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button onPress={() => startSearch()} title="출석" />
      {currentPeriphreal ? (
        <Text style={{fontSize: 20, color: 'blue'}}>출석</Text>
      ) : (
        <Text style={{fontSize: 20, color: 'red'}}>미출석</Text>
      )}
    </View>
  );
};

export default Index;
