/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

import * as yup from 'yup';

const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .required('This is a required field')
    .min(4, 'Should be min of 4 character')
    .max(15, 'Should be max of 16 character'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitalChars = '0123456789';
    const specialChars = '`!@#$%^&*:?-=_+';
    if (upperCase) {
      characterList += uppercaseChars;
    }
    if (lowerCase) {
      characterList += lowercaseChars;
    }
    if (numbers) {
      characterList += digitalChars;
    }
    if (symbols) {
      characterList += specialChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (character: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * character.length);
      result = result + character.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setIsPassGenerated(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.textHeading}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log({values});
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleSubmit,
              handleChange,
              handleReset,
            }) => (
              <React.Fragment>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.inputLabel}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29ABB7"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Include Uppercases</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#21828a"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#b78f29"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#b75129"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity style={styles.secondaryBtn}>
                    <Text
                      style={styles.secondaryBtnTxt}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    disabled={!isValid}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.primaryBtnTxt}> Generate Password</Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.passwordContainer, styles.elevatedCard]}>
            <Text style={styles.password} selectable>
              {password}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  textHeading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 10,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputColumn: {
    display: 'flex',
    rowGap: 2,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 4,
    minWidth: 100,
    padding: 8,
  },
  formActions: {
    display: 'flex',
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#199eab',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryBtnTxt: {
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryBtn: {
    backgroundColor: '#bb3500',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  secondaryBtnTxt: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#cb0000',
  },
  passwordContainer: {
    backgroundColor: '#d5d5d5',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  password: {
    textAlign: 'center',
    color: '#222',
    fontSize: 20,
    fontWeight: '600',
  },
  elevatedCard: {},
});
