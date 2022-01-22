import React from 'react';

export default function Artist({ albums }) {
  return (
    <ul>
      {albums.map((el) => (
        < li key={el.id} > {el.name}</li>
      ))
      }
    </ul >
  )

}
