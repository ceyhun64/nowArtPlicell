// pages/api/payment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Iyzipay from "iyzipay";

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || "",
  secretKey: process.env.IYZICO_SECRET_KEY || "",
  uri: process.env.IYZICO_BASE_URL || "",
});

// Tarihleri Iyzipay formatına çeviren fonksiyon
function formatDateForIyzipay(date: string | Date): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

// Tipler
interface PaymentCard {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
}

interface Buyer {
  id: string;
  name: string;
  surname: string;
  email: string;
  identityNumber: string;
  registrationDate: string;
  lastLoginDate: string;
  phone: string;
  city: string;
  country: string;
  zipCode: string;
  ip: string;
}

interface Address {
  contactName: string;
  city: string;
  country: string;
  address: string;
  zipCode: string;
}

interface BasketItem {
  id: string | number;
  name?: string;
  category1?: string;
  itemType?: string;
  price: number | string;
}

interface PaymentRequestBody {
  paymentCard: PaymentCard;
  buyer: Buyer;
  shippingAddress: Address;
  billingAddress: Address;
  basketItems: BasketItem[];
  currency?: string;
  basketId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", error: "Method not allowed" });
  }

  try {
    const {
      paymentCard,
      buyer,
      shippingAddress,
      billingAddress,
      basketItems,
      currency,
      basketId,
    } = req.body as PaymentRequestBody;

    console.log("api/payment body:", req.body);

    // Tarihleri Iyzipay formatına çevir
    const formattedBuyer: Buyer = {
      ...buyer,
      registrationDate: formatDateForIyzipay(buyer.registrationDate),
      lastLoginDate: formatDateForIyzipay(buyer.lastLoginDate),
    };

    // basketItems toplamını hesapla
    const basketTotal = basketItems
      .reduce((sum, item) => sum + parseFloat(item.price.toString()), 0)
      .toFixed(2);

    // Ödeme isteği oluştur
    const paymentRequest = {
      locale: "tr",
      conversationId: Date.now().toString(),
      price: basketTotal,
      paidPrice: basketTotal,
      currency: currency || "TRY",
      basketId: basketId || "B" + Date.now(),
      paymentChannel: "WEB",
      paymentCard: {
        cardHolderName: paymentCard.cardHolderName,
        cardNumber: paymentCard.cardNumber,
        expireMonth: paymentCard.expireMonth,
        expireYear: paymentCard.expireYear,
        cvc: paymentCard.cvc,
        registerCard: 0,
      },
      buyer: formattedBuyer,
      shippingAddress: { ...shippingAddress },
      billingAddress: { ...billingAddress },
      basketItems: basketItems.map((item) => ({
        id: item.id.toString(),
        name: item.name || "Ürün",
        category1: item.category1 || "Kategori",
        itemType: item.itemType || "PHYSICAL",
        price: parseFloat(item.price.toString()).toFixed(2),
      })),
    };

    // Iyzipay ödeme oluşturma
    iyzipay.payment.create(paymentRequest, function (err:any, result:any) {
      if (err) {
        console.error("Iyzico Error:", err);
        return res.status(500).json({ status: "error", error: err.message });
      } else {
        return res.status(200).json(result);
      }
    });
  } catch (error: any) {
    console.error("Payment API Error:", error);
    return res.status(500).json({ status: "error", error: error.message });
  }
}
