﻿// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Data.Migrations
{
    [DbContext(typeof(BakbeContext))]
    [Migration("20230507125158_ModifyContributions")]
    partial class ModifyContributions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.3");

            modelBuilder.Entity("Data.Models.Answer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("SlideId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SlideId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("Data.Models.Contribution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("LectureId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("SlideId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LectureId");

                    b.ToTable("Contributions");
                });

            modelBuilder.Entity("Data.Models.ContributionValidation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ContributionId")
                        .HasColumnType("TEXT");

                    b.Property<int>("ValidationResult")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("ContributionValidation");
                });

            modelBuilder.Entity("Data.Models.Lecture", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("TopicId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Lectures");
                });

            modelBuilder.Entity("Data.Models.LectureEntryScore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("CorrectAnswers")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("HasExpertBadge")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("HasKnowledgeSharingBadge")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("LectureId")
                        .HasColumnType("TEXT");

                    b.Property<string>("PlayerName")
                        .HasColumnType("TEXT");

                    b.Property<int>("TotalQuestions")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TotalScore")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("LectureEntryScores");
                });

            modelBuilder.Entity("Data.Models.Slide", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Index")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsQuestion")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("LectureId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LectureId");

                    b.ToTable("Slides");
                });

            modelBuilder.Entity("Data.Models.Topic", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Topics");
                });

            modelBuilder.Entity("Data.Models.Answer", b =>
                {
                    b.HasOne("Data.Models.Slide", null)
                        .WithMany("Answers")
                        .HasForeignKey("SlideId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.Contribution", b =>
                {
                    b.HasOne("Data.Models.Lecture", null)
                        .WithMany("Contributions")
                        .HasForeignKey("LectureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.Lecture", b =>
                {
                    b.HasOne("Data.Models.Topic", null)
                        .WithMany("Lectures")
                        .HasForeignKey("TopicId");
                });

            modelBuilder.Entity("Data.Models.Slide", b =>
                {
                    b.HasOne("Data.Models.Lecture", null)
                        .WithMany("Slides")
                        .HasForeignKey("LectureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.Lecture", b =>
                {
                    b.Navigation("Contributions");

                    b.Navigation("Slides");
                });

            modelBuilder.Entity("Data.Models.Slide", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("Data.Models.Topic", b =>
                {
                    b.Navigation("Lectures");
                });
#pragma warning restore 612, 618
        }
    }
}