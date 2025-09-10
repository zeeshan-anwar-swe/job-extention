import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LatestCard from "../../_partial/LatestCard";
import { containerVariants, itemVariants } from "./animation";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/useReduxStore";
import { getBlogPosts } from "../../../../../store/slices/LandingPage/Blog.slice";
import PageLoader from "../../../../../templates/layouts/main/PageLoader";
import { TBlogPost } from "../../../../../types/slices.type/agency/blog.slice.type";

export const CaseStudieSection = () => {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, rows, error } = useAppSelector(
    (state) => state.blog.blogPosts,
  );

  console.log({ loading, rows, error });

  useEffect(() => {
    dispatch(getBlogPosts({ page: 1, limit: 3 }));
  }, []);

  return (
    <motion.section
      className="rounded-lg bg-white/50 p-6 md:p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center"
        variants={itemVariants}
      >
        <div className="mb-6 md:mb-0">
          <h2 className="mb-2 text-2xl font-medium text-[#010314] md:text-3xl">
            Latest Case Studies
          </h2>
          <p className="text-lg text-[#010314]/50">
            Real-world examples showcasing the impact of the Solomon AI concept
            on businesses.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => navigateTo("/blogs")}
            className="flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-4 py-2 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Posts &gt;
          </motion.button>
        </div>
      </motion.div>

      <PageLoader loading={loading} data={rows} error={error}>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={containerVariants}
        >
          {rows.map((blog: TBlogPost) => (
            <motion.div variants={itemVariants}>
              <LatestCard
                image={blog.image}
                headingA={blog.category.name}
                headingB={blog.readingTime}
                title={blog.title}
                description={blog.content}
                // navigatePath='*'
              />
            </motion.div>
          ))}
        </motion.div>
      </PageLoader>
    </motion.section>
  );
};
