import ANIMAL_WELFARE_SVG from 'svgs/areas-of-focus/animal-welfare.svg?sprite';
import BIODIVERSITY_SVG from 'svgs/areas-of-focus/biodiversity.svg?sprite';
import LAND_CONSERVATION_SVG from 'svgs/areas-of-focus/land-conservation.svg?sprite';
import RESEARCH_SVG from 'svgs/areas-of-focus/research.svg?sprite';
import TOXINS_REDUCTION_SVG from 'svgs/areas-of-focus/toxins-reduction.svg?sprite';
import URBAN_FARMING_SVG from 'svgs/areas-of-focus/urban-farming.svg?sprite';

export const PRINCIPLES = [
  {
    title: 'Limit Disturbance',
    icon: TOXINS_REDUCTION_SVG,
    description: 'Limiting chemical, mechanical and physical disturbance of the soil',
  },
  {
    title: 'Armor the surface',
    icon: LAND_CONSERVATION_SVG,
    description: 'Keeping the soil covered at all times',
  },
  {
    title: 'Increase diversity',
    icon: BIODIVERSITY_SVG,
    description: 'Striving for a diversity of plant and animal species',
  },
  {
    title: 'Maintain living roots',
    icon: URBAN_FARMING_SVG,
    description: 'Living roots throughout the year feed the soil biology',
  },
  {
    title: 'Integrate animals',
    icon: ANIMAL_WELFARE_SVG,
    description: 'Using holistic management approaches that mimic nature',
  },
  {
    title: 'Understand your context',
    icon: RESEARCH_SVG,
    description:
      'Understanding both the historical ecological functions of the land, as well as maintaining an on-going relationship with the changing ecological, economic, and social contexts',
  },
];
