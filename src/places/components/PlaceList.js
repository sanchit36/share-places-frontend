import PropTypes from "prop-types";

import Card from "../../shared/components/UIElements/Card/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          createId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

PlaceList.prototype = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      coordinates: PropTypes.object.isRequired,
    })
  ),
};

export default PlaceList;
