import { Peep } from "../peep/Peep";
import { peeps } from "../../assets/samplePeeps.js";

export const Feed = () => {
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
