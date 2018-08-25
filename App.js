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

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}
