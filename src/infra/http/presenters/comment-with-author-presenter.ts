import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";

export class CommentWithAuthorPresenter {
  static toHTTP(commentWithauthor: CommentWithAuthor) {
    return {
      commentId: commentWithauthor.commentId.toString(),
      authorId: commentWithauthor.authorId.toString(),
      authorName: commentWithauthor.author,
      content: commentWithauthor.content,
      createdAt: commentWithauthor.createdAt,
      updatedAt: commentWithauthor.updatedAt
    }
  }
}
