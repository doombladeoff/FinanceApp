import { Ionicons } from '@expo/vector-icons';

const size = 30
export const paymentTypes = [
    {
        id: 1,
        name: 'Mobile Top-up',
        description: 'Пополнение мобильного телефона',
        icon: <Ionicons name="phone-portrait-outline" size={size} color="black"/>
    },
    {
        id: 2,
        name: 'Online Payment',
        description: 'Оплата товаров и услуг в интернете',
        icon: <Ionicons name="globe-outline" size={size} color="black"/>
    },
    {
        id: 3,
        name: 'TV Subscription',
        description: 'Оплата подписки на ТВ-услуги',
        icon: <Ionicons name="tv-outline" size={size} color="black"/>
    },
    {
        id: 4,
        name: 'Utilities',
        description: 'Оплата коммунальных услуг (электричество, вода, газ и т.д.)',
        icon: <Ionicons name="water-outline" size={size} color="black"/>
    },
    {
        id: 5,
        name: 'Groceries',
        description: 'Покупка продуктов питания',
        icon: <Ionicons name="cart-outline" size={size} color="black"/>
    },
    {
        id: 6,
        name: 'Shopping',
        description: 'Покупка одежды, обуви и других товаров',
        icon: <Ionicons name="bag-outline" size={size} color="black"/>
    },
    {
        id: 7,
        name: 'Dining',
        description: 'Оплата в ресторанах и кафе',
        icon: <Ionicons name="restaurant-outline" size={size} color="black"/>
    },
    {
        id: 8,
        name: 'Transportation',
        description: 'Оплата транспортных услуг (такси, общественный транспорт и т.д.)',
        icon: <Ionicons name="bus-outline" size={size} color="black"/>
    },
    {
        id: 9,
        name: 'Healthcare',
        description: 'Оплата медицинских услуг и лекарств',
        icon: <Ionicons name="medkit-outline" size={size} color="black"/>
    },
    {
        id: 10,
        name: 'Entertainment',
        description: 'Оплата развлекательных мероприятий (кино, концерты и т.д.)',
        icon: <Ionicons name="musical-notes-outline" size={size} color="black"/>
    },
    {
        id: 11,
        name: 'Education',
        description: 'Оплата за обучение и курсы',
        icon: <Ionicons name="school-outline" size={size} color="black"/>
    },
    {
        id: 12,
        name: 'Rent',
        description: 'Оплата аренды жилья',
        icon: <Ionicons name="home-outline" size={size} color="black"/>
    },
    {
        id: 13,
        name: 'Insurance',
        description: 'Оплата страховки',
        icon: <Ionicons name="shield-checkmark-outline" size={size} color="black"/>
    },
    {
        id: 14,
        name: 'Charity',
        description: 'Благотворительные взносы',
        icon: <Ionicons name="heart-outline" size={size} color="black"/>
    },
    {
        id: 15,
        name: 'Savings',
        description: 'Сбережения и вклады',
        icon: <Ionicons name="wallet-outline" size={size} color="black"/>
    }
];
