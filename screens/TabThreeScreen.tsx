import { StyleSheet, Button, TextInput } from 'react-native';
import { Text, View,} from '../components/Themed';
import { useState } from 'react';

export default function TabThreeScreen() {

  const [ID, setID] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='ID' 
        value={ID} 
        onChangeText={(text) => setID(text)}
      />
      <TextInput 
        placeholder='First Name' 
        value={firstname} 
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput 
        placeholder='Last Name' 
        value={lastname} 
        onChangeText={(text) => setLastname(text)}
      />
      <TextInput 
        placeholder='Email' 
        value={email} 
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
        placeholder='Phone Number' 
        value={phone} 
        onChangeText={(text) => setPhone(text)}
      />
      <Button title="send"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
