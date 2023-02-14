export default interface InstantSearchInterface {
    common: Common[];
    branded: Branded[];
}

interface Common {
    food_name: string;
    serving_unit: string;
    tag_name: string;
    serving_qty: number;
    common_type?: null;
    tag_id: string;
    photo: Photo;
    locale: string;
}

interface Branded {
    food_name: string;
    serving_unit: string;
    nix_brand_id: string;
    brand_name_item_name: string;
    serving_qty: number;
    nf_calories?: number;
    photo: Photo;
    brand_name: string;
    region?: number;
    brand_type?: number;
    nix_item_id: string;
    locale: string;
}

interface Photo {
    thumb: string;
}
