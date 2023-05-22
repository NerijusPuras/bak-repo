namespace Data;

using Data.Models;
using Microsoft.EntityFrameworkCore;

public class BakbeContext : DbContext
{
    public DbSet<Answer> Answers => Set<Answer>();
    public DbSet<Contribution> Contributions => Set<Contribution>();
    public DbSet<Lecture> Lectures => Set<Lecture>();
    public DbSet<Slide> Slides => Set<Slide>();
    public DbSet<Topic> Topics => Set<Topic>();
    public DbSet<LectureEntryScore> LectureEntryScores => Set<LectureEntryScore>();
    public DbSet<ContributionValidation> ContributionValidation => Set<ContributionValidation>();


    public string DbPath { get; }

    public BakbeContext()
    {
        // Will create the DB in your %localappdata% folder
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "bakbe.db");
    }

    public BakbeContext(DbContextOptions<BakbeContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}
