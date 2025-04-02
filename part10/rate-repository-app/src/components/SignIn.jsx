import React from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as Yup from 'yup';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    inputError: {
        borderColor: '#d73a4a',
    },
    errorText: {
        color: '#d73a4a',
        fontSize: theme.fontSizes.body,
        marginBottom: 10
    },
    signInButton: {
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12
    },
});

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters long'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
});

const SignIn = () => {
    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Username'
                style={[styles.input, formik.touched.username && formik.errors.username && styles.inputError]}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}
            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                style={[styles.input, formik.touched.username && formik.errors.username && styles.inputError]}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
            <Pressable onPress={formik.handleSubmit} style={styles.signInButton}>
                <Text fontSize="subHeading" fontWeight="bold" style={{color: 'white'}}>Sign in</Text>
            </Pressable>
        </View>
    )
}

export default SignIn;