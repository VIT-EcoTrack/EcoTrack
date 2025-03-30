
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Recycle, 
  Lightbulb, 
  Search, 
  BookOpen, 
  ChevronRight, 
  Leaf, 
  Milestone,
  CheckCircle2
} from "lucide-react";

const guides = [
  {
    id: "g1",
    title: "Complete Guide to Plastic Recycling",
    description: "Learn about different types of plastics and proper recycling techniques",
    category: "recycling",
    tags: ["plastic", "recycling", "beginners"],
    readTime: 8,
    author: "Dr. Emma Watson",
    image: "/placeholder.svg"
  },
  {
    id: "g2",
    title: "Home Composting Made Easy",
    description: "Step-by-step guide to setting up a compost system at home",
    category: "organic",
    tags: ["compost", "organic", "garden"],
    readTime: 12,
    author: "Mark Johnson",
    image: "/placeholder.svg"
  },
  {
    id: "g3",
    title: "E-Waste Recycling: Best Practices",
    description: "How to safely dispose of electronic waste and its environmental impact",
    category: "recycling",
    tags: ["electronic", "e-waste", "hazardous"],
    readTime: 10,
    author: "Tech Sustainability Team",
    image: "/placeholder.svg"
  },
  {
    id: "g4",
    title: "Zero Waste Living: A Beginner's Guide",
    description: "Start your journey to a zero waste lifestyle with these practical tips",
    category: "lifestyle",
    tags: ["zero-waste", "lifestyle", "beginners"],
    readTime: 15,
    author: "Sarah Green",
    image: "/placeholder.svg"
  },
  {
    id: "g5",
    title: "Glass Recycling: Breaking Down the Process",
    description: "Understanding glass recycling from collection to new products",
    category: "recycling",
    tags: ["glass", "recycling", "process"],
    readTime: 7,
    author: "Michael Clark",
    image: "/placeholder.svg"
  },
  {
    id: "g6",
    title: "Waste-to-Energy: The Science Explained",
    description: "How waste materials are converted into usable energy",
    category: "energy",
    tags: ["energy", "technology", "advanced"],
    readTime: 14,
    author: "Dr. Robert Chen",
    image: "/placeholder.svg"
  },
];

const guideDetail = {
  title: "Complete Guide to Plastic Recycling",
  author: "Dr. Emma Watson",
  date: "April 15, 2023",
  readTime: 8,
  tags: ["plastic", "recycling", "beginners"],
  introduction: `Plastic pollution is one of the most pressing environmental challenges we face today. 
  By recycling plastic properly, we can significantly reduce its impact on our planet's ecosystems. 
  This comprehensive guide will walk you through everything you need to know about plastic recycling, 
  from identifying different types of plastics to preparing them for recycling.`,
  
  sections: [
    {
      title: "Understanding Plastic Types",
      content: `All plastics are labeled with a resin identification code (1-7) that indicates the type of plastic. 
      Here's what each number means:
      
      1 - PET (Polyethylene Terephthalate): Water bottles, soda bottles
      2 - HDPE (High-Density Polyethylene): Milk jugs, detergent bottles
      3 - PVC (Polyvinyl Chloride): Plumbing pipes, vinyl records
      4 - LDPE (Low-Density Polyethylene): Plastic bags, squeeze bottles
      5 - PP (Polypropylene): Yogurt containers, bottle caps
      6 - PS (Polystyrene): Foam cups, takeout containers
      7 - Other: Mixed or layered plastics
      
      Not all types are equally recyclable - 1, 2, and 5 are most commonly accepted.`
    },
    {
      title: "Preparation Steps",
      content: `Before recycling plastic items:
      
      1. Empty and rinse containers to remove food residue
      2. Remove non-plastic components like metal lids or paper labels when possible
      3. Flatten items to save space during collection
      4. Leave caps on bottles unless your local facility requires otherwise
      5. Check for local guidelines as they can vary by municipality`
    },
    {
      title: "Common Recycling Mistakes",
      content: `Avoid these common mistakes that can contaminate recycling batches:
      
      - Recycling plastic bags with regular plastics (these require special collection)
      - Including items with food residue
      - Recycling plastics with attached non-recyclable materials
      - Assuming all plastics with a number symbol are accepted locally
      - Including "biodegradable" or "compostable" plastics in recycling`
    }
  ],
  
  tips: [
    "Keep a recycling cheat sheet near your bins for quick reference",
    "Consider alternatives to single-use plastics when possible",
    "Look for products made from recycled plastic to complete the cycle",
    "Set up separate collection bins for different types of plastics",
    "Check with your local waste management for specific guidelines"
  ]
};

const RecyclingGuides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-eco-500" />
        Recycling Guides
      </h1>
      
      {!selectedGuide ? (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guides by title, description or tags..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recycling">Recycling</TabsTrigger>
                <TabsTrigger value="organic">Organic</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> {guide.readTime} min read
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {guide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{guide.author}</span>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto flex items-center gap-1"
                      onClick={() => setSelectedGuide(guide.id)}
                    >
                      Read More <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredGuides.length === 0 && (
              <div className="col-span-full text-center py-20">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No guides found</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  We couldn't find any guides matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setSelectedGuide(null)}
          >
            ← Back to Guides
          </Button>
          
          <article className="prose prose-zinc lg:prose-lg max-w-none dark:prose-invert">
            <h1 className="mb-4">{guideDetail.title}</h1>
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                <span>By {guideDetail.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Milestone className="h-4 w-4" />
                <span>Published: {guideDetail.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{guideDetail.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {guideDetail.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-muted/50">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="space-y-8">
              <p className="text-lg leading-relaxed">
                {guideDetail.introduction}
              </p>
              
              {guideDetail.sections.map((section, index) => (
                <section key={index} className="space-y-4">
                  <h2 className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-eco-500" />
                    {section.title}
                  </h2>
                  <div 
                    className="whitespace-pre-line text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
              
              <div className="bg-muted/30 p-6 rounded-lg border border-muted">
                <h3 className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-warning-500" />
                  Pro Tips
                </h3>
                <ul className="space-y-3">
                  {guideDetail.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-eco-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default RecyclingGuides;
