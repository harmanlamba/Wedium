﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WediumAPI.Models
{
    public partial class WediumContext : DbContext
    {
        public WediumContext()
        {
        }

        public WediumContext(DbContextOptions<WediumContext> options) : base(options)
        {
        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<CommentLike> CommentLike { get; set; }
        public virtual DbSet<CommentType> CommentType { get; set; }
        public virtual DbSet<Favourite> Favourite { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<PostLike> PostLike { get; set; }
        public virtual DbSet<PostType> PostType { get; set; }
        public virtual DbSet<Settings> Settings { get; set; }
        public virtual DbSet<TestTable> TestTable { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<WikiArticle> WikiArticle { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:DefaultSchema", "WDM");

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.CommentId).HasColumnName("CommentID");

                entity.Property(e => e.Body)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CommentTypeId).HasColumnName("CommentTypeID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ParentCommentId).HasColumnName("ParentCommentID");

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.CommentType)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.CommentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_CommentType");

                entity.HasOne(d => d.ParentComment)
                    .WithMany(p => p.InverseParentComment)
                    .HasForeignKey(d => d.ParentCommentId)
                    .HasConstraintName("FK_Comment_Comment");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<CommentLike>(entity =>
            {
                entity.Property(e => e.CommentLikeId).HasColumnName("CommentLikeID");

                entity.Property(e => e.CommentId).HasColumnName("CommentID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Comment)
                    .WithMany(p => p.CommentLike)
                    .HasForeignKey(d => d.CommentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommentLike_Comment");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CommentLike)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommentLike_User");
            });

            modelBuilder.Entity<CommentType>(entity =>
            {
                entity.Property(e => e.CommentTypeId).HasColumnName("CommentTypeID");

                entity.Property(e => e.CommentTypeValue)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Favourite>(entity =>
            {
                entity.Property(e => e.FavouriteId).HasColumnName("FavouriteID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Favourite)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Favourite_Post");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Favourite)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Favourite_User");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.PostTypeId).HasColumnName("PostTypeID");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.WikiArticleId).HasColumnName("WikiArticleID");

                entity.HasOne(d => d.PostType)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.PostTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_PostType");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_User");

                entity.HasOne(d => d.WikiArticle)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.WikiArticleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_WikiArticle");
            });

            modelBuilder.Entity<PostLike>(entity =>
            {
                entity.Property(e => e.PostLikeId).HasColumnName("PostLikeID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostLike)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostLike_Post");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PostLike)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostLike_User");
            });

            modelBuilder.Entity<PostType>(entity =>
            {
                entity.Property(e => e.PostTypeId).HasColumnName("PostTypeID");

                entity.Property(e => e.PostTypeValue)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Settings>(entity =>
            {
                entity.Property(e => e.SettingsId).HasColumnName("SettingsID");

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TestTable>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.TestId)
                    .HasColumnName("TestID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(80);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(101);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<WikiArticle>(entity =>
            {
                entity.Property(e => e.WikiArticleId).HasColumnName("WikiArticleID");

                entity.Property(e => e.ArticleAuthor).IsRequired();

                entity.Property(e => e.ArticleBody).IsRequired();

                entity.Property(e => e.ArticleDate).HasColumnType("datetime");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasColumnName("URL")
                    .HasMaxLength(150);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
