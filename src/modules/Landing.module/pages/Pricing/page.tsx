import FAQ from "../_partial/FAQ";
import STARTED from "../_partial/STARTED";
import PricingCard from "../_partial/PricingCard";
import PageWrapper from "../../../../components/layouts/PageWrapper/PageWrapper";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSubscriptionPlan } from "../../../../store/slices/Subcription.slice";
import { cn } from "../../../../utils/cn";
import PageLoader from "../../../../templates/layouts/main/PageLoader";
import { filterByKeyAndValue } from "../../../../utils/array.util";
import { TSubcriptionPlan } from "../../../../types/slices.type/subcription.slice.type";

function PRICING() {
  const dispatch: AppDispatch = useDispatch();
  const [planType, setPlanType] = useState("month");
  const { loading, data, error } = useSelector(
    (state: RootState) => state.subscription.subscriptionPlans,
  );

  const premiumPlanFeatures = [
    "Upload and analyse unlimited dental images per month,",
    "Interactive dashboard features for in-depth examination.",
    "Advanced dental health insights and strategic dental-care recommendations.",
    "Access to premium dental report templates via dashboard.",
    "AI-driven suggestions for dental health improvement.",
    "Priority email support for assistance.",
  ];
  useEffect(() => {
    dispatch(getSubscriptionPlan());
  }, []);
  return (
    <PageWrapper isProtectedRoute={false} name="Pricing">
      <div className="bg-[#E0E2F4] ">
        <section className="mx-auto max-w-[1280px] bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10">
          {/* pricing setion start */}
          <section className="">
            <div className="flex flex-col items-center space-y-2">
              <div className="font-inter text-center text-3xl font-medium leading-none tracking-[-0.02em] text-[#101828]">
                Pricing Plans
              </div>
              <div className="font-inter py-3 text-center text-lg font-normal leading-[30px] text-[#475467]">
                Choose a plan that fits your recruitment goals—whether you're a
                solo recruiter or a growing enterprise.
              </div>
              <div className="font-inter hover:cursor-pointer flex w-fit gap-2 items-center rounded-full border border-[#F2F4F7] bg-white px-1 py-1 text-sm font-medium text-[#667085] md:text-lg">
                <div
                  onClick={() => setPlanType("month")}
                  className={cn(
                    "font-inter rounded-full px-3",
                    planType === "month"
                      ? "bg-[#1F51E8] text-white"
                      : "text-[#1F51E8]",
                  )}
                >
                  Monthly Billing
                </div>
                <div
                  onClick={() => setPlanType("year")}
                  className={cn(
                    "font-inter hover:cursor-pointer rounded-full px-3",
                    planType === "year"
                      ? "bg-[#1F51E8] text-white"
                      : "text-[#1F51E8]",
                  )}
                >
                  Annual Billing
                </div>
              </div>
            </div>

            {/* FAQ setion start */}
            <PageLoader loading={loading} error={error} data={data}>
              <motion.section
                className="mx-auto flex flex-col gap-6 py-5 md:flex-row"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {filterByKeyAndValue({
                  arr: data,
                  key: "type",
                  value: planType,
                }).map((plan: TSubcriptionPlan) => (
                  <PricingCard
                    key={plan.id}
                    planName={plan.name}
                    price={"$" + plan.unit_amount}
                    description={plan.description}
                    buttonTextColor="text-[#FDFFFF] bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC]"
                    buttonText={"Upgrade Plan"}
                    features={premiumPlanFeatures}
                  />
                ))}
              </motion.section>
            </PageLoader>

            {/* Pricing. section ends */}
          </section>

          <FAQ />

          {/* Started section start */}
          <section>
            <STARTED />
          </section>
          {/* Started section ends */}

          {/* main secrion ends */}
        </section>
      </div>
    </PageWrapper>
  );
}
export default PRICING;
