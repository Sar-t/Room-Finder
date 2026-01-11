import React from 'react'
import Card from './Card'
import RoomCard from './RoomCard';
import { Link } from 'react-router-dom';

const ShowProperty = ({properties}) => {
  console.log("properties",properties);
  return (
  <div className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-6
  ">
    {properties.map((property) => (
      <Link
        key={property.id}
        to={`/property/${property.id}`}
        className="flex justify-center"
      >
        <RoomCard
          image={property.images?.[0]}
          title={property.title}
          location={property.location}
          rent={property.rent}
          propertyType={property.property_type}
          tenantPreference={property.tenant_preference}
          ownerPhone={property.owner?.phone}
          ownerEmail={property.owner?.email}
        />
      </Link>
    ))}
  </div>
);

}

export default ShowProperty
