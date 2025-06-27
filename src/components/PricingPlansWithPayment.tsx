"use client";

import PaymentButton from './PaymentButton';
import { PLANS } from '@/lib/config';

export default function PricingPlansWithPayment() {
  const plans = Object.values(PLANS);

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#22223b] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started with our AI photo blending service. Choose the plan that best fits your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-purple-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#22223b] mb-2">
                  {plan.name}
                </h3>
                                 <div className="mb-2">
                   <span className="text-4xl font-bold text-[#22223b]">
                     {plan.price === 0 ? 'Free' : `$${plan.price}`}
                   </span>
                   {plan.price > 0 && <span className="text-gray-500 ml-1">once</span>}
                 </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                               <div className="text-center mb-4">
                 <span className="text-3xl font-bold text-purple-600">
                   {plan.credits === 1 ? '1' : plan.credits}
                 </span>
                 <span className="text-gray-600 ml-2">
                   {plan.credits === 1 ? 'generation per day' : 'generations'}
                 </span>
               </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <PaymentButton plan={plan} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure payment powered by DodoPayment • One-time purchase • No subscription
          </p>
        </div>
      </div>
    </section>
  );
} 