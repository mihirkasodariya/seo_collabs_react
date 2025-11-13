import React from "react";
    import { motion } from "framer-motion";
    import { Tag, ArrowRight } from "lucide-react";
    import { Button } from "@/components/ui/button";

    const BlogPost = ({ post, isPreview = false }) => {
      return (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col ${isPreview ? 'h-full' : ''}`}
        >
          <div className="p-6 flex flex-col grow">
            <h2 className="text-xl font-semibold text-foreground mb-2 grow min-h-[3em] line-clamp-2">
              {post.title || "Untitled Post"}
            </h2>
            
            <div className="flex items-center justify-between mt-auto mb-4 pt-2">
              {post.category && (
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1 text-[#077a7d]" />
                  <span className="text-sm text-[#077a7d] font-medium">{post.category}</span>
                </div>
              )}
            </div>

            {post.link && (
              <Button 
                variant="outline" 
              className="w-full rounded-md border border-[#077A7D] hover:bg-[#85e2e2]"
                onClick={() => window.open(post.link, "_blank")}
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.article>
      );
    };

    export default BlogPost;