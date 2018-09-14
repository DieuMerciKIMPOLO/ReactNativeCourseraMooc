// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     backgroundColor: '#0ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
////
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

////
//const store = ConfigureStore();
export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <PersistGate 
        loading={<Loading />}
        persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
    //   <Provider store={store}>
    //   <Main />
    // </Provider>
    );
  }
}
