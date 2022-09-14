import { StatusBar, } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import ModalView from '../components/ModalView';
import PostCardItem from '../components/PostCardItem';

const headers = {
  'Content-Type': 'application/json',
};

export default function App() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getPosts = () => {
    fetch('http://145.239.80.63:8080/users')
      .then((res) => res.json())
      .then(resJson => {
        console.log(resJson)
        setData(resJson.data);
      }).catch(e => (console.log(e)))
  }

  const addPost = (firstName, lastName, email, phoneNumber) => {
    fetch('http://145.239.80.63:8080/user', {
      method: "POST",
      headers,
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('post:', resJson)
        updatePost()
      }).catch(e => { console.log(e) })
  }

  const editPost = (postId, firstName, lastName, email, phoneNumber) => {
    fetch('http://145.239.80.63:8080/user' + `/${postId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('updated:', resJson)
        updatePost()
      }).catch(e => { console.log(e) })
  }

  const deletePost = (postId) => {
    fetch('http://145.239.80.63:8080/user' + `/${postId}`, {
      method: "DELETE",
      headers,
    }).then((res) => res.json())
      .then(resJson => {
        console.log('delete:', resJson)
        getPosts()
      }).catch(e => { console.log(e) })
  }

  const updatePost = () => {
    getPosts()
    setVisible(false);
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhoneNumber('')
    setPostId(0)
  }

  const edit = (id, firstName, lastName, email, phoneNumber) => {
    setVisible(true)
    setPostId(id)
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setPhoneNumber(phoneNumber)
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.header}>
        <Title>Client List</Title>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Add Client</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({ item }) => (
          <PostCardItem
            firstName={item.firstName}
            lastName={item.lastName}
            email={item.email}
            phoneNumber={item.phoneNumber}
            onEdit={() => edit(item.id, item.firstName, item.lastName, item.email, item.phoneNumber)}
            onDelete={() => deletePost(item.id)}
          />
        )}
      />
      <ModalView
        visible={visible}
        title="Add Post"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (postId && firstName && lastName && email && phoneNumber) {
            editPost(postId, firstName, lastName, email, phoneNumber)
          } else {
            addPost(firstName, lastName, email, phoneNumber)
          }
        }}
        cancelable
      >
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          mode="outlined"
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
        />
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          mode="outlined"
        />
      </ModalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white'
  },
});
