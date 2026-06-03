import { Crop, PreOrderRequest, QualityBatch } from './types';

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'crop-1',
    name: 'Organic Potatoes',
    nepaliName: 'आलु (Potatoes)',
    category: 'Grains', // or organic
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx3Cg7zvU_Iy_WPV0DESmRKEjQFez5Yr0xE0Xan-w4D3havC8d-4J7z51ia7GaLZ05WYUig-elDmqnj2ZmyOfRhmKs2sCJS-JHQrEl_-FSXwBx3iwVfcl7lbdyPwysjZlHbSS704E6JJnZfdgai6fDFpeIOVvQW2o3sRZ_g-XZT-ehaPyQry5Hj48rOqTaVBl-gIjjeVu_ZoG58VhIBSqY7Xc0h2Z4D4BEZl2vemZBJoxuwiI0qkrdJXi6IvaqdHh301blk_1_Hu2O',
    farmer: 'Ram Bahadur',
    farmerLocation: 'Kavre, Nepal',
    farmerRating: 4.9,
    farmerReviewsCount: 124,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZv2PtSwX8bH3-T1ZQhoBMEVgVkb8oVr4ULRjpi_XnEul02yU8dIP5ShxaU_bHC7xr6C4C7UqrInBUo5HrSkuU0GKNA4YXcpOTHI6Nl0wUby4hj2f0yIB0tMPSx2XheToeI9u94KEeSQVALYG0n3GUpGTd-z8H5CZA_SKUShD85e3TGMVJuYqgA2JNhapwGI4mdclMT8_wh9oUOdfMd8GE0MobTJcq2yQ0sHZzF5U1rZwNAVerx9QeKd8ygfABf5Y4_F9WPvwSxbFH',
    freshnessScore: 95,
    pricePerKgOriginal: 50,
    pricePerKgCurrent: 45,
    unit: 'Kg',
    rating: 4.8,
    tag: 'FRESH HARVEST',
    stockKg: 1200,
    description: 'Freshly harvested potatoes, lightly dusted with fertile soil. Superior taste, crisp texture, and perfect for roasting or traditional curry dishes.',
    baseFarmPrice: 38,
    freshnessPremium: 5,
    demandSurcharge: 2,
    reviews: [
      {
        id: 'rev-p1',
        reviewerName: 'Ramesh Adhikari',
        rating: 5,
        date: '2026-05-30',
        comment: 'Very high quality, cooked beautifully. The best potatoes I’ve bought in a long time.'
      }
    ]
  },
  {
    id: 'crop-2',
    name: 'Hybrid Tomato',
    nepaliName: 'गोलभेडा (Tomatoes)',
    category: 'Vegetables',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAATKdpHL7xgbmM4dofgdOUubOtK_UUY30wrYaR3eYD-VUnJwEgrnA2grPczbt_zuuwKL3Xtlsl4mJeFijvbhvku_ALuh1ONCcL4rh4ylQgUlRtrHH5aHwuzjEUirgSkcz0Xjhe9XvOPMvQEYat8XRbDDSyrcJpT4K91KDsaAfUt7t5gnyy3Y46aCVvoZUHmD5-p7E6xYtZTt5wSAVlsPHzziU-4X4dkoCuH93yVorHvchgZUpzpRFzicaUgXw8R2UHNmx6cqLhnxt',
    farmer: 'Sita Devi',
    farmerLocation: 'Bhaktapur, Nepal',
    farmerRating: 4.7,
    farmerReviewsCount: 88,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzBHGG9t0n3ZYDkhC7RgtU3qcxHWBDK1qElQauad58E5BEJ8fsGbX8fMSjvudpx7A9fca8ns2QiLM394yJO4hHovyOUT2ptH0YL5mNiadK9JaQJTnB12NXX5SrbR-UNCDMAwC6lLtrCzoexkh0-r--IiUSkNo9yQ-sv2zwRN77xFfoGzpPhERqOu_bcn-A_Appx9Az57LGvlzGCH1srpfrBVoKrEb7WzaXXg_bziyWezcVTayhxePLBpJbGuZPAWq-b5XnHVrVlub2',
    freshnessScore: 82,
    pricePerKgOriginal: 90,
    pricePerKgCurrent: 80,
    unit: 'Kg',
    rating: 4.2,
    tag: 'HOT DEAL',
    stockKg: 450,
    description: 'Juicy, dynamic tomatoes with vibrant skin and thick flesh. Highly versatile, ideal for fresh standard salads, subji, and homemade pickle chutneys.',
    baseFarmPrice: 65,
    freshnessPremium: 8,
    demandSurcharge: 7,
    reviews: [
      {
        id: 'rev-p2',
        reviewerName: 'Subash Thapa',
        rating: 4,
        date: '2026-05-28',
        comment: 'Nice sizing and vibrant color, good price under this Hot Deal offer.'
      }
    ]
  },
  {
    id: 'crop-3',
    name: 'Green Beans',
    nepaliName: 'हरियो बोडी (Green Beans)',
    category: 'Vegetables',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-FflWMroETJeqrp1KCGVcLseMwYNlGQXy589E1N5aOaqRqinZzOl7WJq6HddZG66qXO04uolOyd0DaQHNIJpThhXjTmToEqbEHIDUPQHwlv9ecR-VTSwaaGYYgpeB9LmKYgtWkLKdUijcUj34J38U3ECYMeJ46CB-GnOeao_jHJH2DwlaLujObwMIzOzJZbgcNnb6JuNxYobdultJH6ZTdREl6_L3MHQsce2LczHttGk2vFtFLo0EK9f2GgzdfqWJeUJHibucZ-tk',
    farmer: 'Gopal Sharma',
    farmerLocation: 'Dhading, Nepal',
    farmerRating: 4.8,
    farmerReviewsCount: 95,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnU_ubL8VdVt3_F6RsvlZimNF6wfVElt9iChs5ryyJK5nNedmE1wtukEehY_EjuUwjVJxYrCDpDj64qJnK8-nqwuMiJnCcRWXklHO6Gf9_jGVAXyKDI2lBpJ7uGuic2AECUwuKOgRjGQ9Y4CWw8IVrGdz_e5td0KElFm1qgxyfHXf8S9pVVEcZxewobQitpiJivXv4_3aRZz5R6rNggA3TZKA5qKvk8Hx5j7srG7nRTAkSVgnkWcTIf2lSqE1Hc4odop29dH6300pu',
    freshnessScore: 100,
    pricePerKgOriginal: 120,
    pricePerKgCurrent: 110,
    unit: 'Kg',
    rating: 4.9,
    tag: 'BULK ONLY',
    stockKg: 2000,
    description: 'Long and highly crisp green beans harvested early in the morning. Packed carefully in rustic bundles tied with natural twine. Excellent crunch and mineral retention.',
    baseFarmPrice: 90,
    freshnessPremium: 15,
    demandSurcharge: 5,
    reviews: [
      {
        id: 'rev-p3',
        reviewerName: 'Rita Pathak',
        rating: 5,
        date: '2026-06-01',
        comment: 'Unbelievably crisp and sweet! Totally recommend buying the bulk deal.'
      }
    ]
  },
  {
    id: 'crop-4',
    name: 'Sweet Corn',
    nepaliName: 'मकै (Sweet Corn)',
    category: 'Organic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDI3CvSXfPUOiNDx6jLtmf4C4uApLVp8sw8OV01C52F43j2RzgoW78UbFO9zuSoCJxLmO2ABJ4jouk6BxGwqGBVKoEOwJvOU4RmJsQWDlbU7SCta9jiTyb2RYpjUzD3IMA1lTO_rBFogyCQejAm-8xHfN9T047_qPGVyHLvTJX7_dWV9lbOt9l0YdEcp6SedkM0yo25oLBMjWBUw9lVEXCZ6Gfnc63Q1C3jynPLTtGed-dNHYO00LKgYnUI8WEB5KrUOeURgU9beeQ',
    farmer: 'Anjali Rai',
    farmerLocation: 'Ilam, Nepal',
    farmerRating: 4.6,
    farmerReviewsCount: 52,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO65YI3apNnyhBtSn9WnrHHq54F13l63vyGHSl5Eh3d0YQUScZanjAAl_fMwjAQ6_6WwK1ukXik7P1EGXqjcG_H80bNAKyzBDC7GXuV271sn537zt4ch9lZRvwwIyETOoSpSAskueNA2rYVoJplt_33SwojFz7esYHTJn9its_gsQcbyTfJ5h7es2b1iSuIsrtQwQdj9tqayyob4ILLEqKz52nkXgBuUW4fO4bvZIu-kHG4ATLrDkwvZcY2FC-H9XfcROPgByREEt0',
    freshnessScore: 88,
    pricePerKgOriginal: 75,
    pricePerKgCurrent: 65,
    unit: 'Kg',
    rating: 4.7,
    tag: 'BEST SELLER',
    stockKg: 800,
    description: 'Bright golden sweet corn cobs with outer protective green husks partially peeled back. Plump, uniform kernels packed with naturally sweet moisture.',
    baseFarmPrice: 50,
    freshnessPremium: 10,
    demandSurcharge: 5,
    reviews: [
      {
        id: 'rev-p4',
        reviewerName: 'Kabir Shrestha',
        rating: 5,
        date: '2026-06-02',
        comment: 'Extremely sweet and juicy corn. Kids absolutely loved it! Will buy again.'
      }
    ]
  },
  {
    id: 'crop-5',
    name: 'Organic Vine Tomatoes',
    nepaliName: 'गोलभेडा (Tomatoes)',
    category: 'Organic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_9LhhtJbYRore7PQntp-OnXVgu9pBBf88b97Y0J2prcnPt375o83GMyjE2PNUhDgHkUUDQFwjPwvFtLCIqxBQCCAdvT7ON_nvMMQFnNlUdLqe1xKVWEw4Y2frE6xaLqTDhKZQMU8Q9L35ddb_pbf8q6VZfBQZAXyl1PiBJWa0YnKKLaYkSNgIjpnICFYytGxjglwEiofCEjnR94eSX_ENW2GTpanWOn_R3tcKClpGP7bVC0xR2EX-cDrzjG5OprdiBa93q3zNEjRx',
    farmer: 'Ram Bahadur Gurung',
    farmerLocation: 'Kavre, Nepal',
    farmerRating: 4.9,
    farmerReviewsCount: 124,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZv2PtSwX8bH3-T1ZQhoBMEVgVkb8oVr4ULRjpi_XnEul02yU8dIP5ShxaU_bHC7xr6C4C7UqrInBUo5HrSkuU0GKNA4YXcpOTHI6Nl0wUby4hj2f0yIB0tMPSx2XheToeI9u94KEeSQVALYG0n3GUpGTd-z8H5CZA_SKUShD85e3TGMVJuYqgA2JNhapwGI4mdclMT8_wh9oUOdfMd8GE0MobTJcq2yQ0sHZzF5U1rZwNAVerx9QeKd8ygfABf5Y4_F9WPvwSxbFH',
    freshnessScore: 98,
    pricePerKgOriginal: 120,
    pricePerKgCurrent: 100,
    unit: 'Kg',
    rating: 4.9,
    tag: 'FRESH HARVEST',
    stockKg: 450,
    description: 'Hand-picked this morning. Perfectly ripe, chemical-free vine tomatoes glistening with pure morning dew. Loaded with rich lycopene and perfect for raw salads, organic purees, and traditional Nepali pickle preparations.',
    baseFarmPrice: 85,
    freshnessPremium: 10,
    demandSurcharge: 5,
    reviews: [
      {
        id: 'rev-vt-1',
        reviewerName: 'Anita Shrestha',
        rating: 5,
        date: '2026-06-02',
        comment: 'The freshest tomatoes I have ever bought online. You can really taste the difference from standard store-bought ones. Perfect for my pickle recipe!',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu9okI0V49JqOxPft6_4HHrWIsNyf6zWDJnZxq2yyRXlR8Lfhckeil5iN6ssxXlw_qle2aRCPCzIPW6GGJCP3GW1EqWo_isrHQtlMsJcsaa_l9QyI73_00I770MlboPyGn7wlNTslqmxaW9MU2HugH6La5pYCVG2kPBCqo81fPj-W19kBkOn7zKvzxzA2dWIa_-NdFCuQeWDcX-J9qNyYtkrKzz7KbP3ZvBrNbr8HVXmHfUfARUOrrUWdhFE9QF3vVlLi-U2AAvMP_'
      },
      {
        id: 'rev-vt-2',
        reviewerName: 'Suman Thapa',
        rating: 4.5,
        date: '2026-06-02',
        comment: 'Delivery was very fast and the packaging was eco-friendly. Highly recommended.'
      }
    ]
  },
  {
    id: 'crop-6',
    name: 'Green Gala Apples',
    nepaliName: 'स्याउ (Green Gala Apples)',
    category: 'Fruits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLHQjrjhEEQ0Fxg8oc_qcgjklifGBWdAy0UdqlBSrPZzsOocWV-SRGlkFxe65BFTMJR-W-vfVx2Y_wX0HnA7FHLYrxlv3BbqU9O-HR_Gp2xNTYXQyFl5CExtaauws9XEkf6ynx12nQrfvlckyaDGS3s1wLQGfRsOD0Sa9-MgBk0Xs5ZeUYCA_LpdbT9QCO7j1vEaEkbk2QQOytsJZCCSrFr1xvYCZe81G96_xZ3asi71ev7cMtomOPnsGjHdEgk6LV-zFfkhkdItQ9',
    farmer: 'Sita Devi',
    farmerLocation: 'Bhaktapur, Nepal',
    farmerRating: 4.7,
    farmerReviewsCount: 88,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzBHGG9t0n3ZYDkhC7RgtU3qcxHWBDK1qElQauad58E5BEJ8fsGbX8fMSjvudpx7A9fca8ns2QiLM394yJO4hHovyOUT2ptH0YL5mNiadK9JaQJTnB12NXX5SrbR-UNCDMAwC6lLtrCzoexkh0-r--IiUSkNo9yQ-sv2zwRN77xFfoGzpPhERqOu_bcn-A-Appx9Az57LGvlzGCH1srpfrBVoKrEb7WzaXXg_bziyWezcVTayhxePLBpJbGuZPAWq-b5XnHVrVlub2',
    freshnessScore: 92,
    pricePerKgOriginal: 250,
    pricePerKgCurrent: 220,
    unit: 'Kg',
    rating: 4.6,
    tag: 'SEASONAL',
    stockKg: 600,
    description: 'Crisp and tart Green Gala Apples, perfect for snacking or baking. Organically grown in the high altitudes of Bhaktapur.',
    baseFarmPrice: 180,
    freshnessPremium: 20,
    demandSurcharge: 20,
    reviews: [
      {
        id: 'rev-apple-1',
        reviewerName: 'Prakash Lama',
        rating: 5,
        date: '2026-06-01',
        comment: 'Delicious and fresh! Highly recommend these apples.'
      }
    ]
  },
  {
    id: 'crop-7',
    name: 'Organic Bananas',
    nepaliName: 'केरा (Organic Bananas)',
    category: 'Fruits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_9LhhtJbYRore7PQntp-OnXVgu9pBBf88b97Y0J2prcnPt375o83GMyjE2PNUhDgHkUUDQFwjPwvFtLCIqxBQCCAdvT7ON_nvMMQFnNlUdLqe1xKVWEw4Y2frE6xaLqTDhKZQMU8Q9L35ddb_pbf8q6VZfBQZAXyl1PiBJWa0YnKKLaYkSNgIjpnICFYytGxjglwEiofCEjnR94eSX_ENW2GTpanWOn_R3tcKClpGP7bVC0xR2EX-cDrzjG5OprdiBa93q3zNEjRx',
    farmer: 'Gopal Sharma',
    farmerLocation: 'Dhading, Nepal',
    farmerRating: 4.8,
    farmerReviewsCount: 95,
    farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnU_ubL8VdVt3_F6RsvlZimNF6wfVElt9iChs5ryyJK5nNedmE1wtukEehY_EjuUwjVJxYrCDpDj64qJnK8-nqwuMiJnCcRWXklHO6Gf9_jGVAXyKDI2lBpJ7uGuic2AECUwuKOgRjGQ9Y4CWw8IVrGdz_e5td0KElF1qgxyfHXf8S9pVVEcZxewobH9XfcROPgByREEt0',
    freshnessScore: 90,
    pricePerKgOriginal: 80,
    pricePerKgCurrent: 70,
    unit: 'Kg',
    rating: 4.5,
    tag: 'ORGANIC',
    stockKg: 1500,
    description: 'Sweet and creamy organic bananas, grown without pesticides. A healthy and energy-boosting snack.',
    baseFarmPrice: 55,
    freshnessPremium: 10,
    demandSurcharge: 5,
    reviews: [
      {
        id: 'rev-banana-1',
        reviewerName: 'Shanti Devi',
        rating: 4,
        date: '2026-05-29',
        comment: 'Good quality bananas, arrived fresh.'
      }
    ]
  }
];

export const INITIAL_PRE_ORDERS: PreOrderRequest[] = [
  {
    id: 'pre-1',
    cropName: 'Buckwheat',
    cropNepaliName: 'फापर (Buckwheat)',
    deliveryDate: 'Oct 2024 Delivery',
    quantityKg: 5000,
    pricePerKg: 90,
    buyerName: 'Pokhara Wholesale Co.',
    buyerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6a-bASNOjXnUBejIsjVV339DMvXVZFVQH_ZWxHl0hXoaFv6TugFxNXdt39wu_4T22etcrB9V3tZsjwmm76lhF5F6Go77LSXlNPsWiTy3UsXlkbEm9y3KgW71OqiP74VMVaBlY--S3yGOCF2mT8Fw-W7BI9tZU9gsaXOc2_o1KRVzQWIsj48pxAqq5JZ4pPHoo805SE37aZLkPzKl658r33MsZEzVvT2xmtTsMzntnbW_AR16FrYiFOVmx8SNeJSsuffpgXxZjlA4P',
    status: 'PENDING'
  },
  {
    id: 'pre-2',
    cropName: 'Ginger',
    cropNepaliName: 'अदुवा (Ginger)',
    deliveryDate: 'Nov 2024 Delivery',
    quantityKg: 200,
    pricePerKg: 210,
    buyerName: 'Kathmandu Fresh Mart',
    buyerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrnk-xq06nFIxiEMMhRu0cse6URcf7tOcV-jVDDkAL9XN-a6V2A2K7WPYzWWza311k_mFfwGZ0KrF1d6kSfQCf7BAmMTfkEeZDZ_5jl5CbzmLwF-kGySswN2a0vz9obCcj_JuKNC53KHxrLSD1PXC1FdsoCdWwI6OW0CvjsSMjrl-kgAbSiHacypaz-4JFBmigvrls1qEbFAMHtBRGtr92c1fJtZMTlojVnjgEUqcADS-5c-Qgfe6qnSt_6Q_WLeZyXSrVfv0-HCTY',
    status: 'PENDING'
  },
  {
    id: 'pre-3',
    cropName: 'Cardamom',
    cropNepaliName: 'अलैंची (Cardamom)',
    deliveryDate: 'Sep 2024 Delivery',
    quantityKg: 1500,
    pricePerKg: 1200,
    buyerName: 'Himalayan Spices Gp',
    buyerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO65YI3apNnyhBtSn9WnrHHq54F13l63vyGHSl5Eh3d0YQUScZanjAAl_fMwjAQ6_6WwK1ukXik7P1EGXqjcG_H80bNAKyzBDC7GXuV271sn537zt4ch9lZRvwwIyETOoSpSAskueNA2rYVoJplt_33SwojFz7esYHTJn9its_gsQcbyTfJ5h7es2b1iSuIsrtQwQdj9tqayyob4ILLEqKz52nkXgBuUW4fO4bvZIu-kHG4ATLrDkwvZcY2FC-H9XfcROPgByREEt0',
    status: 'PENDING'
  }
];

export const INITIAL_QUALITY_BATCHES: QualityBatch[] = [
  {
    id: 'BATCH-ORG-442',
    cropName: 'Organic Vine Tomatoes',
    nepaliName: 'गोलभेडा (Tomatoes)',
    grade: 'Grade A',
    stage: 'At Warehouse',
    shelfLifeDays: 2,
    warning: 'This batch shows signs of surface softening. Recommended for immediate processing or 15% price drop.',
    originalPrice: 120,
    suggestedPrice: 95,
    mitigationApplied: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAErMlN5TpZAJxlA34JZs-0n1p1OM1UIiIP3rq9sXTQkLaKcMs6AO7fz6FiaBWGpVAuPHSEVyIKItGrQzfpt2E_T3rRQ43rR0Q7eHhLkH3eeHCi12fGngFUMjEYpDa9tT2Losezd7mNwPuJBOErN-YgP7Q2RuCPm_8cdh0ITjwSMzTVJwow4GJ7Zl3jPidEhlPKFhMTnbwydhCgMpLnyqTg-5heERhCgtIGiqwg-xj8_pq95G7iwhuyTSGKaLolne2wwjKjCs2WRWaw'
  },
  {
    id: 'BATCH-GRI-109',
    cropName: 'Green Gala Apples',
    nepaliName: 'स्याउ (Green Gala Apples)',
    grade: null,
    stage: 'At Farm',
    shelfLifeDays: 5,
    originalPrice: 240,
    suggestedPrice: 190,
    mitigationApplied: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLHQjrjhEEQ0Fxg8oc_qcgjklifGBWdAy0UdqlBSrPZzsOocWV-SRGlkFxe65BFTMJR-W-vfVx2Y_wX0HnA7FHLYrxlv3BbqU9O-HR_Gp2xNTYXQyFl5CExtaauws9XEkf6ynx12nQrfvlckyaDGS3s1wLQGfRsOD0Sa9-MgBk0Xs5ZeUYCA_LpdbT9QCO7j1vEaEkbk2QQOytsJZCCSrFr1xvYCZe81G96_xZ3asi71ev7cMtomOPnsGjHdEgk6LV-zFfkhkdItQ9'
  },
  {
    id: 'BATCH-WH-993',
    cropName: 'Basmati Rice',
    nepaliName: 'चामल (Basmati Rice)',
    grade: 'Grade A',
    stage: 'Before Dispatch',
    shelfLifeDays: 180,
    originalPrice: 150,
    suggestedPrice: 135,
    mitigationApplied: false,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300'
  }
];