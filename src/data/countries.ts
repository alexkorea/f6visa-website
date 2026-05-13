// Country metadata. Names per locale.
// Reference: i18n-iso-countries / Wikipedia ISO 3166 patterns.

export type CountrySlug = string;
export type Region =
  | '동북아시아' | '동남아시아' | '남아시아' | '중앙아시아'
  | '서유럽' | '북유럽' | '중동유럽' | '북미' | '중남미'
  | '오세아니아' | '중동' | '아프리카';

export interface Country {
  slug: CountrySlug;
  iso2: string;
  flag: string;
  region: Region;
  name: { ko: string; vi: string; th: string; ru: string; en: string };
  difficulty?: '상' | '중' | '하';
  avgDays?: number;
}

export const countries: Country[] = [
  { slug: 'vietnam',     iso2: 'VN', flag: '🇻🇳', region: '동남아시아', name: { ko: '베트남', vi: 'Việt Nam', th: 'เวียดนาม', ru: 'Вьетнам', en: 'Vietnam' }, difficulty: '상', avgDays: 90 },
  { slug: 'thailand',    iso2: 'TH', flag: '🇹🇭', region: '동남아시아', name: { ko: '태국', vi: 'Thái Lan', th: 'ไทย', ru: 'Таиланд', en: 'Thailand' }, difficulty: '중', avgDays: 75 },
  { slug: 'philippines', iso2: 'PH', flag: '🇵🇭', region: '동남아시아', name: { ko: '필리핀', vi: 'Philippines', th: 'ฟิลิปปินส์', ru: 'Филиппины', en: 'Philippines' }, difficulty: '상', avgDays: 120 },
  { slug: 'cambodia',    iso2: 'KH', flag: '🇰🇭', region: '동남아시아', name: { ko: '캄보디아', vi: 'Campuchia', th: 'กัมพูชา', ru: 'Камбоджа', en: 'Cambodia' }, difficulty: '중', avgDays: 90 },
  { slug: 'indonesia',   iso2: 'ID', flag: '🇮🇩', region: '동남아시아', name: { ko: '인도네시아', vi: 'Indonesia', th: 'อินโดนีเซีย', ru: 'Индонезия', en: 'Indonesia' }, difficulty: '중', avgDays: 90 },
  { slug: 'myanmar',     iso2: 'MM', flag: '🇲🇲', region: '동남아시아', name: { ko: '미얀마', vi: 'Myanmar', th: 'เมียนมา', ru: 'Мьянма', en: 'Myanmar' }, difficulty: '상', avgDays: 120 },
  { slug: 'laos',        iso2: 'LA', flag: '🇱🇦', region: '동남아시아', name: { ko: '라오스', vi: 'Lào', th: 'ลาว', ru: 'Лаос', en: 'Laos' }, difficulty: '중', avgDays: 90 },
  { slug: 'malaysia',    iso2: 'MY', flag: '🇲🇾', region: '동남아시아', name: { ko: '말레이시아', vi: 'Malaysia', th: 'มาเลเซีย', ru: 'Малайзия', en: 'Malaysia' }, difficulty: '중', avgDays: 75 },
  { slug: 'singapore',   iso2: 'SG', flag: '🇸🇬', region: '동남아시아', name: { ko: '싱가포르', vi: 'Singapore', th: 'สิงคโปร์', ru: 'Сингапур', en: 'Singapore' }, difficulty: '하', avgDays: 60 },

  { slug: 'japan',       iso2: 'JP', flag: '🇯🇵', region: '동북아시아', name: { ko: '일본', vi: 'Nhật Bản', th: 'ญี่ปุ่น', ru: 'Япония', en: 'Japan' }, difficulty: '하', avgDays: 60 },
  { slug: 'china',       iso2: 'CN', flag: '🇨🇳', region: '동북아시아', name: { ko: '중국', vi: 'Trung Quốc', th: 'จีน', ru: 'Китай', en: 'China' }, difficulty: '중', avgDays: 75 },
  { slug: 'taiwan',      iso2: 'TW', flag: '🇹🇼', region: '동북아시아', name: { ko: '대만', vi: 'Đài Loan', th: 'ไต้หวัน', ru: 'Тайвань', en: 'Taiwan' }, difficulty: '하', avgDays: 60 },
  { slug: 'hongkong',    iso2: 'HK', flag: '🇭🇰', region: '동북아시아', name: { ko: '홍콩', vi: 'Hồng Kông', th: 'ฮ่องกง', ru: 'Гонконг', en: 'Hong Kong' }, difficulty: '하', avgDays: 60 },
  { slug: 'mongolia',    iso2: 'MN', flag: '🇲🇳', region: '동북아시아', name: { ko: '몽골', vi: 'Mông Cổ', th: 'มองโกเลีย', ru: 'Монголия', en: 'Mongolia' }, difficulty: '중', avgDays: 75 },

  { slug: 'nepal',       iso2: 'NP', flag: '🇳🇵', region: '남아시아', name: { ko: '네팔', vi: 'Nepal', th: 'เนปาล', ru: 'Непал', en: 'Nepal' }, difficulty: '상', avgDays: 120 },
  { slug: 'pakistan',    iso2: 'PK', flag: '🇵🇰', region: '남아시아', name: { ko: '파키스탄', vi: 'Pakistan', th: 'ปากีสถาน', ru: 'Пакистан', en: 'Pakistan' }, difficulty: '상', avgDays: 120 },
  { slug: 'india',       iso2: 'IN', flag: '🇮🇳', region: '남아시아', name: { ko: '인도', vi: 'Ấn Độ', th: 'อินเดีย', ru: 'Индия', en: 'India' }, difficulty: '중', avgDays: 90 },
  { slug: 'bangladesh',  iso2: 'BD', flag: '🇧🇩', region: '남아시아', name: { ko: '방글라데시', vi: 'Bangladesh', th: 'บังกลาเทศ', ru: 'Бангладеш', en: 'Bangladesh' }, difficulty: '상', avgDays: 120 },
  { slug: 'srilanka',    iso2: 'LK', flag: '🇱🇰', region: '남아시아', name: { ko: '스리랑카', vi: 'Sri Lanka', th: 'ศรีลังกา', ru: 'Шри-Ланка', en: 'Sri Lanka' }, difficulty: '중', avgDays: 90 },

  { slug: 'russia',      iso2: 'RU', flag: '🇷🇺', region: '중앙아시아', name: { ko: '러시아', vi: 'Nga', th: 'รัสเซีย', ru: 'Россия', en: 'Russia' }, difficulty: '중', avgDays: 75 },
  { slug: 'uzbekistan',  iso2: 'UZ', flag: '🇺🇿', region: '중앙아시아', name: { ko: '우즈베키스탄', vi: 'Uzbekistan', th: 'อุซเบกิสถาน', ru: 'Узбекистан', en: 'Uzbekistan' }, difficulty: '중', avgDays: 90 },
  { slug: 'kazakhstan',  iso2: 'KZ', flag: '🇰🇿', region: '중앙아시아', name: { ko: '카자흐스탄', vi: 'Kazakhstan', th: 'คาซัคสถาน', ru: 'Казахстан', en: 'Kazakhstan' }, difficulty: '중', avgDays: 90 },
  { slug: 'kyrgyzstan',  iso2: 'KG', flag: '🇰🇬', region: '중앙아시아', name: { ko: '키르기스스탄', vi: 'Kyrgyzstan', th: 'คีร์กีซสถาน', ru: 'Кыргызстан', en: 'Kyrgyzstan' }, difficulty: '중', avgDays: 90 },
  { slug: 'tajikistan',  iso2: 'TJ', flag: '🇹🇯', region: '중앙아시아', name: { ko: '타지키스탄', vi: 'Tajikistan', th: 'ทาจิกิสถาน', ru: 'Таджикистан', en: 'Tajikistan' }, difficulty: '중', avgDays: 90 },
  { slug: 'turkmenistan',iso2: 'TM', flag: '🇹🇲', region: '중앙아시아', name: { ko: '투르크메니스탄', vi: 'Turkmenistan', th: 'เติร์กเมนิสถาน', ru: 'Туркменистан', en: 'Turkmenistan' }, difficulty: '상', avgDays: 120 },
  { slug: 'azerbaijan',  iso2: 'AZ', flag: '🇦🇿', region: '중앙아시아', name: { ko: '아제르바이잔', vi: 'Azerbaijan', th: 'อาเซอร์ไบจาน', ru: 'Азербайджан', en: 'Azerbaijan' }, difficulty: '중', avgDays: 90 },
  { slug: 'belarus',     iso2: 'BY', flag: '🇧🇾', region: '중앙아시아', name: { ko: '벨라루스', vi: 'Belarus', th: 'เบลารุส', ru: 'Беларусь', en: 'Belarus' }, difficulty: '중', avgDays: 90 },
  { slug: 'ukraine',     iso2: 'UA', flag: '🇺🇦', region: '중앙아시아', name: { ko: '우크라이나', vi: 'Ukraine', th: 'ยูเครน', ru: 'Украина', en: 'Ukraine' }, difficulty: '중', avgDays: 90 },

  { slug: 'uk',          iso2: 'GB', flag: '🇬🇧', region: '서유럽', name: { ko: '영국', vi: 'Vương quốc Anh', th: 'สหราชอาณาจักร', ru: 'Великобритания', en: 'United Kingdom' }, difficulty: '하', avgDays: 60 },
  { slug: 'france',      iso2: 'FR', flag: '🇫🇷', region: '서유럽', name: { ko: '프랑스', vi: 'Pháp', th: 'ฝรั่งเศส', ru: 'Франция', en: 'France' }, difficulty: '하', avgDays: 60 },
  { slug: 'germany',     iso2: 'DE', flag: '🇩🇪', region: '서유럽', name: { ko: '독일', vi: 'Đức', th: 'เยอรมนี', ru: 'Германия', en: 'Germany' }, difficulty: '하', avgDays: 60 },
  { slug: 'italy',       iso2: 'IT', flag: '🇮🇹', region: '서유럽', name: { ko: '이탈리아', vi: 'Ý', th: 'อิตาลี', ru: 'Италия', en: 'Italy' }, difficulty: '하', avgDays: 60 },
  { slug: 'spain',       iso2: 'ES', flag: '🇪🇸', region: '서유럽', name: { ko: '스페인', vi: 'Tây Ban Nha', th: 'สเปน', ru: 'Испания', en: 'Spain' }, difficulty: '하', avgDays: 60 },
  { slug: 'netherlands', iso2: 'NL', flag: '🇳🇱', region: '서유럽', name: { ko: '네덜란드', vi: 'Hà Lan', th: 'เนเธอร์แลนด์', ru: 'Нидерланды', en: 'Netherlands' }, difficulty: '하', avgDays: 60 },
  { slug: 'belgium',     iso2: 'BE', flag: '🇧🇪', region: '서유럽', name: { ko: '벨기에', vi: 'Bỉ', th: 'เบลเยียม', ru: 'Бельгия', en: 'Belgium' }, difficulty: '하', avgDays: 60 },
  { slug: 'switzerland', iso2: 'CH', flag: '🇨🇭', region: '서유럽', name: { ko: '스위스', vi: 'Thụy Sĩ', th: 'สวิตเซอร์แลนด์', ru: 'Швейцария', en: 'Switzerland' }, difficulty: '하', avgDays: 60 },
  { slug: 'austria',     iso2: 'AT', flag: '🇦🇹', region: '서유럽', name: { ko: '오스트리아', vi: 'Áo', th: 'ออสเตรีย', ru: 'Австрия', en: 'Austria' }, difficulty: '하', avgDays: 60 },
  { slug: 'portugal',    iso2: 'PT', flag: '🇵🇹', region: '서유럽', name: { ko: '포르투갈', vi: 'Bồ Đào Nha', th: 'โปรตุเกส', ru: 'Португалия', en: 'Portugal' }, difficulty: '하', avgDays: 60 },

  { slug: 'norway',      iso2: 'NO', flag: '🇳🇴', region: '북유럽', name: { ko: '노르웨이', vi: 'Na Uy', th: 'นอร์เวย์', ru: 'Норвегия', en: 'Norway' }, difficulty: '하', avgDays: 60 },
  { slug: 'sweden',      iso2: 'SE', flag: '🇸🇪', region: '북유럽', name: { ko: '스웨덴', vi: 'Thụy Điển', th: 'สวีเดน', ru: 'Швеция', en: 'Sweden' }, difficulty: '하', avgDays: 60 },
  { slug: 'denmark',     iso2: 'DK', flag: '🇩🇰', region: '북유럽', name: { ko: '덴마크', vi: 'Đan Mạch', th: 'เดนมาร์ก', ru: 'Дания', en: 'Denmark' }, difficulty: '하', avgDays: 60 },

  { slug: 'poland',      iso2: 'PL', flag: '🇵🇱', region: '중동유럽', name: { ko: '폴란드', vi: 'Ba Lan', th: 'โปแลนด์', ru: 'Польша', en: 'Poland' }, difficulty: '중', avgDays: 75 },
  { slug: 'hungary',     iso2: 'HU', flag: '🇭🇺', region: '중동유럽', name: { ko: '헝가리', vi: 'Hungary', th: 'ฮังการี', ru: 'Венгрия', en: 'Hungary' }, difficulty: '중', avgDays: 75 },
  { slug: 'czech',       iso2: 'CZ', flag: '🇨🇿', region: '중동유럽', name: { ko: '체코', vi: 'Séc', th: 'เช็ก', ru: 'Чехия', en: 'Czech Republic' }, difficulty: '중', avgDays: 75 },
  { slug: 'croatia',     iso2: 'HR', flag: '🇭🇷', region: '중동유럽', name: { ko: '크로아티아', vi: 'Croatia', th: 'โครเอเชีย', ru: 'Хорватия', en: 'Croatia' }, difficulty: '중', avgDays: 75 },
  { slug: 'greece',      iso2: 'GR', flag: '🇬🇷', region: '중동유럽', name: { ko: '그리스', vi: 'Hy Lạp', th: 'กรีซ', ru: 'Греция', en: 'Greece' }, difficulty: '중', avgDays: 75 },
  { slug: 'turkey',      iso2: 'TR', flag: '🇹🇷', region: '중동유럽', name: { ko: '터키', vi: 'Thổ Nhĩ Kỳ', th: 'ตุรกี', ru: 'Турция', en: 'Türkiye' }, difficulty: '중', avgDays: 75 },

  { slug: 'usa',         iso2: 'US', flag: '🇺🇸', region: '북미', name: { ko: '미국', vi: 'Hoa Kỳ', th: 'สหรัฐอเมริกา', ru: 'США', en: 'United States' }, difficulty: '중', avgDays: 75 },
  { slug: 'canada',      iso2: 'CA', flag: '🇨🇦', region: '북미', name: { ko: '캐나다', vi: 'Canada', th: 'แคนาดา', ru: 'Канада', en: 'Canada' }, difficulty: '중', avgDays: 75 },

  { slug: 'mexico',      iso2: 'MX', flag: '🇲🇽', region: '중남미', name: { ko: '멕시코', vi: 'Mexico', th: 'เม็กซิโก', ru: 'Мексика', en: 'Mexico' }, difficulty: '중', avgDays: 90 },
  { slug: 'brazil',      iso2: 'BR', flag: '🇧🇷', region: '중남미', name: { ko: '브라질', vi: 'Brazil', th: 'บราซิล', ru: 'Бразилия', en: 'Brazil' }, difficulty: '중', avgDays: 90 },
  { slug: 'argentina',   iso2: 'AR', flag: '🇦🇷', region: '중남미', name: { ko: '아르헨티나', vi: 'Argentina', th: 'อาร์เจนตินา', ru: 'Аргентина', en: 'Argentina' }, difficulty: '중', avgDays: 90 },
  { slug: 'colombia',    iso2: 'CO', flag: '🇨🇴', region: '중남미', name: { ko: '콜롬비아', vi: 'Colombia', th: 'โคลอมเบีย', ru: 'Колумбия', en: 'Colombia' }, difficulty: '중', avgDays: 90 },
  { slug: 'chile',       iso2: 'CL', flag: '🇨🇱', region: '중남미', name: { ko: '칠레', vi: 'Chile', th: 'ชิลี', ru: 'Чили', en: 'Chile' }, difficulty: '중', avgDays: 90 },
  { slug: 'uruguay',     iso2: 'UY', flag: '🇺🇾', region: '중남미', name: { ko: '우루과이', vi: 'Uruguay', th: 'อุรุกวัย', ru: 'Уругвай', en: 'Uruguay' }, difficulty: '중', avgDays: 90 },
  { slug: 'paraguay',    iso2: 'PY', flag: '🇵🇾', region: '중남미', name: { ko: '파라과이', vi: 'Paraguay', th: 'ปารากวัย', ru: 'Парагвай', en: 'Paraguay' }, difficulty: '중', avgDays: 90 },
  { slug: 'ecuador',     iso2: 'EC', flag: '🇪🇨', region: '중남미', name: { ko: '에콰도르', vi: 'Ecuador', th: 'เอกวาดอร์', ru: 'Эквадор', en: 'Ecuador' }, difficulty: '중', avgDays: 90 },
  { slug: 'cuba',        iso2: 'CU', flag: '🇨🇺', region: '중남미', name: { ko: '쿠바', vi: 'Cuba', th: 'คิวบา', ru: 'Куба', en: 'Cuba' }, difficulty: '상', avgDays: 120 },
  { slug: 'dominican',   iso2: 'DO', flag: '🇩🇴', region: '중남미', name: { ko: '도미니카공화국', vi: 'Cộng hòa Dominica', th: 'สาธารณรัฐโดมินิกัน', ru: 'Доминиканская Республика', en: 'Dominican Republic' }, difficulty: '중', avgDays: 90 },
  { slug: 'venezuela',   iso2: 'VE', flag: '🇻🇪', region: '중남미', name: { ko: '베네수엘라', vi: 'Venezuela', th: 'เวเนซุเอลา', ru: 'Венесуэла', en: 'Venezuela' }, difficulty: '상', avgDays: 120 },
  { slug: 'costarica',   iso2: 'CR', flag: '🇨🇷', region: '중남미', name: { ko: '코스타리카', vi: 'Costa Rica', th: 'คอสตาริกา', ru: 'Коста-Рика', en: 'Costa Rica' }, difficulty: '중', avgDays: 90 },
  { slug: 'peru',        iso2: 'PE', flag: '🇵🇪', region: '중남미', name: { ko: '페루', vi: 'Peru', th: 'เปรู', ru: 'Перу', en: 'Peru' }, difficulty: '중', avgDays: 90 },
  { slug: 'guatemala',   iso2: 'GT', flag: '🇬🇹', region: '중남미', name: { ko: '과테말라', vi: 'Guatemala', th: 'กัวเตมาลา', ru: 'Гватемала', en: 'Guatemala' }, difficulty: '중', avgDays: 90 },

  { slug: 'australia',   iso2: 'AU', flag: '🇦🇺', region: '오세아니아', name: { ko: '호주', vi: 'Úc', th: 'ออสเตรเลีย', ru: 'Австралия', en: 'Australia' }, difficulty: '하', avgDays: 60 },
  { slug: 'newzealand',  iso2: 'NZ', flag: '🇳🇿', region: '오세아니아', name: { ko: '뉴질랜드', vi: 'New Zealand', th: 'นิวซีแลนด์', ru: 'Новая Зеландия', en: 'New Zealand' }, difficulty: '하', avgDays: 60 },

  { slug: 'uae',         iso2: 'AE', flag: '🇦🇪', region: '중동', name: { ko: 'UAE', vi: 'UAE', th: 'ยูเออี', ru: 'ОАЭ', en: 'United Arab Emirates' }, difficulty: '상', avgDays: 120 },
  { slug: 'iran',        iso2: 'IR', flag: '🇮🇷', region: '중동', name: { ko: '이란', vi: 'Iran', th: 'อิหร่าน', ru: 'Иран', en: 'Iran' }, difficulty: '상', avgDays: 120 },
  { slug: 'saudi',       iso2: 'SA', flag: '🇸🇦', region: '중동', name: { ko: '사우디아라비아', vi: 'Ả Rập Xê Út', th: 'ซาอุดีอาระเบีย', ru: 'Саудовская Аравия', en: 'Saudi Arabia' }, difficulty: '상', avgDays: 120 },
  { slug: 'kuwait',      iso2: 'KW', flag: '🇰🇼', region: '중동', name: { ko: '쿠웨이트', vi: 'Kuwait', th: 'คูเวต', ru: 'Кувейт', en: 'Kuwait' }, difficulty: '상', avgDays: 120 },
  { slug: 'israel',      iso2: 'IL', flag: '🇮🇱', region: '중동', name: { ko: '이스라엘', vi: 'Israel', th: 'อิสราเอล', ru: 'Израиль', en: 'Israel' }, difficulty: '중', avgDays: 90 },
  { slug: 'iraq',        iso2: 'IQ', flag: '🇮🇶', region: '중동', name: { ko: '이라크', vi: 'Iraq', th: 'อิรัก', ru: 'Ирак', en: 'Iraq' }, difficulty: '상', avgDays: 150 },
  { slug: 'syria',       iso2: 'SY', flag: '🇸🇾', region: '중동', name: { ko: '시리아', vi: 'Syria', th: 'ซีเรีย', ru: 'Сирия', en: 'Syria' }, difficulty: '상', avgDays: 150 },
  { slug: 'oman',        iso2: 'OM', flag: '🇴🇲', region: '중동', name: { ko: '오만', vi: 'Oman', th: 'โอมาน', ru: 'Оман', en: 'Oman' }, difficulty: '상', avgDays: 120 },
  { slug: 'yemen',       iso2: 'YE', flag: '🇾🇪', region: '중동', name: { ko: '예멘', vi: 'Yemen', th: 'เยเมน', ru: 'Йемен', en: 'Yemen' }, difficulty: '상', avgDays: 150 },
  { slug: 'jordan',      iso2: 'JO', flag: '🇯🇴', region: '중동', name: { ko: '요르단', vi: 'Jordan', th: 'จอร์แดน', ru: 'Иордания', en: 'Jordan' }, difficulty: '상', avgDays: 120 },
  { slug: 'qatar',       iso2: 'QA', flag: '🇶🇦', region: '중동', name: { ko: '카타르', vi: 'Qatar', th: 'กาตาร์', ru: 'Катар', en: 'Qatar' }, difficulty: '상', avgDays: 120 },

  { slug: 'tunisia',     iso2: 'TN', flag: '🇹🇳', region: '아프리카', name: { ko: '튀니지', vi: 'Tunisia', th: 'ตูนิเซีย', ru: 'Тунис', en: 'Tunisia' }, difficulty: '상', avgDays: 120 },
  { slug: 'ghana',       iso2: 'GH', flag: '🇬🇭', region: '아프리카', name: { ko: '가나', vi: 'Ghana', th: 'กานา', ru: 'Гана', en: 'Ghana' }, difficulty: '상', avgDays: 120 },
  { slug: 'senegal',     iso2: 'SN', flag: '🇸🇳', region: '아프리카', name: { ko: '세네갈', vi: 'Senegal', th: 'เซเนกัล', ru: 'Сенегал', en: 'Senegal' }, difficulty: '상', avgDays: 120 },
  { slug: 'congo',       iso2: 'CD', flag: '🇨🇩', region: '아프리카', name: { ko: '콩고민주공화국', vi: 'Cộng hòa Dân chủ Congo', th: 'สาธารณรัฐประชาธิปไตยคองโก', ru: 'ДР Конго', en: 'DR Congo' }, difficulty: '상', avgDays: 150 },
  { slug: 'cameroon',    iso2: 'CM', flag: '🇨🇲', region: '아프리카', name: { ko: '카메룬', vi: 'Cameroon', th: 'แคเมอรูน', ru: 'Камерун', en: 'Cameroon' }, difficulty: '상', avgDays: 120 },
  { slug: 'kenya',       iso2: 'KE', flag: '🇰🇪', region: '아프리카', name: { ko: '케냐', vi: 'Kenya', th: 'เคนยา', ru: 'Кения', en: 'Kenya' }, difficulty: '상', avgDays: 120 },
  { slug: 'southafrica', iso2: 'ZA', flag: '🇿🇦', region: '아프리카', name: { ko: '남아프리카공화국', vi: 'Nam Phi', th: 'แอฟริกาใต้', ru: 'ЮАР', en: 'South Africa' }, difficulty: '중', avgDays: 90 },
  { slug: 'nigeria',     iso2: 'NG', flag: '🇳🇬', region: '아프리카', name: { ko: '나이지리아', vi: 'Nigeria', th: 'ไนจีเรีย', ru: 'Нигерия', en: 'Nigeria' }, difficulty: '상', avgDays: 150 },
  { slug: 'morocco',     iso2: 'MA', flag: '🇲🇦', region: '아프리카', name: { ko: '모로코', vi: 'Maroc', th: 'โมร็อกโก', ru: 'Марокко', en: 'Morocco' }, difficulty: '중', avgDays: 90 },
  { slug: 'egypt',       iso2: 'EG', flag: '🇪🇬', region: '아프리카', name: { ko: '이집트', vi: 'Ai Cập', th: 'อียิปต์', ru: 'Египет', en: 'Egypt' }, difficulty: '중', avgDays: 90 },
  { slug: 'algeria',     iso2: 'DZ', flag: '🇩🇿', region: '아프리카', name: { ko: '알제리', vi: 'Algérie', th: 'แอลจีเรีย', ru: 'Алжир', en: 'Algeria' }, difficulty: '중', avgDays: 90 },
];

export const FEATURED_SLUGS = ['vietnam','thailand','philippines','china','japan','russia','uzbekistan','usa'];

export const REGIONS: Region[] = [
  '동북아시아','동남아시아','남아시아','중앙아시아',
  '서유럽','북유럽','중동유럽','북미','중남미','오세아니아','중동','아프리카'
];

export function findCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug);
}

export function findCountryByKorean(ko: string): Country | undefined {
  return countries.find(c => c.name.ko === ko);
}
