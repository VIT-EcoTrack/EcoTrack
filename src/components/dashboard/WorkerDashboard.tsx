import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Truck, ClipboardList } from 'lucide-react';
import eventService from '@/services/event.service';
import taskService from '@/services/task.service';

const WorkerDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('tasks');

  const { data: tasks, refetch: refetchTasks } = useQuery({
    queryKey: ['worker-tasks'],
    queryFn: taskService.getWorkerTasks
  });

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAllEvents
  });

  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    try {
      await taskService.updateTaskStatus(taskId, status);
      toast({
        title: 'Success',
        description: 'Task status updated successfully!'
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Worker Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {tasks?.filter((t) => t.status === 'in-progress').length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{events?.length || 0}</p>
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
          <h2 className="text-2xl font-semibold">My Tasks</h2>
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
                  {task.status !== 'completed' && (
                    <div className="mt-4 space-x-2">
                      {task.status === 'pending' && (
                        <Button
                          onClick={() =>
                            handleUpdateTaskStatus(task._id, 'in-progress')
                          }
                        >
                          Start Task
                        </Button>
                      )}
                      {task.status === 'in-progress' && (
                        <Button
                          onClick={() =>
                            handleUpdateTaskStatus(task._id, 'completed')
                          }
                        >
                          Complete Task
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkerDashboard;
