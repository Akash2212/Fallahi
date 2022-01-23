import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import database from '@react-native-firebase/database'
import MainScreen from './MainScreen'
import auth from '@react-native-firebase/auth'

var user = auth().currentUser

export default class EnterEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    upload() {
        if (this.state.text != '') {
            if (user != null) {
                database().ref('Users/' + user.uid)
                    .set({
                        email: this.state.text,
                        title: 'null',
                        message: 'null',
                        sendMessage: 'null',
                        platform: Platform.OS
                    })
                    .then(() => {
                        this.props.navigation.replace('MainScreen')
                    })
            }
        }
        else {

        }
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="أدخل البريد الإلكتروني"
                    onChangeText={newText => this.setState({ text: newText })}
                />
                <TouchableOpacity onPress={() => this.upload()} style={styles.button} ><Text style={styles.buttonText}>التالي</Text></TouchableOpacity>
                <Text style={styles.note}>ملاحظة: يجب عليك إدخال نفس معرف البريد عند شراء المنتجات</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 50,
        borderWidth: 2,
        width: '70%'
    },
    button: {
        top: 30,
        width: '70%',
        height: 50,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 30,
        color: '#fff'
    },
    note: {
        color: 'red',
        top: 40
    }
})