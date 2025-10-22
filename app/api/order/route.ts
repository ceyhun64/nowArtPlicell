// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface BasketItem {
  id: number; // productId
  productId: number;
  name: string; // ürün adı
  totalPrice: number; // unitPrice
  unitPrice: number;
  category1?: string; // ürün kategorisi
  quantity?: number; // ürün adedi
  note?: string | null; // sepet notu
  profile?: string | null;
  width?: number | null;
  height?: number | null;
  m2?: number | null;
  device?: string | null;
}

interface Address {
  firstName?: string;
  lastName?: string;
  address: string;
  district: string;
  city: string;
  zipCode?: string;
  zip?: string;
  phone: string;
  country: string;
}

interface CreateOrderBody {
  userId: number;
  basketItems: BasketItem[];
  shippingAddress: Address;
  billingAddress: Address;
  totalPrice: number;
  paidPrice: number;
  currency?: string;
  paymentMethod?: string;
  transactionId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface UpdateOrderBody {
  orderId: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

interface BasketItem {
  id: number;
  name: string;
  price: number;
  category1?: string;
  quantity?: number;
}

interface Address {
  firstName?: string;
  lastName?: string;
  address: string;
  district: string;
  city: string;
  zipCode?: string;
  zip?: string;
  phone: string;
  country: string;
}

interface CreateOrderBody {
  userId: number;
  basketItems: BasketItem[];
  shippingAddress: Address;
  billingAddress: Address;
  totalPrice: number;
  paidPrice: number;
  currency?: string;
  paymentMethod?: string;
  transactionId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  paymentCard: any;
  buyer: any;
}

// Helper: mail gönder
const sendMail = async (
  recipients: string[],
  subject: string,
  message: string
) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-mail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipients, subject, message }),
  });
};

// POST: Yeni sipariş ve ödeme
export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderBody = await req.json();
    const {
      userId,
      basketItems,
      shippingAddress,
      billingAddress,
      totalPrice,
      paidPrice,
      currency,
      paymentMethod,
      firstName,
      lastName,
      email,
      paymentCard,
    } = body;

    console.log("api/order body:", body);

    if (!userId || !basketItems || basketItems.length === 0) {
      return NextResponse.json(
        { status: "failure", error: "Geçerli kullanıcı veya ürün yok" },
        { status: 400 }
      );
    }

    // --- Iyzipay uyumlu buyer objesi ---
    // --- Iyzipay uyumlu buyer objesi (body'den al) ---
    const buyer = {
      id: body.buyer?.id?.toString() || userId.toString(),
      name: body.buyer?.buyerName || body.buyer?.name || "",
      surname: body.buyer?.buyerSurname || body.buyer?.surname || "",
      email: body.buyer?.email || email || "",
      identityNumber: body.buyer?.identityNumber || "11111111111",
      registrationAddress: body.shippingAddress?.address || "",
      registrationDate:
        body.buyer?.registrationDate || new Date().toISOString(),
      lastLoginDate: body.buyer?.lastLoginDate || new Date().toISOString(),
      phone: body.buyer?.phone || shippingAddress.phone || "",
      city: body.buyer?.city || shippingAddress.city || "",
      country: body.buyer?.country || shippingAddress.country || "Türkiye",
      zipCode: body.buyer?.zipCode || shippingAddress.zipCode || "",
      ip: body.buyer?.ip || "127.0.0.1",
    };

    // --- Iyzipay uyumlu shipping & billing adres ---
    const shipping = {
      contactName: buyer.name,
      city: shippingAddress.city ?? "",
      country: shippingAddress.country ?? "Türkiye",
      address: shippingAddress.address ?? "",
      zipCode: shippingAddress.zip ?? shippingAddress.zipCode ?? "",
    };

    const billing = {
      contactName: buyer.name,
      city: billingAddress.city ?? "",
      country: billingAddress.country ?? "Türkiye",
      address: billingAddress.address ?? "",
      zipCode: billingAddress.zip ?? billingAddress.zipCode ?? "",
    };

    // --- Iyzipay uyumlu basketItems ---
    const basketItemsFormatted = basketItems.map((item) => ({
      id: item.id.toString(),
      name: item.name ?? "Ürün",
      category1: item.category1 ?? "Kategori",
      itemType: "PHYSICAL",
      price: Number(item.price).toFixed(2),
    }));

    // --- Iyzipay uyumlu paymentCard ---
    const paymentCardFormatted = {
      cardHolderName: paymentCard.cardHolderName,
      cardNumber: paymentCard.cardNumber,
      expireMonth: paymentCard.expireMonth,
      expireYear: paymentCard.expireYear,
      cvc: paymentCard.cvc,
    };

    // --- Iyzipay payload ---
    const paymentPayload = {
      paymentCard: paymentCardFormatted,
      buyer,
      shippingAddress: shipping,
      billingAddress: billing,
      basketItems: basketItemsFormatted,
      currency: currency ?? "TRY",
      basketId: "B" + Date.now(),
    };

    // --- Payment API çağrısı ---
    const paymentRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload),
      }
    );

    if (!paymentRes.ok) {
      const errText = await paymentRes.text();
      return NextResponse.json(
        { status: "failure", error: "Ödeme başarısız: " + errText },
        { status: 400 }
      );
    }

    const paymentResult = await paymentRes.json();

    if (!paymentResult || paymentResult.status !== "success") {
      return NextResponse.json(
        {
          status: "failure",
          error: paymentResult?.errorMessage || "Ödeme başarısız",
        },
        { status: 400 }
      );
    }

    // --- Ödeme başarılı, veritabanına kaydet ---
    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        status: "paid",
        totalPrice: Number(totalPrice),
        paidPrice: Number(paidPrice),
        currency: currency || "TRY",
        paymentMethod: paymentMethod || "iyzipay",
        transactionId: paymentResult?.paymentId || null,
        items: {
          create: basketItems.map((item) => ({
            productId: Number(item.productId),
            quantity: Number(item.quantity || 1),
            unitPrice: Number(item.unitPrice), 
            totalPrice:Number(item.totalPrice) ,
            note: item.note,
            profile: item.profile,
            width: item.width,
            height: item.height,
            m2: item.m2,
            device: item.device,
          })),
        },

        addresses: {
          create: [
            {
              type: "shipping",
              firstName: shippingAddress.firstName ?? firstName ?? "",
              lastName: shippingAddress.lastName ?? lastName ?? "",
              address: shippingAddress.address ?? "",
              district: shippingAddress.district ?? "",
              city: shippingAddress.city ?? "",
              zip: shippingAddress.zip ?? "",
              phone: shippingAddress.phone ?? "",
              country: shippingAddress.country ?? "",
            },
            {
              type: "billing",
              firstName: billingAddress.firstName ?? firstName ?? "",
              lastName: billingAddress.lastName ?? lastName ?? "",
              address: billingAddress.address ?? "",
              district: billingAddress.district ?? "",
              city: billingAddress.city ?? "",
              zip: billingAddress.zip ?? "",
              phone: billingAddress.phone ?? "",
              country: billingAddress.country ?? "",
            },
          ],
        },
      },
      include: { items: true, addresses: true },
    });

    // Mail gönderimleri
    if (email) {
      await sendMail(
        [email],
        `Order Confirmation - ${order.id}`,
        `Hello ${firstName}, your order ${order.id} is paid successfully.`
      );
    }

    await sendMail(
      ["ceyhunturkmen4@gmail.com"],
      `New Order - ${order.id}`,
      `New order placed. Order ID: ${order.id}`
    );

    return NextResponse.json({ status: "success", order, paymentResult });
  } catch (err: any) {
    console.error("Order POST Error:", err);
    return NextResponse.json(
      { status: "failure", error: err.message },
      { status: 500 }
    );
  }
}

// GET: Tüm siparişleri getirme
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
        addresses: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ status: "success", orders });
  } catch (error: any) {
    console.error("Order GET Error:", error);
    return NextResponse.json(
      { status: "failure", error: error.message },
      { status: 500 }
    );
  }
}

// PATCH: Sipariş durumunu güncelle
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const body: UpdateOrderBody = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { status: "failure", error: "orderId ve status gerekli" },
        { status: 400 }
      );
    }

    const validStatuses: UpdateOrderBody["status"][] = [
      "pending",
      "paid",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { status: "failure", error: "Geçersiz sipariş durumu" },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status },
      include: {
        items: { include: { product: true } },
        addresses: true,
        user: true,
      },
    });

    // Kullanıcı bilgilendirme maili
    if (updatedOrder.user?.email) {
      const userMessage = `Your order (ID: ${
        updatedOrder.id
      }) status is now ${updatedOrder.status.toUpperCase()}.`;
      await sendMail(
        [updatedOrder.user.email],
        `Order Update - ${updatedOrder.id}`,
        userMessage
      );
    }

    // Admin bilgilendirme maili
    const adminMessage = `Order ID: ${
      updatedOrder.id
    } status updated to ${updatedOrder.status.toUpperCase()}.`;
    await sendMail(
      ["ceyhunturkmen4@gmail.com"],
      `Order Status Update - ${updatedOrder.id}`,
      adminMessage
    );

    return NextResponse.json({ status: "success", order: updatedOrder });
  } catch (error: any) {
    console.error("Order PATCH Error:", error);
    return NextResponse.json(
      { status: "failure", error: error.message },
      { status: 500 }
    );
  }
}
