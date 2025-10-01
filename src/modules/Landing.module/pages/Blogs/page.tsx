import { motion } from "framer-motion";
import STARTED from "../_partial/STARTED";
import LatestCard from "../_partial/LatestCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import PageLoader from "../../../../templates/layouts/main/PageLoader";
import Pagination from "../../../../components/ui/Pagination";
import { getBlogPosts } from "../../../../store/slices/Blog.slice";
import type { TBlogPost } from "../../../../types/slices.type/blog.slice.type";
import { BlogHeaderPartial } from "./_partial/BlogHeader.partial";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

function BLOG() {
  const { error, rows, search, loading, count, tab } = useSelector(
    (state: RootState) => state.blog.blogPosts,
  );

  return (
    <div className="bg-primary-bg">
      <section className="mx-auto max-w-[1280px] space-y-4 bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10">
        {/* BLOG section start */}
        <motion.section
          className=""
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="container mx-auto">
            <motion.div
              className="flex flex-col justify-center space-y-2 text-center md:space-y-5"
              variants={itemVariants}
            >
              <motion.span
                className="font-inter bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold leading-6 text-transparent"
                variants={itemVariants}
              >
                Our Blog
              </motion.span>

              <motion.h1
                className="font-inter text-center font-medium text-[#101828] dark:text-[#101828] md:text-lg lg:text-5xl"
                variants={itemVariants}
              >
                Navigating the Path to Optimal <br />
              </motion.h1>
              <motion.h1
                className="font-inter text-center dark:text-[#101828] font-medium text-[#101828] md:text-lg lg:text-5xl"
                variants={itemVariants}
              >
                Hiring Process
              </motion.h1>

              <motion.span
                className="font-inter text-lg font-normal leading-7 text-[#475467] lg:text-xl"
                variants={itemVariants}
              >
                Explore cutting-edge developments and inspiring stories from the
                world of Koalify AI.
              </motion.span>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <BlogHeaderPartial />
          </motion.div>

          <PageLoader
            messageForEmptyData={
              tab
                ? search
                  ? `No blog found for keyword: "${search}" category: "${tab.name}"`
                  : "No blog found for category: " + tab.name
                : search
                  ? `No blog found for keyword: "${search}"`
                  : "No blog found"
            }
            loading={loading}
            data={rows}
            error={error}
          >
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={gridVariants}
            >
              {rows.map((blogPost: TBlogPost, index: number) => (
                <motion.div
                  key={blogPost.id || index}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <LatestCard
                    image={blogPost.image}
                    headingA={blogPost.category?.name}
                    headingB={blogPost.readingTime}
                    title={blogPost.title}
                    // description={blogPost.content}
                    navigatePath="/blog-post"
                  />
                </motion.div>
              ))}
            </motion.div>
          </PageLoader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Pagination
              count={count}
              idForList={tab?.id}
              getListAction={getBlogPosts}
              limit={9}
              search={search}
            />
          </motion.div>
        </motion.section>

        {/* started section start */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <STARTED />
        </motion.section>
      </section>
    </div>
  );
}
export default BLOG;
