import { useState } from "react";
import { initialTravelPlan } from "./places.js";

// const intialItems = [
//   { title: 'pretzels', id: 0 },
//   { title: 'crispy seaweed', id: 1 },
//   { title: 'granola bar', id: 2 },
// ];

// export default function App() {
//   const [items, setItems] = useState(intialItems);
//   const [selectedId, setSelectedId] = useState(0);

//   const selectedItem = items.find(item => 
//     item.id === selectedId
//     );

//   function handleItemChange(id, e) {
//     setItems( items.map(item => {
//       if (item.id === id) {
//         return {
//           ...item,
//           title: e.target.value,
//         };
//       } else {
//         return item;
//       }
//     }));
//   }

//   return (
//     <>
//     <h2>What's your travel snack?</h2>
//     <ul>
//       {items.map((item, index) => (
//         <li key={item.id}>
//           <input
//           value={item.title}
//           onChange={e => {
//             handleItemChange(item.id, e)
//           }}
//           />
//           {' '}
//           <button onClick={() => {
//             setSelectedId(item.id);
//           }}>
//             Choose</button>
//         </li>
//       ))}
//     </ul>
//     <p>You picked {selectedItem.title}.</p>
//     </>
//   )
// }

function PlaceTree({ place }) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map(place => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const plantes = plan.childPlaces;
  return (
    <>
    <h2>Places to visit</h2>
    <ol>
      {plantes.map(place => (
        <PlaceTree key={place.id} place={place} />
      ))}
    </ol>
    </>
  );
}