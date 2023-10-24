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


export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId, childId) {
    const parent = plan[parentId];

    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    setPlan({
      ...plan,
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
