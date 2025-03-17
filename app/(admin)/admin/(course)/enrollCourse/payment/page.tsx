'use client'

import CheckoutPage from "@/components/payments/CheckoutPage";
import convertToSubcurrency from "@/utils/convertCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {

    const searchParams = useSearchParams();

    // Extract query parameters
    const amount = Number(searchParams.get("amount")) || 0;
    const date = searchParams.get("date") || "";
    const studentId = searchParams.get("studentId") || "";
    const courseId = searchParams.get("courseId") || "";

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
        <h2 className="text-2xl">
          has requested <span className="font-bold"> ${amount}</span>
        </h2>
        <p>Student ID: {studentId}</p>
        <p>Course ID: {courseId}</p>
        <p>Start Date: {date}</p>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "thb",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
  </main>)
}