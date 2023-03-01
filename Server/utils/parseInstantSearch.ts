import BrandedSearchInterface from '../api_interfaces/brandedSearchInterface';
import InstantSearchInterface, {Common, Branded } from '../api_interfaces/instantFoodSearchInterface';
import genericSearchInterface, { Item } from '../interfaces/genericSearchInterface';

function transformCommon(common: Common): Item {
  return {
    food_name: common.food_name,
    serving_unit: common.serving_unit,
    serving_qty: common.serving_qty,
    calories: undefined,
    brand_name: undefined,
    item_id: undefined,
  };
}

function transformBranded(branded: Branded): Item {
  return {
    food_name: branded.food_name,
    serving_unit: branded.serving_unit,
    serving_qty: branded.serving_qty,
    calories: branded.nf_calories,
    brand_name: branded.brand_name,
    item_id: branded.nix_item_id,
  };
}

export default function transformInstantSearchInterface(instantSearchInterface: InstantSearchInterface): genericSearchInterface {
  const items: Item[] = [];

  instantSearchInterface.common.forEach((common) => {
    items.push(transformCommon(common));
  });

  instantSearchInterface.branded.forEach((branded) => {
    items.push(transformBranded(branded));
  });

  return { items };
}


