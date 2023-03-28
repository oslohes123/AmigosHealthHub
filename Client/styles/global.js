import { StyleSheet } from 'react-native';
import { MD2Colors } from 'react-native-paper';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: MD2Colors.red600,
    fontWeight: 'bold',
  },
});

export default globalStyles;
