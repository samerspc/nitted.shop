import { IProduct } from '@entities/Product/types/Product';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_CHAT_ID;

interface OrderForm {
  name: string;
  tg: string;
  phone: string;
}

export async function sendOrderRequest(
  form: OrderForm,
  cartItems: (IProduct & { selectedSize?: string })[],
): Promise<boolean> {
  const productsText = cartItems
    .map(
      (item, idx) =>
        `${idx + 1}) ${item.name} | Размер: ${item.selectedSize ?? '-'} | Цена: ${item.price}`,
    )
    .join('\n');

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const text =
    `<b>Новая заявка с сайта</b>%0A` +
    `<b>Имя:</b> ${form.name}%0A` +
    `<b>Телефон:</b> ${form.phone}%0A` +
    `<b>Telegram:</b> ${form.tg}%0A` +
    `<b>Товары:</b>%0A${productsText}%0A` +
    `<b>Итого:</b> ${total}₽`;

  const encodedText = encodeURIComponent(text);
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedText}&parse_mode=HTML`;

  try {
    console.log(text);
    const res = await fetch(url);
    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}
