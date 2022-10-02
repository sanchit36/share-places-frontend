import { Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchData();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <div className='center'>
          <Card p='1rem' m='2rem auto'>
            <Text>{error}</Text>

            <Button
              leftIcon={<ArrowBackIcon />}
              mt='4'
              onClick={() => {
                history.goBack();
                clearError();
              }}
            >
              GO BACK
            </Button>
          </Card>
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
