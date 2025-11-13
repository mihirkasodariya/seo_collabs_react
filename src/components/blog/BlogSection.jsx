import React, { useState, useEffect } from "react";
    import { motion } from "framer-motion";
    import { Button } from "@/components/ui/button";
    import BlogPost from "./BlogPost";
    import { ArrowRight, BookOpen, Loader2 } from "lucide-react";

    const BlogSection = () => {
      const [posts, setPosts] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchPosts = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const response = await fetch(
              "https://blog.seocollabs.com/wp-json/wp/v2/posts?per_page=3&_embed"
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            const formattedPosts = await Promise.all(data.map(async (post) => {
              let categoryName = 'General';
              if (post.categories && post.categories.length > 0) {
                try {
                    const categoryResponse = await fetch(`https://blog.seocollabs.com/wp-json/wp/v2/categories/${post.categories[0]}`);
                    if (categoryResponse.ok) {
                      const categoryData = await categoryResponse.json();
                      categoryName = categoryData.name;
                    }
                } catch (catError) {
                    console.warn("Could not fetch category name for post ID:", post.id, catError);
                }
              }

              return {
                id: post.id,
                title: post.title.rendered,
                category: categoryName,
                link: post.link,
              };
            }));
            setPosts(formattedPosts);
          } catch (err) {
            console.error("Error fetching blog posts:", err);
            setError("Failed to load blog posts. Please try again later.");
            setPosts([]); 
          } finally {
            setIsLoading(false);
          }
        };

        fetchPosts();
      }, []);

      const dummyPosts = [
        {
          id: 1,
          title: "10 Effective Link Building Strategies for 2025",
          category: "Strategy",
          link: "https://blog.seocollabs.com"
        },
        {
          id: 2,
          title: "How to Build Quality Backlinks",
          category: "Tutorial",
          link: "https://blog.seocollabs.com"
        },
        {
          id: 3,
          title: "SEO Success Stories",
          category: "Case Study",
          link: "https://blog.seocollabs.com"
        }
      ];
      
      const displayPosts = error ? dummyPosts : (posts.length > 0 ? posts : (isLoading ? [] : dummyPosts));


      return (
        <section id="blog" className="container mx-auto px-4 py-16 bg-background">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-block p-3 bg-[#e4f0ee] rounded-full text-[#077a7d] mb-4"
            >
              <BookOpen className="h-8 w-8" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Insights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest SEO strategies and link building tips from our official blog.
            </p>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {error && !isLoading && (
             <div className="text-center text-destructive mb-8">
              <p>{error}</p>
              <p className="text-sm text-muted-foreground">Displaying placeholder content.</p>
            </div>
          )}

          {!isLoading && displayPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {displayPosts.map((post) => (
                <BlogPost key={post.id} post={post} isPreview={true} />
              ))}
            </div>
          )}
          
          {!isLoading && displayPosts.length === 0 && !error && (
            <div className="text-center text-muted-foreground">
              <p>No blog posts found at the moment. Check back soon!</p>
            </div>
          )}

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-md border border-[#077A7D] hover:bg-[#85e2e2]"
              onClick={() => window.open("https://blog.seocollabs.com", "_blank")}
            >
              Visit Our Blog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      );
    };

    export default BlogSection;