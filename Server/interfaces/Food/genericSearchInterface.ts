export default interface genericSearchInterface {
  items: Item[]
  errorMessage?: string
}

export interface Item {
  food_name: string
  serving_unit: string
  serving_qty: number
  calories?: number
  brand_name?: string
  item_id?: string
}
