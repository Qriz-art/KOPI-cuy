import { photo } from "@/lib/images";

/**
 * DATA MENU CONTOH - semua harga dan nama menu bisa diubah bebas di file ini.
 * Struktur satu item:
 *  - slug        : dipakai untuk URL /menu/[slug]
 *  - category    : coffee | non-coffee | tea | food | snack | dessert
 *  - price       : harga dasar (Rupiah)
 *  - labels      : best-seller | new | recommended
 *  - options     : pilihan ukuran / penyajian, priceDelta menambah harga dasar
 *  - composition : bahan utama, tampil di halaman detail produk
 *  - image       : ganti dengan "/images/nama-file.jpg" kalau sudah punya foto asli
 */

export const categories = [
  { id: "all", label: "Semua" },
  { id: "coffee", label: "Coffee" },
  { id: "non-coffee", label: "Non-Coffee" },
  { id: "tea", label: "Tea" },
  { id: "food", label: "Makanan" },
  { id: "snack", label: "Snack" },
  { id: "dessert", label: "Dessert" },
];

export const labelMeta = {
  "best-seller": { text: "Best Seller", className: "bg-clay text-cream" },
  new: { text: "New", className: "bg-matcha text-cream" },
  recommended: { text: "Recommended", className: "bg-caramel text-cream" },
};

const sizeCoffee = [
  { id: "regular", label: "Regular (240 ml)", priceDelta: 0 },
  { id: "large", label: "Large (360 ml)", priceDelta: 7000 },
];

const tempHotIced = [
  { id: "es", label: "Es", priceDelta: 0 },
  { id: "panas", label: "Panas", priceDelta: 0 },
];

const sizeManualBrew = [
  { id: "single", label: "Single (150 ml)", priceDelta: 0 },
  { id: "double", label: "Double (300 ml)", priceDelta: 12000 },
];

export const menuItems = [
  /* ----------------------------- COFFEE ----------------------------- */
  {
    slug: "kopi-cuy-signature",
    name: "Kopi Cuy Signature",
    category: "coffee",
    price: 28000,
    description:
      "Signature kami: double shot espresso dengan susu segar dan gula aren cair, ditutup krim lembut bergaram.",
    composition: ["Double shot espresso", "Susu segar", "Gula aren cair", "Sea salt cream"],
    labels: ["best-seller"],
    featured: true,
    rating: 4.9,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1511920170033-f8396924c348"),
  },
  {
    slug: "es-kopi-susu-cuy",
    name: "Es Kopi Susu Cuy",
    category: "coffee",
    price: 24000,
    description:
      "Es kopi susu gula aren yang jadi menu paling sering dipesan. Manisnya pas, kopinya tetap terasa.",
    composition: ["Espresso", "Susu UHT", "Gula aren", "Es batu"],
    labels: ["best-seller"],
    featured: true,
    rating: 4.8,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1461988320302-91bde64fc8e4"),
  },
  {
    slug: "americano",
    name: "Americano",
    category: "coffee",
    price: 22000,
    description:
      "Espresso dengan air panas atau es. Pilihan paling jujur untuk menikmati karakter biji kopinya.",
    composition: ["Double shot espresso", "Air mineral"],
    labels: [],
    featured: false,
    rating: 4.7,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1461023058943-07fcbe16d735"),
  },
  {
    slug: "cafe-latte",
    name: "Cafe Latte",
    category: "coffee",
    price: 28000,
    description:
      "Perbandingan susu lebih banyak dengan espresso lembut, cocok untuk yang baru mulai minum kopi.",
    composition: ["Single shot espresso", "Susu segar steamed", "Microfoam"],
    labels: ["recommended"],
    featured: true,
    rating: 4.8,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1495474472287-4d71bcdd2085"),
  },
  {
    slug: "cappuccino",
    name: "Cappuccino",
    category: "coffee",
    price: 28000,
    description:
      "Espresso dengan foam susu tebal dan taburan bubuk kayu manis di atasnya.",
    composition: ["Single shot espresso", "Steamed milk", "Bubuk kayu manis"],
    labels: [],
    featured: false,
    rating: 4.7,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1509042239860-f550ce710b93"),
  },
  {
    slug: "caramel-macchiato",
    name: "Caramel Macchiato",
    category: "coffee",
    price: 32000,
    description:
      "Susu vanila, espresso, dan saus karamel di atasnya. Manis, creamy, dan tetap berkarakter kopi.",
    composition: ["Espresso", "Susu vanila", "Saus karamel", "Whipped cream (opsional)"],
    labels: ["recommended"],
    featured: false,
    rating: 4.8,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1447933601403-0c6688de566e"),
  },
  {
    slug: "butterscotch-sea-salt-latte",
    name: "Butterscotch Sea Salt Latte",
    category: "coffee",
    price: 33000,
    description:
      "Menu musiman dengan sirup butterscotch dan taburan garam laut. Tersedia sampai akhir kuartal ini.",
    composition: ["Espresso", "Butterscotch", "Susu segar", "Sea salt"],
    labels: ["new"],
    featured: true,
    rating: 4.9,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1517701550927-30cf4ba1dba5"),
  },
  {
    slug: "v60-single-origin",
    name: "V60 Single Origin",
    category: "coffee",
    price: 35000,
    description:
      "Manual brew V60 dengan biji pilihan minggu ini. Bisa request metode seduh di catatan pesanan.",
    composition: ["15 g biji single origin", "200 ml air 92°C", "Seduh manual 3 menit"],
    labels: ["recommended"],
    featured: false,
    rating: 4.9,
    options: [
      { id: "size", label: "Ukuran", choices: sizeManualBrew },
      {
        id: "bijih",
        label: "Pilihan Biji",
        choices: [
          { id: "gayo", label: "Gayo - cokelat & rempah", priceDelta: 0 },
          { id: "toraja", label: "Toraja - floral & jeruk", priceDelta: 3000 },
          { id: "kintamani", label: "Kintamani - sweet & nutty", priceDelta: 3000 },
        ],
      },
    ],
    image: photo("1525351484163-7529414344d8"),
  },
  {
    slug: "kopi-tubruk-gula-aren",
    name: "Kopi Tubruk Gula Aren",
    category: "coffee",
    price: 20000,
    description:
      "Kopi tubruk klasik disajikan dengan gula aren batang. Sederhana, kuat, dan bikin melek.",
    composition: ["Kopi robusta tumbuk", "Gula aren batang", "Air panas"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [{ id: "suhu", label: "Penyajian", choices: tempHotIced }],
    image: photo("1464305795204-6f5bbfc7fb81"),
  },

  /* --------------------------- NON-COFFEE --------------------------- */
  {
    slug: "matcha-latte",
    name: "Matcha Latte",
    category: "non-coffee",
    price: 30000,
    description:
      "Matcha grade culinary dari Jepang dengan susu segar. Pahitnya lembut dan wanginya khas.",
    composition: ["Matcha premium 4 g", "Susu segar", "Simple syrup"],
    labels: ["best-seller"],
    featured: true,
    rating: 4.8,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1621263764928-df1444c5e859"),
  },
  {
    slug: "chocolate-cuy",
    name: "Chocolate Cuy",
    category: "non-coffee",
    price: 26000,
    description:
      "Cokelat bubuk premium yang diseduh dengan susu, ditutup krim dan cokelat serut.",
    composition: ["Dark chocolate powder", "Susu segar", "Whipped cream"],
    labels: ["recommended"],
    featured: false,
    rating: 4.7,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1565958011703-44f9829ba187"),
  },
  {
    slug: "red-velvet-latte",
    name: "Red Velvet Latte",
    category: "non-coffee",
    price: 28000,
    description:
      "Red velvet lembut dengan sentuhan cream cheese. Favorit buat yang ingin minuman manis tanpa kopi.",
    composition: ["Red velvet powder", "Susu segar", "Cream cheese foam"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1600271886742-f049cd451bba"),
  },
  {
    slug: "taro-milk-latte",
    name: "Taro Milk Latte",
    category: "non-coffee",
    price: 27000,
    description: "Talas asli yang diblender halus dengan susu. Warnanya cantik, rasanya lembut.",
    composition: ["Talas asli", "Susu segar", "Gula cair"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1576092768241-dec231879fc3"),
  },
  {
    slug: "cookies-cream-milkshake",
    name: "Cookies & Cream Milkshake",
    category: "non-coffee",
    price: 32000,
    description: "Milkshake vanila dengan remahan biskuit cokelat dan whipped cream.",
    composition: ["Es krim vanila", "Susu", "Biskuit cokelat", "Whipped cream"],
    labels: ["new"],
    featured: false,
    rating: 4.7,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1595475207225-428b62bda831"),
  },

  /* ------------------------------ TEA ------------------------------- */
  {
    slug: "lemon-tea",
    name: "Lemon Tea",
    category: "tea",
    price: 20000,
    description: "Teh hitam seduhan segar dengan perasan lemon asli. Bisa panas atau dingin.",
    composition: ["Teh hitam", "Lemon asli", "Gula cair"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [
      { id: "size", label: "Ukuran", choices: sizeCoffee },
      { id: "suhu", label: "Penyajian", choices: tempHotIced },
    ],
    image: photo("1544787219-7f47ccb76574"),
  },
  {
    slug: "peach-tea",
    name: "Peach Tea",
    category: "tea",
    price: 22000,
    description: "Teh dingin dengan sirup persik dan potongan buah persik segar.",
    composition: ["Teh hitam", "Sirup persik", "Potongan persik"],
    labels: ["recommended"],
    featured: false,
    rating: 4.7,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1556679343-c7306c1976bc"),
  },
  {
    slug: "lychee-tea",
    name: "Lychee Tea",
    category: "tea",
    price: 22000,
    description: "Teh leci dingin yang wangi dan menyegarkan, cocok untuk siang hari.",
    composition: ["Teh hitam", "Sirup leci", "Buah leci"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1499638673689-79a0b5115d87"),
  },
  {
    slug: "earl-grey-tea",
    name: "Earl Grey Tea",
    category: "tea",
    price: 24000,
    description: "Teh hitam bergamot, disajikan panas dengan potongan lemon di sampingnya.",
    composition: ["Earl Grey tea bag", "Air panas", "Lemon"],
    labels: [],
    featured: false,
    rating: 4.5,
    options: [{ id: "suhu", label: "Penyajian", choices: tempHotIced }],
    image: photo("1559496417-e7f25cb247f3"),
  },
  {
    slug: "thai-tea-cuy",
    name: "Thai Tea Cuy",
    category: "tea",
    price: 23000,
    description: "Thai tea creamy dengan susu evaporasi, manis dan wangi rempah.",
    composition: ["Thai tea blend", "Susu evaporasi", "Gula cair"],
    labels: ["best-seller"],
    featured: false,
    rating: 4.7,
    options: [{ id: "size", label: "Ukuran", choices: sizeCoffee }],
    image: photo("1559056199-641a0ac8b55e"),
  },

  /* ----------------------------- FOOD ------------------------------- */
  {
    slug: "chicken-katsu-rice",
    name: "Chicken Katsu Rice",
    category: "food",
    price: 35000,
    description:
      "Ayam fillet berbalut tepung panko yang digoreng renyah, nasi hangat, dan saus katsu.",
    composition: ["Ayam fillet 150 g", "Tepung panko", "Nasi putih", "Saus katsu", "Salad kecil"],
    labels: ["best-seller"],
    featured: true,
    rating: 4.8,
    options: [
      {
        id: "saus",
        label: "Pilihan Saus",
        choices: [
          { id: "katsu", label: "Saus katsu", priceDelta: 0 },
          { id: "keju", label: "Saus keju mozzarella", priceDelta: 8000 },
          { id: "pedas", label: "Saus pedas madu", priceDelta: 5000 },
        ],
      },
    ],
    image: photo("1504674900247-0877df9cc836"),
  },
  {
    slug: "nasi-goreng-cuy",
    name: "Nasi Goreng Kopi Cuy",
    category: "food",
    price: 30000,
    description:
      "Nasi goreng kampung dengan telur mata sapi, kerupuk, dan acar timun sesuai resep dapur kami.",
    composition: ["Nasi", "Telur", "Ayam suwir", "Kecap manis", "Kerupuk & acar"],
    labels: ["recommended"],
    featured: false,
    rating: 4.8,
    options: [
      {
        id: "level",
        label: "Level Pedas",
        choices: [
          { id: "0", label: "Tidak pedas", priceDelta: 0 },
          { id: "1", label: "Sedang", priceDelta: 0 },
          { id: "2", label: "Pedas", priceDelta: 0 },
        ],
      },
    ],
    image: photo("1573080496219-bb080dd4f877"),
  },
  {
    slug: "spaghetti-aglio-olio",
    name: "Spaghetti Aglio Olio",
    category: "food",
    price: 38000,
    description: "Spaghetti dengan bawang putih, cabai kering, dan minyak zaitun. Bisa tambah ayam.",
    composition: ["Spaghetti", "Bawang putih", "Chili flakes", "Olive oil", "Parsley"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [
      {
        id: "topping",
        label: "Topping",
        choices: [
          { id: "plain", label: "Tanpa topping", priceDelta: 0 },
          { id: "ayam", label: "Smoked chicken", priceDelta: 10000 },
          { id: "beef", label: "Beef slices", priceDelta: 15000 },
        ],
      },
    ],
    image: photo("1585238342024-78d387f4a707"),
  },
  {
    slug: "beef-burger-cuy",
    name: "Beef Burger Cuy",
    category: "food",
    price: 42000,
    description:
      "Beef patty 120 g, keju cheddar leleh, selada, dan saus rahasia dalam roti brioche.",
    composition: ["Beef patty 120 g", "Cheddar", "Selada & tomat", "Saus house", "Roti brioche"],
    labels: ["new"],
    featured: false,
    rating: 4.7,
    options: [
      {
        id: "side",
        label: "Tambahan",
        choices: [
          { id: "none", label: "Tanpa tambahan", priceDelta: 0 },
          { id: "fries", label: "French fries", priceDelta: 12000 },
          { id: "onion", label: "Onion rings", priceDelta: 15000 },
        ],
      },
    ],
    image: photo("1551782450-a2132b4ba21d"),
  },
  {
    slug: "beef-rice-bowl",
    name: "Beef Rice Bowl",
    category: "food",
    price: 39000,
    description:
      "Irisan beef dengan saus teriyaki di atas nasi hangat, ditutup telur onsen dan wijen.",
    composition: ["Beef slice", "Saus teriyaki", "Telur onsen", "Nasi", "Wijen & daun bawang"],
    labels: [],
    featured: false,
    rating: 4.7,
    options: [
      {
        id: "level",
        label: "Level Pedas",
        choices: [
          { id: "0", label: "Tidak pedas", priceDelta: 0 },
          { id: "1", label: "Pedas", priceDelta: 0 },
        ],
      },
    ],
    image: photo("1482049016688-2d3e1b311543"),
  },
  {
    slug: "mie-goreng-cuy",
    name: "Mie Goreng Cuy",
    category: "food",
    price: 28000,
    description: "Mie goreng dengan sayur, telur, dan ayam. Porsi cukup untuk satu orang lapar.",
    composition: ["Mie telur", "Telur", "Ayam", "Sayuran", "Bawang goreng"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [],
    image: photo("1541167760496-1628856ab772"),
  },

  /* ----------------------------- SNACK ------------------------------ */
  {
    slug: "croffle",
    name: "Croffle",
    category: "snack",
    price: 25000,
    description:
      "Croissant yang dipanggang di cetakan waffle, disajikan dengan mentega dan sirup maple.",
    composition: ["Adonan croissant", "Mentega", "Sirup maple"],
    labels: ["best-seller"],
    featured: true,
    rating: 4.8,
    options: [
      {
        id: "topping",
        label: "Topping",
        choices: [
          { id: "maple", label: "Maple butter", priceDelta: 0 },
          { id: "nutella", label: "Nutella & almond", priceDelta: 8000 },
          { id: "cheese", label: "Keju & gula halus", priceDelta: 6000 },
        ],
      },
    ],
    image: photo("1567620905732-2d1ec7ab7445"),
  },
  {
    slug: "french-fries",
    name: "French Fries",
    category: "snack",
    price: 22000,
    description: "Kentang goreng renyah dengan bumbu garam, disajikan bersama saus sambal dan mayo.",
    composition: ["Kentang", "Garam & lada", "Saus sambal", "Mayones"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [
      {
        id: "bumbu",
        label: "Bumbu",
        choices: [
          { id: "original", label: "Original salted", priceDelta: 0 },
          { id: "bbq", label: "BBQ", priceDelta: 3000 },
          { id: "cheese", label: "Cheese", priceDelta: 5000 },
        ],
      },
    ],
    image: photo("1550547660-d9450f859349"),
  },
  {
    slug: "chicken-wings-honey",
    name: "Chicken Wings Honey",
    category: "snack",
    price: 32000,
    description: "Sayap ayam yang dimarinasi lalu dipanggang, dilumuri saus madu dan wijen.",
    composition: ["Sayap ayam 6 pcs", "Saus madu", "Wijen", "Bawang putih"],
    labels: ["recommended"],
    featured: false,
    rating: 4.8,
    options: [
      {
        id: "level",
        label: "Level Pedas",
        choices: [
          { id: "madu", label: "Madu original", priceDelta: 0 },
          { id: "spicy", label: "Madu pedas", priceDelta: 0 },
        ],
      },
    ],
    image: photo("1523906834658-6e24ef2386f9"),
  },
  {
    slug: "onion-rings",
    name: "Onion Rings",
    category: "snack",
    price: 24000,
    description: "Bawang bombay berbalut tepung crispy dengan saus tartar.",
    composition: ["Bawang bombay", "Tepung crispy", "Saus tartar"],
    labels: [],
    featured: false,
    rating: 4.5,
    options: [],
    image: photo("1553909489-cd47e0907980"),
  },
  {
    slug: "roti-bakar-srikaya",
    name: "Roti Bakar Srikaya",
    category: "snack",
    price: 20000,
    description:
      "Roti tawar panggang dengan selai srikaya buatan sendiri dan taburan keju parut.",
    composition: ["Roti tawar", "Selai srikaya", "Keju parut", "Mentega"],
    labels: ["recommended"],
    featured: false,
    rating: 4.7,
    options: [
      {
        id: "topping",
        label: "Topping",
        choices: [
          { id: "srikaya", label: "Srikaya & keju", priceDelta: 0 },
          { id: "cokelat", label: "Cokelat kacang", priceDelta: 4000 },
        ],
      },
    ],
    image: photo("1509440159596-0249088772ff"),
  },
  {
    slug: "avocado-toast",
    name: "Avocado Toast",
    category: "snack",
    price: 28000,
    description: "Alpukat tumbuk di atas sourdough dengan telur rebus dan cabai kering.",
    composition: ["Sourdough", "Alpukat", "Telur rebus", "Chili flakes", "Lemon"],
    labels: [],
    featured: false,
    rating: 4.6,
    options: [],
    image: photo("1546069901-ba9599a7e63c"),
  },
  {
    slug: "pisang-goreng-caramel",
    name: "Pisang Goreng Caramel",
    category: "snack",
    price: 23000,
    description: "Pisang goreng hangat dengan saus karamel asin dan es krim vanila.",
    composition: ["Pisang", "Tepung crispy", "Saus karamel", "Es krim vanila"],
    labels: [],
    featured: false,
    rating: 4.7,
    options: [],
    image: photo("1498804103079-a6351b050096"),
  },

  /* ---------------------------- DESSERT ----------------------------- */
  {
    slug: "cheesecake-slice",
    name: "Cheesecake Slice",
    category: "dessert",
    price: 30000,
    description:
      "New York cheesecake dengan dasar biskuit dan saus berry. Dipotong tipis, dibuat fresh harian.",
    composition: ["Cream cheese", "Base biskuit", "Saus berry"],
    labels: ["recommended"],
    featured: true,
    rating: 4.8,
    options: [
      {
        id: "saus",
        label: "Saus",
        choices: [
          { id: "berry", label: "Berry", priceDelta: 0 },
          { id: "caramel", label: "Karamel asin", priceDelta: 0 },
        ],
      },
    ],
    image: photo("1578985545062-69928b1d9587"),
  },
  {
    slug: "fudge-brownies",
    name: "Fudge Brownies",
    category: "dessert",
    price: 26000,
    description: "Brownies cokelat pekat dengan bagian tengah yang masih lembut, disajikan hangat.",
    composition: ["Dark chocolate", "Butter", "Telur", "Tepung", "Kenari (opsional)"],
    labels: ["best-seller"],
    featured: false,
    rating: 4.8,
    options: [
      {
        id: "topping",
        label: "Topping",
        choices: [
          { id: "plain", label: "Plain", priceDelta: 0 },
          { id: "eskrim", label: "Es krim vanila", priceDelta: 8000 },
        ],
      },
    ],
    image: photo("1481391319762-47dff72954d9"),
  },
  {
    slug: "croffle-nutella",
    name: "Croffle Nutella",
    category: "dessert",
    price: 27000,
    description: "Croffle dengan Nutella, almond panggang, dan gula halus.",
    composition: ["Croffle", "Nutella", "Almond panggang", "Gula halus"],
    labels: [],
    featured: false,
    rating: 4.7,
    options: [],
    image: photo("1517093602195-b40af9688b46"),
  },
  {
    slug: "choco-lava-cake",
    name: "Choco Lava Cake",
    category: "dessert",
    price: 29000,
    description: "Kue cokelat hangat dengan lelehan cokelat di tengah. Waktu penyajian 10 menit.",
    composition: ["Cokelat compound", "Butter", "Telur", "Gula"],
    labels: ["new"],
    featured: false,
    rating: 4.9,
    options: [],
    image: photo("1551024506-0bccd828d307"),
  },
];

export const menuBySlug = Object.fromEntries(menuItems.map((item) => [item.slug, item]));

export function getItemBySlug(slug) {
  return menuBySlug[slug] ?? null;
}

export function getFeaturedItems(limit = 6) {
  return menuItems.filter((item) => item.featured).slice(0, limit);
}

export function getItemsByLabel(label, limit = 4) {
  return menuItems.filter((item) => item.labels.includes(label)).slice(0, limit);
}

export function getRelatedItems(item, limit = 3) {
  if (!item) return menuItems.slice(0, limit);
  const sameCategory = menuItems.filter(
    (other) => other.slug !== item.slug && other.category === item.category
  );
  const others = menuItems.filter(
    (other) => other.slug !== item.slug && other.category !== item.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Harga akhir = harga dasar + total priceDelta dari opsi yang dipilih */
export function priceWithOptions(item, selectedOptions = {}) {
  if (!item) return 0;
  const delta = (item.options ?? []).reduce((total, option) => {
    const choice = option.choices.find((entry) => entry.id === selectedOptions[option.id]);
    return total + (choice?.priceDelta ?? 0);
  }, 0);
  return item.price + delta;
}

/** Pilihan default: opsi pertama pada tiap grup */
export function defaultOptions(item) {
  return (item.options ?? []).reduce((acc, option) => {
    acc[option.id] = option.choices[0]?.id;
    return acc;
  }, {});
}
