
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Recycle, Save, ArrowRight } from "lucide-react";

const wasteTypes = [
  { value: "plastic", label: "Plastic" },
  { value: "glass", label: "Glass" },
  { value: "paper", label: "Paper" },
  { value: "metal", label: "Metal" },
  { value: "organic", label: "Organic" },
  { value: "electronic", label: "Electronic" },
  { value: "hazardous", label: "Hazardous" },
  { value: "mixed", label: "Mixed" },
];

const DataEntry = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    collectionDate: "",
    wasteType: "",
    quantity: "",
    location: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 25;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsSubmitting(false);
        setProgress(0);
        
        // Show success message
        toast({
          title: "Data submitted successfully",
          description: "Waste data has been recorded in the system.",
        });
        
        // Reset form
        setFormData({
          collectionDate: "",
          wasteType: "",
          quantity: "",
          location: "",
          notes: "",
        });
      }
    }, 500);
  };

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Recycle className="h-8 w-8 text-eco-500" />
        Waste Data Entry
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>
            Enter details about the waste collection for processing and reporting.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collectionDate">Collection Date</Label>
                <Input
                  id="collectionDate"
                  name="collectionDate"
                  type="date"
                  value={formData.collectionDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wasteType">Waste Type</Label>
                <Select 
                  value={formData.wasteType} 
                  onValueChange={(value) => handleSelectChange("wasteType", value)}
                >
                  <SelectTrigger id="wasteType">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    {wasteTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Collection Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional information about this collection..."
                rows={4}
              />
            </div>
            
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Submitting data...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? "Submitting..." : "Save Data"}
              {!isSubmitting && <Save className="h-4 w-4" />}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-6 flex justify-end">
        <Button variant="link" className="gap-1">
          Go to Tasks <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataEntry;
