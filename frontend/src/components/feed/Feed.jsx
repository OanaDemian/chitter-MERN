import { Peep } from "../peep/Peep";
import { getPeeps } from '../../services/peeps.service.js';
import { useEffect, useState } from "react";
export const Feed = () => {
  const [peeps, setPeeps] = useState([]);

  useEffect(() => {
    getPeepsData();
  }, []);

  const getPeepsData = () => {
    getPeeps().then(response => {
      if (response.error === undefined) {
        setPeeps(response.peepData)
      } else {
        setPeeps([])
      }
    })
  }
  
  return (
    <section>
      {peeps.map((peep) => (
        <Peep
          key={peep._id}
          peep={peep}
        />
      ))}
    </section>
  );
};
