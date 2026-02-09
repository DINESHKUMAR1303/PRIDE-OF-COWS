
import milkImg from "../pages/Milk/ProductDetail/images/image1.png";
import gheeImg from "../pages/Ghee/images/Ghee.png";
import curdImg from "../pages/Curd/images/curd.png";
import paneerImg from "../pages/Paneer/images/panner.png";
import blueImg from "../pages/Yogurt/images/blueberry.png";
import mixedImg from "../pages/Yogurt/images/mixedberry-front.png";
import pineImg from "../pages/Yogurt/images/pineapple-front.png";
import milkPowderImg from "../pages/Milk Powder/images/Milk Powder.png";
import proteinBarImg from "../pages/Protein Bar/images/protein bar.png";

export const MOCK_PRODUCTS = [
    {
        _id: "aaaaaaaabbbbbbbbcccc0001",
        productName: "Milk",
        weight: "1 L",
        price: 120,
        mrp: 140,
        image: milkImg,
        category: "Milk",
        isActive: true,
        description: "Pride of Cows Milk is full of love and 100% pure cow milk. Sourced directly from our Bhagyalaxmi Dairy Farm."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0002",
        productName: "Ghee",
        weight: "1 L",
        price: 2190,
        mrp: 2500,
        image: gheeImg,
        category: "Ghee",
        isActive: true,
        description: "Pride of Cows Ghee is single-origin, made from fresh milk from our own farms. Untouched by human hands, it has an unmatched aroma and taste."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0003",
        productName: "Curd",
        weight: "400g",
        price: 80,
        mrp: 90,
        image: curdImg,
        category: "Curd",
        isActive: true,
        description: "Our curd is made from fresh, high-quality milk, rich in probiotics to aid digestion and boost immunity. Thick, creamy, and delicious."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0004",
        productName: "Paneer",
        weight: "200g",
        price: 150,
        mrp: 180,
        image: paneerImg,
        category: "Paneer",
        isActive: true,
        description: "Our Paneer is made from fresh, high-quality milk. It is soft, creamy, and rich in protein, making it perfect for your favorite dishes."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0005",
        productName: "Blueberry Yogurt",
        weight: "120g",
        price: 95,
        mrp: 122,
        image: blueImg,
        category: "Yogurt",
        isActive: true,
        description: "Made from fresh milk and real blueberries. Rich in antioxidants and probiotics."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0008",
        productName: "Mixed Berry Yogurt",
        weight: "120g",
        price: 95,
        mrp: 122,
        image: mixedImg,
        category: "Yogurt",
        isActive: true,
        description: "A delightful mix of strawberries, raspberries, and blueberries. Creamy texture with natural goodness."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0009",
        productName: "Pineapple Yogurt",
        weight: "120g",
        price: 95,
        mrp: 122,
        image: pineImg,
        category: "Yogurt",
        isActive: true,
        description: "Tropical bliss in every spoon. Real pineapple chunks blended with creamy yogurt."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0006",
        productName: "Milk Powder",
        weight: "500g",
        price: 440,
        mrp: 500,
        image: milkPowderImg,
        category: "Milk Powder",
        isActive: true,
        description: "Premium skimmed milk powder, perfect for your daily needs."
    },
    {
        _id: "aaaaaaaabbbbbbbbcccc0007",
        productName: "Protein Bar",
        weight: "50g",
        price: 120,
        mrp: 150,
        image: proteinBarImg,
        category: "Protein Bar",
        isActive: true,
        description: "High-protein energy bar for a quick boost."
    }
];
