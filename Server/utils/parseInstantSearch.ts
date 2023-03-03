import BrandedSearchInterface from '../api_interfaces/brandedSearchInterface';
import InstantSearchInterface, {Common, Branded } from '../api_interfaces/instantFoodSearchInterface';
import genericSearchInterface, { Item } from '../interfaces/genericSearchInterface';

function transformCommon({ food_name, serving_unit, serving_qty }: Common): Item {
  return {
    food_name,
    serving_unit,
    serving_qty,
    calories: undefined,
    brand_name: undefined,
    item_id: undefined,
  };
}

function transformBranded({ food_name, serving_unit, serving_qty, nf_calories, brand_name, nix_item_id }: Branded): Item {
  return {
    food_name,
    serving_unit,
    serving_qty,
    calories: nf_calories,
    brand_name,
    item_id: nix_item_id,
  };
}



export default function transformInstantSearchInterface(instantSearchInterface: InstantSearchInterface): genericSearchInterface {
  const items: Item[] = [
    ...instantSearchInterface.common.map(transformCommon),
    ...instantSearchInterface.branded.map(transformBranded),
  ];

  return { items };
}

