import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "@/libs/formatter";
import { useArticleStore } from "@/stores/useArticleStore";
import { useCommentStore } from "@/stores/useCommentStore";
import { Loader } from "lucide-react";

import Textarea from "@/components/ui/Textarea";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import Button from "@/components/ui/Button";
import notFound from "@/assets/404.svg";
import { Skeleton } from "@/components/ui/Skeleton";

const ArticlePage = () => {
  const { article, loading, getArticleById } = useArticleStore();
  const {
    comments,
    loading: commentLoading,
    fetchComments,
    addComment,
    hasMore,
    page,
    total,
  } = useCommentStore();
  const { documentId } = useParams();
  const [userCommentValue, setUserCommentValue] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (documentId) getArticleById(documentId);
  }, [documentId, getArticleById]);

  useEffect(() => {
    if (article) fetchComments(article.id);
  }, [article, fetchComments]);

  /**
   * Implements infinite scroll for the comments section using the IntersectionObserver API.
   * It observes a sentinel element (a hidden div at the bottom of the comments list) and triggers `fetchComments`
   * to load the next page when the element enters the viewport, provided there are more comments to load (`hasMore`)
   * and no ongoing fetch (`commentLoading`). The observer disconnects when the component unmounts or the sentinel changes.
   */

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !commentLoading && hasMore) {
          fetchComments(article?.id ?? 0, page + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.current.observe(sentinelRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [article?.id, page, hasMore, commentLoading, fetchComments]);

  return (
    <>
      <Navbar />
      <div className=" min-h-[100vh] p-4">
        {article && !loading ? (
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="p-6 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
              <p className="text-sm text-muted-foreground">
                By{" "}
                <span className="font-semibold">{article.user.username}</span> |{" "}
                <span>{formatDate(article.publishedAt as string)}</span> |
                Category:{" "}
                <span className="italic">
                  {article.category?.name || "Unknown"}
                </span>
              </p>
            </div>

            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-full object-cover rounded-md"
            />

            <p className=" py-6">{article.description}</p>

            {/* Comments Section */}
            <div className="px-2">
              <h2 className="text-2xl font-semibold py-2 mb-2">
                {total + " Comments"}
              </h2>

              <label
                htmlFor="comment_section"
                className="block text-muted-foreground text-sm pb-4"
              >
                Leave your comment
              </label>

              <Textarea
                id="comment_section"
                onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                  setUserCommentValue(e.currentTarget.value)
                }
              />

              <div className="w-full flex justify-end mt-2">
                <Button
                  size={"sm"}
                  className="text-sm rounded-sm"
                  onClick={() =>
                    addComment({
                      data: { article: article.id, content: userCommentValue },
                    })
                  }
                  disabled={!userCommentValue.length || commentLoading}
                >
                  Send
                </Button>
              </div>

              {comments.length > 0 ? (
                <ul className="py-4">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="border-b border-border py-2"
                    >
                      <span className="text-sm text-muted-foreground">
                        {formatDate(comment.publishedAt as string)}
                      </span>

                      <p className="text-muted-foreground text-sm mb-2">
                        from:{" "}
                        <span className="text-foreground">
                          {comment.user.username}
                        </span>
                      </p>

                      <p className="text-base">{comment.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-secondary">No comments yet.</p>
              )}

              {hasMore && <div ref={sentinelRef} className="h-10" />}
              {commentLoading && <Loader className="animate-spin mx-auto" />}
            </div>
          </div>
        ) : loading ? (
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="p-6 flex flex-col items-center">
              <Skeleton className="w-1/2 h-8 mb-2" />
              <Skeleton className="w-1/4 h-6" />
            </div>
            <Skeleton className="w-full h-64 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          </div>
        ) : (
          <img
            src={notFound}
            alt="Not found"
            className="max-w-xl mx-auto h-full object-cover"
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
