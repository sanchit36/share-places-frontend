import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import Card from '../../shared/components/UIElements/Card/Card';

const UserItem = ({ id, image, name, placeCount }) => {
  return (
    <Box
      as='li'
      className='user-item'
      m='1rem'
      w='calc(45% - 2rem)'
      minW='17.5rem'
    >
      <Card>
        <HStack as={Link} to={`/${id}/places`} p='4' spacing='4'>
          <Avatar size='lg' src={image} name={name} />
          <div>
            <Text as='h2' fontSize='3xl' fontWeight='bold'>
              {name}
            </Text>
            <Text as='h3' fontSize='lg'>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </Text>
          </div>
        </HStack>
      </Card>
    </Box>
  );
};

UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeCount: PropTypes.number.isRequired,
};

export default UserItem;
