import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar, Users, MessageSquare, ClipboardList } from 'lucide-react';
import eventService from '@/services/event.service';
import taskService from '@/services/task.service';
import forumService from '@/services/forum.service';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('tasks');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    location: { address: '', coordinates: [0, 0] as [number, number] }
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: { address: '', coordinates: [0, 0] as [number, number] },
    capacity: 0
  });

  const { data: tasks, refetch: refetchTasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAllTasks
  });

  const { data: events, refetch: refetchEvents } = useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAllEvents
  });

  const { data: posts } = useQuery({
    queryKey: ['forums'],
    queryFn: forumService.getAllPosts
  });

  const handleCreateTask = async () => {
    try {
      await taskService.createTask(newTask);
      toast({
        title: 'Success',
        description: 'Task created successfully!'
      });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        location: { address: '', coordinates: [0, 0] }
      });
      refetchTasks();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleCreateEvent = async () => {
    try {
      await eventService.createEvent(newEvent);
      toast({
        title: 'Success',
        description: 'Event created successfully!'
      });
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: { address: '', coordinates: [0, 0] },
        capacity: 0
      });
      refetchEvents();
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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tasks?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Active Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{events?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Forum Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{posts?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Task</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Location"
                    value={newTask.location.address}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        location: { ...newTask.location, address: e.target.value }
                      })
                    }
                  />
                  <Button onClick={handleCreateTask}>Create Task</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {tasks?.map((task) => (
              <Card key={task._id}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Location: {task.location.address}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Events</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                  />
                  <Input
                    type="datetime-local"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Location"
                    value={newEvent.location.address}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        location: { ...newEvent.location, address: e.target.value }
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Capacity"
                    value={newEvent.capacity}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        capacity: parseInt(e.target.value) || 0
                      })
                    }
                  />
                  <Button onClick={handleCreateEvent}>Create Event</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
