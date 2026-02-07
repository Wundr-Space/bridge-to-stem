import { Play, Clock } from "lucide-react";
import { useState } from "react";

const quickStats = [
  {
    text: "Students from low SES backgrounds represent only 9% of UK tech workforce",
    isProblem: true
  },
  {
    text: "Critical decision points: Ages 14-16 (GCSE options, work experience choices)",
    isProblem: true
  },
  {
    text: "40% of students changed STEM perception after working with relatable mentors",
    isProblem: false
  }
];

export function VideoExplainer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Relatability Changes Everything
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet Marvin, our founder, who explains how seeing "someone like me" transforms student career decisions
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <img
                  src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=1200&q=80"
                  alt="Diverse group of professionals and students in a STEM mentoring session"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play video"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </button>

                {/* Duration Indicator */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                  <Clock className="w-4 h-4" />
                  2:00
                </div>
              </>
            ) : (
              /* Video Embed Placeholder */
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="text-center p-8">
                  <Play className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">Video Player Placeholder</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Embed your video here (YouTube, Vimeo, etc.)</p>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Close preview
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <p className="text-center text-muted-foreground mt-4 text-sm md:text-base">
            The problem with generic STEM outreach and why diverse representation matters
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border text-center ${
                  stat.isProblem 
                    ? "bg-card border-border/50" 
                    : "bg-accent/10 border-accent/30"
                }`}
              >
                <p className={`text-sm md:text-base leading-relaxed ${
                  stat.isProblem ? "text-foreground/80" : "text-accent font-medium"
                }`}>
                  {stat.text}
                </p>
                {!stat.isProblem && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                    PILOT TARGET
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
