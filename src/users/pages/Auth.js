import { Box, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import Button from '../../shared/components/FormElements/Button/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload/ImageUpload';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../shared/content/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const toggleModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setLoginMode((prev) => !prev);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Box my='7rem'>
        <Card className='authentication'>
          {isLoading && <LoadingSpinner asOverlay />}
          <Text
            as='h2'
            fontSize='2xl'
            fontWeight='bold'
            textAlign='center'
            py='1rem'
          >
            {isLoginMode ? 'Login Required' : 'Create an Account'}
          </Text>
          <hr />

          <Box as='form' px='2rem' py='1rem' onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                id='name'
                element='input'
                type='text'
                label='Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid name'
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <ImageUpload
                id='image'
                center
                onInput={inputHandler}
                errorText='Please enter a valid image'
              />
            )}
            <Input
              id='email'
              element='input'
              type='email'
              label='Email'
              validators={[VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email address'
              onInput={inputHandler}
            />
            <Input
              id='password'
              element='input'
              type='password'
              label='Password'
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText='Please enter a valid password, at least 8 characters'
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              {isLoginMode ? 'LOGIN' : 'SIGN UP'}
            </Button>
          </Box>

          <hr />

          <Box px='2rem' py='1rem' textAlign='center'>
            <Button inverse onClick={toggleModeHandler}>
              {isLoginMode
                ? "Don't have an account? Sign up!"
                : 'Already have a account? Login!'}
            </Button>
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default Auth;
