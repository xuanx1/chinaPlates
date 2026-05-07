// China license plate data
// Province characters (汉字简称) — each province has a one-character abbreviation
// used as the first character on every plate registered there.

window.PROVINCES = [
  // North
  { char: '京', pinyin: 'Jīng', name: 'Beijing', en: 'Beijing Municipality', region: 'North', pop: '21.9M', capital: 'Beijing', x: 660, y: 245, note: 'Capital city. Plates are heavily restricted — a lottery system limits new registrations.' },
  { char: '津', pinyin: 'Jīn', name: 'Tianjin', en: 'Tianjin Municipality', region: 'North', pop: '13.7M', capital: 'Tianjin', x: 678, y: 263, note: 'Major northern port. Auction-based plate allocation.' },
  { char: '冀', pinyin: 'Jì', name: 'Hebei', en: 'Hebei Province', region: 'North', pop: '74.2M', capital: 'Shijiazhuang', x: 645, y: 280, note: 'Surrounds Beijing & Tianjin. Character 冀 is the ancient name for the region.' },
  { char: '晋', pinyin: 'Jìn', name: 'Shanxi', en: 'Shanxi Province', region: 'North', pop: '34.9M', capital: 'Taiyuan', x: 595, y: 295, note: 'Coal heartland. Named after the ancient state of Jin.' },
  { char: '蒙', pinyin: 'Měng', name: 'Inner Mongolia', en: 'Inner Mongolia Autonomous Region', region: 'North', pop: '24.0M', capital: 'Hohhot', x: 555, y: 200, note: 'Vast northern grasslands. 蒙 = Mongol.' },

  // Northeast
  { char: '辽', pinyin: 'Liáo', name: 'Liaoning', en: 'Liaoning Province', region: 'Northeast', pop: '42.6M', capital: 'Shenyang', x: 740, y: 240, note: 'Industrial Northeast. Named after the Liao River.' },
  { char: '吉', pinyin: 'Jí', name: 'Jilin', en: 'Jilin Province', region: 'Northeast', pop: '24.1M', capital: 'Changchun', x: 770, y: 200, note: 'Auto manufacturing hub — home of FAW.' },
  { char: '黑', pinyin: 'Hēi', name: 'Heilongjiang', en: 'Heilongjiang Province', region: 'Northeast', pop: '31.9M', capital: 'Harbin', x: 790, y: 150, note: '黑 means "black" — from the Heilong (Amur) River.' },

  // East
  { char: '沪', pinyin: 'Hù', name: 'Shanghai', en: 'Shanghai Municipality', region: 'East', pop: '24.9M', capital: 'Shanghai', x: 780, y: 405, note: 'Famously expensive plates — auctioned for ~¥90,000+ ($12,500). Often costlier than the car.' },
  { char: '苏', pinyin: 'Sū', name: 'Jiangsu', en: 'Jiangsu Province', region: 'East', pop: '85.0M', capital: 'Nanjing', x: 745, y: 385, note: 'Wealthy delta province. 苏A = Nanjing, 苏E = Suzhou.' },
  { char: '浙', pinyin: 'Zhè', name: 'Zhejiang', en: 'Zhejiang Province', region: 'East', pop: '64.6M', capital: 'Hangzhou', x: 760, y: 430, note: 'Tech & e-commerce hub — home of Alibaba.' },
  { char: '皖', pinyin: 'Wǎn', name: 'Anhui', en: 'Anhui Province', region: 'East', pop: '61.0M', capital: 'Hefei', x: 705, y: 400, note: 'Named after Mount Wan. 皖A = Hefei.' },
  { char: '闽', pinyin: 'Mǐn', name: 'Fujian', en: 'Fujian Province', region: 'East', pop: '41.8M', capital: 'Fuzhou', x: 720, y: 490, note: 'Coastal, mountainous, across from Taiwan.' },
  { char: '赣', pinyin: 'Gàn', name: 'Jiangxi', en: 'Jiangxi Province', region: 'East', pop: '45.2M', capital: 'Nanchang', x: 680, y: 460, note: 'Named after the Gan River.' },
  { char: '鲁', pinyin: 'Lǔ', name: 'Shandong', en: 'Shandong Province', region: 'East', pop: '101.5M', capital: 'Jinan', x: 705, y: 320, note: 'Birthplace of Confucius. Most populous province with own plate.' },

  // Central
  { char: '豫', pinyin: 'Yù', name: 'Henan', en: 'Henan Province', region: 'Central', pop: '99.4M', capital: 'Zhengzhou', x: 645, y: 345, note: 'Cradle of Chinese civilization. 豫 is its ancient name.' },
  { char: '鄂', pinyin: 'È', name: 'Hubei', en: 'Hubei Province', region: 'Central', pop: '57.7M', capital: 'Wuhan', x: 640, y: 405, note: '鄂A = Wuhan. Geographic center of China.' },
  { char: '湘', pinyin: 'Xiāng', name: 'Hunan', en: 'Hunan Province', region: 'Central', pop: '66.4M', capital: 'Changsha', x: 615, y: 450, note: 'Mao Zedong\'s home province.' },

  // South
  { char: '粤', pinyin: 'Yuè', name: 'Guangdong', en: 'Guangdong Province', region: 'South', pop: '126.8M', capital: 'Guangzhou', x: 635, y: 510, note: 'Most populous province. 粤B = Shenzhen — green plates dominate (BYD HQ).' },
  { char: '桂', pinyin: 'Guì', name: 'Guangxi', en: 'Guangxi Zhuang Autonomous Region', region: 'South', pop: '50.1M', capital: 'Nanning', x: 575, y: 510, note: 'Karst landscape of Guilin. 桂 = osmanthus tree.' },
  { char: '琼', pinyin: 'Qióng', name: 'Hainan', en: 'Hainan Province', region: 'South', pop: '10.1M', capital: 'Haikou', x: 595, y: 575, note: 'Tropical island — China\'s "Hawaii".' },

  // Southwest
  { char: '渝', pinyin: 'Yú', name: 'Chongqing', en: 'Chongqing Municipality', region: 'Southwest', pop: '32.1M', capital: 'Chongqing', x: 555, y: 420, note: 'Mountain megacity. 渝 from the ancient Yu state.' },
  { char: '川', pinyin: 'Chuān', name: 'Sichuan', en: 'Sichuan Province', region: 'Southwest', pop: '83.7M', capital: 'Chengdu', x: 510, y: 415, note: 'Pandas, hotpot, and the Chengdu plain. 川 = "rivers".' },
  { char: '贵', pinyin: 'Guì', name: 'Guizhou', en: 'Guizhou Province', region: 'Southwest', pop: '38.6M', capital: 'Guiyang', x: 555, y: 470, note: 'Mountainous southwest — known for Maotai liquor.' },
  { char: '云', pinyin: 'Yún', name: 'Yunnan', en: 'Yunnan Province', region: 'Southwest', pop: '47.2M', capital: 'Kunming', x: 490, y: 490, note: '云 = "cloud". Diverse highlands bordering Myanmar, Laos, Vietnam.' },
  { char: '藏', pinyin: 'Zàng', name: 'Tibet', en: 'Tibet Autonomous Region', region: 'Southwest', pop: '3.7M', capital: 'Lhasa', x: 350, y: 410, note: 'Highest plates in the world — issued at 3,650m.' },

  // Northwest
  { char: '陕', pinyin: 'Shǎn', name: 'Shaanxi', en: 'Shaanxi Province', region: 'Northwest', pop: '39.5M', capital: 'Xi\'an', x: 575, y: 350, note: 'Home of the Terracotta Army. Often written 秦 historically.' },
  { char: '甘', pinyin: 'Gān', name: 'Gansu', en: 'Gansu Province', region: 'Northwest', pop: '24.9M', capital: 'Lanzhou', x: 480, y: 320, note: 'Silk Road corridor.' },
  { char: '青', pinyin: 'Qīng', name: 'Qinghai', en: 'Qinghai Province', region: 'Northwest', pop: '5.9M', capital: 'Xining', x: 440, y: 350, note: 'Named after Qinghai Lake — China\'s largest salt lake.' },
  { char: '宁', pinyin: 'Níng', name: 'Ningxia', en: 'Ningxia Hui Autonomous Region', region: 'Northwest', pop: '7.2M', capital: 'Yinchuan', x: 525, y: 295, note: 'Smallest northwest region, along the Yellow River.' },
  { char: '新', pinyin: 'Xīn', name: 'Xinjiang', en: 'Xinjiang Uyghur Autonomous Region', region: 'Northwest', pop: '25.9M', capital: 'Ürümqi', x: 320, y: 270, note: 'Largest region by area — 1/6 of China. 新 = "new".' },
];

// Plate types — color-coded
window.PLATE_TYPES = [
  {
    id: 'blue',
    name: 'Standard Vehicle',
    cn: '小型汽车',
    bg: '#1e4fa3',
    fg: '#ffffff',
    sample: ['京', 'A', '·', 'F', '0', 'A', '8', '8'],
    desc: 'Private cars under 4.5 tonnes. The most common plate in China — white characters on a deep blue field. 7 characters: province + city letter + 5 alphanumeric.',
    issued: '~280M in circulation'
  },
  {
    id: 'yellow',
    name: 'Large or Commercial',
    cn: '大型汽车',
    bg: '#f0c419',
    fg: '#000000',
    sample: ['冀', 'B', '·', '1', '2', '3', '4', '5'],
    desc: 'Trucks, buses, and large vehicles over 4.5 tonnes. Black characters on yellow. Also used for learner-driver plates and motorcycles.',
    issued: '~30M commercial vehicles'
  },
  {
    id: 'green',
    name: 'New Energy, Small Vehicles',
    cn: '新能源·小型',
    bg: 'linear-gradient(180deg,#cdebc8 0%,#9fd6a4 100%)',
    fg: '#0b3d0b',
    sample: ['粤', 'B', 'D', '·', '1', '2', '3', '4', '5'],
    desc: 'Introduced in 2016 for electric and plug-in hybrid passenger cars. Eight characters — one more than petrol plates. Gradient green-to-white background.',
    issued: '~25M and rising fast'
  },
  {
    id: 'green-yellow',
    name: 'New Energy, Large Vehicles',
    cn: '新能源·大型',
    bg: 'linear-gradient(180deg,#f0c419 0%,#cdebc8 100%)',
    fg: '#0b3d0b',
    sample: ['沪', 'A', 'F', '·', '1', '2', '3', '4', '5'],
    desc: 'Electric buses, trucks, taxis. Yellow-to-green gradient distinguishes them from passenger NEVs.',
    issued: 'Expanding fleet'
  },
  {
    id: 'white',
    name: 'Police or Military',
    cn: '警车 与 军车',
    bg: '#ffffff',
    fg: '#000000',
    accent: '#c8102e',
    sample: ['京', 'A', '·', '1', '2', '3', '警'],
    desc: 'Police plates end in red 警 (jǐng). Military plates use a separate format with red prefix letters denoting service branch.',
    issued: 'Restricted issue'
  },
  {
    id: 'black',
    name: 'Foreign or Embassy',
    cn: '外籍 与 使馆',
    bg: '#000000',
    fg: '#ffffff',
    sample: ['沪', 'A', '·', '1', '2', '3', '4', '5'],
    desc: 'Issued to foreign companies, embassies (黑色 + 使), and Hong Kong or Macau-registered vehicles entering the mainland.',
    issued: 'Diplomatic and foreign use'
  }
];

// Anatomy callouts for hero plate
window.ANATOMY = [
  { pos: 0, label: 'Province', cn: '省份简称', desc: 'A single Chinese character — one of 31 abbreviations for provinces, autonomous regions, and direct-controlled municipalities.' },
  { pos: 1, label: 'Issuing Authority', cn: '发牌机关', desc: 'A Latin letter (A–Z) identifying the prefecture. A is usually the provincial capital — 京A, 沪A, 粤A all mark capitals.' },
  { pos: 2, label: 'Separator', cn: '分隔符', desc: 'A raised dot · separates the regional code from the unique sequence.' },
  { pos: 3, label: 'Sequence', cn: '序号', desc: 'Five alphanumeric characters. Combinations are tightly regulated — letters O and I are forbidden to avoid confusion with 0 and 1.' },
];
