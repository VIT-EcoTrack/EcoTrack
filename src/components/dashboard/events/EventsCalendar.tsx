
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  CalendarPlus, 
  Filter 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock event data
const events = [
  {
    id: 1,
    title: "Community Cleanup Day",
    description: "Join us for a day of cleaning up our local parks and streets. All equipment will be provided.",
    date: "June 20, 2024",
    time: "9:00 AM - 1:00 PM",
    location: "Central Park, Main Entrance",
    participants: 42,
    maxParticipants: 50,
    category: "volunteer",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
  },
  {
    id: 2,
    title: "Recycling Workshop",
    description: "Learn creative ways to reuse and recycle common household items. Great for families!",
    date: "June 25, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, Room 103",
    participants: 28,
    maxParticipants: 35,
    category: "workshop",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
  },
  {
    id: 3,
    title: "Waste-to-Energy Technology Seminar",
    description: "Expert presentation on the latest technologies for converting waste to renewable energy.",
    date: "July 5, 2024",
    time: "3:00 PM - 5:00 PM",
    location: "Tech Innovation Hub, Downtown",
    participants: 65,
    maxParticipants: 100,
    category: "seminar",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
  },
  {
    id: 4,
    title: "School Education Program",
    description: "Interactive session for school children on waste segregation and recycling habits.",
    date: "July 12, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Lincoln Elementary School",
    participants: 120,
    maxParticipants: 150,
    category: "education",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
  }
];

const EventsCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events & Workshops</h2>
          <p className="text-muted-foreground">Join community events and educational workshops</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Browse Events
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="myevents">My Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge 
                      className={`
                        ${event.category === 'volunteer' && 'bg-eco-500 hover:bg-eco-600'} 
                        ${event.category === 'workshop' && 'bg-energy-500 hover:bg-energy-600'} 
                        ${event.category === 'seminar' && 'bg-warning-500 hover:bg-warning-600'} 
                        ${event.category === 'education' && 'bg-energy-600 hover:bg-energy-700'}
                      `}
                    >
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.participants} of {event.maxParticipants} participants</span>
                    </div>
                    <Button 
                      size="sm" 
                      className={`
                        ${event.participants >= event.maxParticipants 
                          ? 'bg-muted text-muted-foreground hover:bg-muted' 
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'}
                      `}
                      disabled={event.participants >= event.maxParticipants}
                    >
                      {event.participants >= event.maxParticipants ? 'Full' : 'Join'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">View More Events</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="myevents">
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">You haven't joined any events yet</h3>
              <p className="text-muted-foreground mb-4">Explore upcoming events and join the ones that interest you.</p>
              <Button>Browse Events</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No past events to display</h3>
              <p className="text-muted-foreground mb-4">Past events you've attended will appear here.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsCalendar;
