import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  TrendingUp,
  MessageSquare,
  Star,
  Clock,
  Filter,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for community posts
const posts = [
  {
    id: 1,
    title: "Tips for reducing household plastic waste",
    author: "EcoWarrior",
    authorAvatar: "E",
    category: "Tips & Tricks",
    tags: ["plastic", "reduce", "household"],
    votes: 42,
    comments: 15,
    timeAgo: "2 hours ago",
    trending: true,
  },
  {
    id: 2,
    title: "Which waste types can be converted to energy most efficiently?",
    author: "EnergyPro",
    authorAvatar: "P",
    category: "Discussion",
    tags: ["energy", "efficiency", "conversion"],
    votes: 28,
    comments: 23,
    timeAgo: "5 hours ago",
    trending: true,
  },
  {
    id: 3,
    title: "Community cleanup event next weekend in East District",
    author: "GreenOrganizer",
    authorAvatar: "G",
    category: "Events",
    tags: ["community", "cleanup", "volunteer"],
    votes: 36,
    comments: 19,
    timeAgo: "1 day ago",
    trending: false,
  },
  {
    id: 4,
    title: "My experience with home composting - Before and After",
    author: "GardenGuru",
    authorAvatar: "G",
    category: "Success Story",
    tags: ["composting", "organic", "gardening"],
    votes: 54,
    comments: 31,
    timeAgo: "2 days ago",
    trending: true,
  },
  {
    id: 5,
    title: "Issues with recycling collection in North Zone",
    author: "ConcernedCitizen",
    authorAvatar: "C",
    category: "Issue",
    tags: ["collection", "service", "recycling"],
    votes: 17,
    comments: 42,
    timeAgo: "3 days ago",
    trending: false,
  },
  {
    id: 6,
    title: "Best practices for e-waste disposal in Pune",
    author: "TechRecycler",
    authorAvatar: "T",
    category: "Tips & Tricks",
    tags: ["e-waste", "disposal", "technology"],
    votes: 45,
    comments: 28,
    timeAgo: "4 hours ago",
    trending: true,
  },
  {
    id: 7,
    title: "Monthly recycling report - Achievements and Goals",
    author: "RecycleChampion",
    authorAvatar: "R",
    category: "Success Story",
    tags: ["report", "achievements", "goals"],
    votes: 32,
    comments: 16,
    timeAgo: "6 hours ago",
    trending: false,
  },
];

const myPosts = [
  {
    id: 101,
    title: "Starting my zero-waste journey in Pune",
    author: "You",
    authorAvatar: "Y",
    category: "Discussion",
    tags: ["zero-waste", "beginners", "lifestyle"],
    votes: 24,
    comments: 12,
    timeAgo: "1 week ago",
    trending: false,
  },
  {
    id: 102,
    title: "Tips for waste segregation in apartments",
    author: "You",
    authorAvatar: "Y",
    category: "Tips & Tricks",
    tags: ["segregation", "apartment", "community"],
    votes: 38,
    comments: 21,
    timeAgo: "2 weeks ago",
    trending: true,
  },
];

const starredPosts = [
  {
    id: 201,
    title: "Guide to composting in small spaces",
    author: "UrbanGardener",
    authorAvatar: "U",
    category: "Guide",
    tags: ["composting", "urban", "small-space"],
    votes: 56,
    comments: 34,
    timeAgo: "1 month ago",
    trending: false,
  },
  {
    id: 202,
    title: "DIY recycling projects for home",
    author: "CraftMaster",
    authorAvatar: "C",
    category: "Tips & Tricks",
    tags: ["diy", "crafts", "upcycle"],
    votes: 47,
    comments: 29,
    timeAgo: "2 weeks ago",
    trending: true,
  },
];

const CommunityForums = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allTags = [
    "plastic",
    "reduce",
    "household",
    "energy",
    "efficiency",
    "conversion",
    "community",
    "cleanup",
    "volunteer",
    "composting",
    "organic",
    "gardening",
    "collection",
    "service",
    "recycling",
  ];

  const getFilteredPosts = () => {
    let currentPosts =
      activeTab === "popular"
        ? posts
        : activeTab === "my-posts"
        ? myPosts
        : activeTab === "starred"
        ? starredPosts
        : [...posts].sort((a, b) => b.id - a.id); // Recent posts

    return selectedTags.length === 0
      ? currentPosts
      : currentPosts.filter((post) =>
          post.tags.some((tag) => selectedTags.includes(tag))
        );
  };

  const [postsData, setPostsData] = useState(
    getFilteredPosts().map((post) => ({
      ...post,
      likes: post.votes,
      dislikes: 0,
      hasLiked: false,
      hasDisliked: false,
      showComments: false,
      comments: [],
      newComment: "",
    }))
  );

  const handleLike = (postId: number) => {
    setPostsData((posts) =>
      posts.map((post) => {
        if (post.id === postId) {
          if (post.hasLiked) {
            return { ...post, likes: post.likes - 1, hasLiked: false };
          } else {
            if (post.hasDisliked) {
              return {
                ...post,
                likes: post.likes + 1,
                dislikes: post.dislikes - 1,
                hasLiked: true,
                hasDisliked: false,
              };
            }
            return { ...post, likes: post.likes + 1, hasLiked: true };
          }
        }
        return post;
      })
    );
  };

  const handleDislike = (postId: number) => {
    setPostsData((posts) =>
      posts.map((post) => {
        if (post.id === postId) {
          if (post.hasDisliked) {
            return { ...post, dislikes: post.dislikes - 1, hasDisliked: false };
          } else {
            if (post.hasLiked) {
              return {
                ...post,
                likes: post.likes - 1,
                dislikes: post.dislikes + 1,
                hasLiked: false,
                hasDisliked: true,
              };
            }
            return { ...post, dislikes: post.dislikes + 1, hasDisliked: true };
          }
        }
        return post;
      })
    );
  };

  const toggleComments = (postId: number) => {
    setPostsData((posts) =>
      posts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleCommentChange = (postId: number, value: string) => {
    setPostsData((posts) =>
      posts.map((post) =>
        post.id === postId ? { ...post, newComment: value } : post
      )
    );
  };

  const submitComment = (postId: number) => {
    setPostsData((posts) =>
      posts.map((post) => {
        if (post.id === postId && post.newComment.trim()) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                text: post.newComment,
                author: "You",
                timeAgo: "Just now",
              },
            ],
            newComment: "",
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Community Forums
          </h2>
          <p className="text-muted-foreground">
            Connect, share ideas, and solve problems together
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
          <MessageSquare className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search topics, tags, or users..."
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={cn(
                "cursor-pointer transition-colors",
                selectedTags.includes(tag)
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "hover:bg-green-50 hover:text-green-700"
              )}
              onClick={() => {
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                );
              }}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <Tabs
        defaultValue="popular"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="popular">
            <TrendingUp className="mr-2 h-4 w-4" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="mr-2 h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="starred">
            <Star className="mr-2 h-4 w-4" />
            Starred
          </TabsTrigger>
          <TabsTrigger value="my-posts">
            <MessageCircle className="mr-2 h-4 w-4" />
            My Posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-6 space-y-4">
          {getFilteredPosts().map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all hover:border-primary"
            >
              <CardContent className="p-0">
                <div className="flex items-start p-6">
                  <div className="flex flex-col items-center mr-6 space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasLiked
                          ? "text-green-600 bg-green-50"
                          : "text-muted-foreground hover:text-green-600"
                      )}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-sm">
                      {post.likes - post.dislikes}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasDisliked
                          ? "text-red-600 bg-red-50"
                          : "text-muted-foreground hover:text-red-600"
                      )}
                      onClick={() => handleDislike(post.id)}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          post.category === "Issue"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          post.category === "Tips & Tricks" &&
                            "bg-green-100 text-green-800 hover:bg-green-200",
                          post.category === "Discussion" &&
                            "bg-blue-100 text-blue-800 hover:bg-blue-200",
                          post.category === "Events" &&
                            "bg-purple-100 text-purple-800 hover:bg-purple-200",
                          post.category === "Success Story" &&
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        )}
                      >
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge
                          variant="outline"
                          className="bg-orange-100 text-orange-800 border-orange-200 text-xs"
                        >
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-medium mr-2">
                          {post.authorAvatar}
                        </div>
                        <span className="text-sm mr-2">{post.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {post.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center text-muted-foreground hover:text-green-600"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {post.comments.length}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-green-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {post.showComments && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-4">
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start space-x-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-700">
                                {comment.author[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {comment.timeAgo}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Textarea
                            placeholder="Write a comment..."
                            value={post.newComment}
                            onChange={(e) =>
                              handleCommentChange(post.id, e.target.value)
                            }
                            className="min-h-[80px]"
                          />
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => submitComment(post.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="mt-6 space-y-4">
          {getFilteredPosts().map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all hover:border-primary"
            >
              <CardContent className="p-0">
                <div className="flex items-start p-6">
                  <div className="flex flex-col items-center mr-6 space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasLiked
                          ? "text-green-600 bg-green-50"
                          : "text-muted-foreground hover:text-green-600"
                      )}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-sm">
                      {post.likes - post.dislikes}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasDisliked
                          ? "text-red-600 bg-red-50"
                          : "text-muted-foreground hover:text-red-600"
                      )}
                      onClick={() => handleDislike(post.id)}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          post.category === "Issue"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          post.category === "Tips & Tricks" &&
                            "bg-green-100 text-green-800 hover:bg-green-200",
                          post.category === "Discussion" &&
                            "bg-blue-100 text-blue-800 hover:bg-blue-200",
                          post.category === "Events" &&
                            "bg-purple-100 text-purple-800 hover:bg-purple-200",
                          post.category === "Success Story" &&
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        )}
                      >
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge
                          variant="outline"
                          className="bg-orange-100 text-orange-800 border-orange-200 text-xs"
                        >
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-medium mr-2">
                          {post.authorAvatar}
                        </div>
                        <span className="text-sm mr-2">{post.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {post.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center text-muted-foreground hover:text-green-600"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {post.comments.length}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-green-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {post.showComments && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-4">
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start space-x-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-700">
                                {comment.author[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {comment.timeAgo}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Textarea
                            placeholder="Write a comment..."
                            value={post.newComment}
                            onChange={(e) =>
                              handleCommentChange(post.id, e.target.value)
                            }
                            className="min-h-[80px]"
                          />
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => submitComment(post.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="starred" className="mt-6 space-y-4">
          {getFilteredPosts().map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all hover:border-primary"
            >
              <CardContent className="p-0">
                <div className="flex items-start p-6">
                  <div className="flex flex-col items-center mr-6 space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasLiked
                          ? "text-green-600 bg-green-50"
                          : "text-muted-foreground hover:text-green-600"
                      )}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-sm">
                      {post.likes - post.dislikes}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasDisliked
                          ? "text-red-600 bg-red-50"
                          : "text-muted-foreground hover:text-red-600"
                      )}
                      onClick={() => handleDislike(post.id)}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          post.category === "Issue"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          post.category === "Tips & Tricks" &&
                            "bg-green-100 text-green-800 hover:bg-green-200",
                          post.category === "Discussion" &&
                            "bg-blue-100 text-blue-800 hover:bg-blue-200",
                          post.category === "Events" &&
                            "bg-purple-100 text-purple-800 hover:bg-purple-200",
                          post.category === "Success Story" &&
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        )}
                      >
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge
                          variant="outline"
                          className="bg-orange-100 text-orange-800 border-orange-200 text-xs"
                        >
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-medium mr-2">
                          {post.authorAvatar}
                        </div>
                        <span className="text-sm mr-2">{post.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {post.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center text-muted-foreground hover:text-green-600"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {post.comments.length}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-green-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {post.showComments && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-4">
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start space-x-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-700">
                                {comment.author[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {comment.timeAgo}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Textarea
                            placeholder="Write a comment..."
                            value={post.newComment}
                            onChange={(e) =>
                              handleCommentChange(post.id, e.target.value)
                            }
                            className="min-h-[80px]"
                          />
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => submitComment(post.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="my-posts" className="mt-6 space-y-4">
          {getFilteredPosts().map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all hover:border-primary"
            >
              <CardContent className="p-0">
                <div className="flex items-start p-6">
                  <div className="flex flex-col items-center mr-6 space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasLiked
                          ? "text-green-600 bg-green-50"
                          : "text-muted-foreground hover:text-green-600"
                      )}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-sm">
                      {post.likes - post.dislikes}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-8 w-8",
                        post.hasDisliked
                          ? "text-red-600 bg-red-50"
                          : "text-muted-foreground hover:text-red-600"
                      )}
                      onClick={() => handleDislike(post.id)}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          post.category === "Issue"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          "text-xs",
                          post.category === "Tips & Tricks" &&
                            "bg-green-100 text-green-800 hover:bg-green-200",
                          post.category === "Discussion" &&
                            "bg-blue-100 text-blue-800 hover:bg-blue-200",
                          post.category === "Events" &&
                            "bg-purple-100 text-purple-800 hover:bg-purple-200",
                          post.category === "Success Story" &&
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        )}
                      >
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge
                          variant="outline"
                          className="bg-orange-100 text-orange-800 border-orange-200 text-xs"
                        >
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-medium mr-2">
                          {post.authorAvatar}
                        </div>
                        <span className="text-sm mr-2">{post.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {post.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center text-muted-foreground hover:text-green-600"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {post.comments.length}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-green-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {post.showComments && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-4">
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start space-x-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-700">
                                {comment.author[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {comment.timeAgo}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Textarea
                            placeholder="Write a comment..."
                            value={post.newComment}
                            onChange={(e) =>
                              handleCommentChange(post.id, e.target.value)
                            }
                            className="min-h-[80px]"
                          />
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => submitComment(post.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-4">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
};

export default CommunityForums;
