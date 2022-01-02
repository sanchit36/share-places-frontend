import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../shared/content/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { placeId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const [place, setPlace] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setPlace(responseData.place);
      } catch (error) {}
    };
    fetchData();
  }, [placeId, sendRequest]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && place && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={place.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters)'
            onInput={inputHandler}
            initialValue={place.description}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
