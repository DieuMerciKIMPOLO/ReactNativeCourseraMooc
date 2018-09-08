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

const store = ConfigureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Main />
    </Provider>
    );
  }
}
