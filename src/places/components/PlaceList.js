import PropTypes from 'prop-types';
import Button from '../../shared/components/FormElements/Button/Button';

import Card from '../../shared/components/UIElements/Card/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card p='1rem' m='2rem auto'>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  );
};

PlaceList.prototype = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      coordinates: PropTypes.object.isRequired,
    })
  ),
  onDeletePlace: PropTypes.func.isRequired,
};

export default PlaceList;
