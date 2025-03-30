import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, Trash2 } from 'lucide-react';
import eventService from '@/services/event.service';
import forumService from '@/services/forum.service';
import wasteService from '@/services/waste.service';
import WasteClassifier from '@/components/waste/WasteClassifier';

const UserDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('events');

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAllEvents
  });

  const { data: posts } = useQuery({
    queryKey: ['forums'],
    queryFn: forumService.getAllPosts
  });

  const handleJoinEvent = async (eventId: string) => {
    try {
      await eventService.joinEvent(eventId);
      toast({
        title: 'Success',
        description: 'Successfully joined the event!'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      await forumService.likePost(postId);
      toast({
        title: 'Success',
        description: 'Post liked!'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Events Joined
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {events?.filter((e) => e.participants.some((p) => p._id === 'currentUserId')).length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Forum Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {posts?.filter((p) => p.author._id === 'currentUserId').length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              Waste Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forums
          </TabsTrigger>
          <TabsTrigger value="waste" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Waste
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <div className="grid gap-4">
            {events?.map((event) => (
              <Card key={event._id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {event.location.address}
                  </p>
                  <p className="text-sm text-gray-500">
                    Participants: {event.participants.length} / {event.capacity}
                  </p>
                  {!event.participants.some((p) => p._id === 'currentUserId') && (
                    <Button
                      className="mt-4"
                      onClick={() => handleJoinEvent(event._id)}
                    >
                      Join Event
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <h2 className="text-2xl font-semibold">Recent Forum Posts</h2>
          <div className="grid gap-4">
            {posts?.map((post) => (
              <Card key={post._id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Posted by: {post.author.name}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLikePost(post._id)}
                    >
                      {post.likes.includes('currentUserId') ? '❤️' : '🤍'}{' '}
                      {post.likes.length}
                    </Button>
                    <span className="text-sm text-gray-500">
                      {post.comments.length} comments
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="waste" className="space-y-4">
          <h2 className="text-2xl font-semibold">AI Waste Classification</h2>
          <WasteClassifier />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
