export default interface BrandedSearchInterface{
    foods:Food[]
}

interface Food {
    food_name: string;
    brand_name: string;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nf_metric_qty: number;
    nf_metric_uom: string;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium?: any;
    nf_p?: any;
    full_nutrients: FullNutrient[];
    nix_brand_name: string;
    nix_brand_id: string;
    nix_item_name: string;
    nix_item_id: string;
    metadata: any;
    source: number;
    ndb_no?: any;
    tags?: any;
    alt_measures?: any;
    lat?: any;
    lng?: any;
    photo: Photo;
    note?: any;
    class_code?: any;
    brick_code?: any;
    tag_id?: any;
    updated_at: string;
    nf_ingredient_statement?: any;
}

interface FullNutrient {
    attr_id: number;
    value: number;
}

interface Photo {
    thumb: string;
    highres?: any;
    is_user_uploaded: boolean;
}
