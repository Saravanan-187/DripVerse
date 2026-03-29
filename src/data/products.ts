
import productTee from "@/assets/product-tee.png";
import productCargo from "@/assets/product-cargo.png";
import productHoodie from "@/assets/product-hoodie.png";
import productJacket from "@/assets/product-jacket.png";
import productTank from "@/assets/product-tank.png";
import productDenim from "@/assets/product-denim.png";
import productBeanie from "@/assets/product-beanie.png";
import productVest from "@/assets/product-vest.png";

export interface Product {
    id: number;
    name: string;
    image: string;
    category: string;
    price: string;
    priceNum: number;
    gender: string;
    isNew: boolean;
    isSale: boolean;
    salePrice?: string;
    description: string;
    colors: string[];
    sizes: string[];
}

export const categories = ["All", "T-Shirts", "Hoodies", "Pants", "Accessories", "Jackets"];
export const genders = ["All", "Men", "Women", "Unisex"];

export const products: Product[] = [
    {
        id: 1,
        name: "Oversized Graphic Tee",
        image: productTee,
        category: "T-Shirts",
        price: "$45.00",
        priceNum: 45,
        gender: "unisex",
        isNew: true,
        isSale: false,
        description: "Premium cotton oversized t-shirt with a soft handfeel, dropped shoulders, and a bold back print built for everyday wear.",
        colors: ["Black", "White", "Olive"],
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 2,
        name: "Essential Cargo Pants",
        image: productCargo,
        category: "Pants",
        price: "$89.00",
        priceNum: 89,
        gender: "men",
        isNew: true,
        isSale: false,
        description: "Relaxed fit cargo pants with roomy utility pockets, reinforced seams, and adjustable cuffs for a sharper stacked look.",
        colors: ["Sand", "Charcoal", "Army Green"],
        sizes: ["30", "32", "34", "36"],
    },
    {
        id: 3,
        name: "Vintage Wash Hoodie",
        image: productHoodie,
        category: "Hoodies",
        price: "$65.00",
        priceNum: 65,
        gender: "unisex",
        isNew: false,
        isSale: true,
        salePrice: "$45.00",
        description: "Heavyweight French terry hoodie with a faded vintage wash, roomy hood, and a broken-in feel from day one.",
        colors: ["Washed Black", "Stone", "Brick"],
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 4,
        name: "Tech Fleece Jacket",
        image: productJacket,
        category: "Jackets",
        price: "$120.00",
        priceNum: 120,
        gender: "men",
        isNew: true,
        isSale: false,
        description: "Water-resistant technical fleece jacket with reflective trims, secure zip pockets, and a structured silhouette.",
        colors: ["Graphite", "Navy", "Silver"],
        sizes: ["M", "L", "XL"],
    },
    {
        id: 5,
        name: "Cropped Ribbed Tank",
        image: productTank,
        category: "T-Shirts",
        price: "$35.00",
        priceNum: 35,
        gender: "women",
        isNew: false,
        isSale: false,
        description: "Soft ribbed tank with a flattering cropped silhouette, stretch recovery, and a clean minimal finish.",
        colors: ["Cream", "Mocha", "Black"],
        sizes: ["XS", "S", "M", "L"],
    },
    {
        id: 6,
        name: "Wide Leg Denim",
        image: productDenim,
        category: "Pants",
        price: "$95.00",
        priceNum: 95,
        gender: "women",
        isNew: true,
        isSale: false,
        description: "High-waisted wide leg denim in a washed blue finish with a balanced drape and all-day structure.",
        colors: ["Light Blue", "Mid Blue"],
        sizes: ["26", "28", "30", "32"],
    },
    {
        id: 7,
        name: "Streetwear Beanie",
        image: productBeanie,
        category: "Accessories",
        price: "$25.00",
        priceNum: 25,
        gender: "unisex",
        isNew: false,
        isSale: false,
        description: "Classic knit beanie with a snug fit, soft texture, and understated embroidered logo for daily rotation.",
        colors: ["Black", "Heather Grey", "Rust"],
        sizes: ["One Size"],
    },
    {
        id: 8,
        name: "Puffer Vest",
        image: productVest,
        category: "Jackets",
        price: "$75.00",
        priceNum: 75,
        gender: "men",
        isNew: false,
        isSale: true,
        salePrice: "$55.00",
        description: "Insulated puffer vest designed for layering, with lightweight warmth and a clean street-ready profile.",
        colors: ["Black", "Forest", "Sand"],
        sizes: ["S", "M", "L", "XL"],
    },
];
