import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  Info,
  Send,
  Sparkles,
  AlertCircle,
  Check,
} from "lucide-react";

interface WasteAnalysisResult {
  class: string;
  confidence: number;
  filename: string;
  probabilities: {
    [key: string]: number;
  };
  waste_management_insights: string;
}

const AIWasteRecognition = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [analyzeStatus, setAnalyzeStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<WasteAnalysisResult | null>(null);
  
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
        setAnalyzeStatus("idle");
        setAnalysisResults(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalyzeStatus("analyzing");
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze waste');
      }

      const result: WasteAnalysisResult = await response.json();
      setAnalysisResults(result);
      setAnalyzeStatus("complete");
    } catch (error) {
      console.error('Error analyzing waste:', error);
      setAnalyzeStatus("idle");
    }
  };
  
  const resetAnalysis = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setAnalyzeStatus("idle");
    setAnalysisResults(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Waste Recognition</h2>
        <p className="text-muted-foreground">
          Upload images of waste materials for automatic categorization and recycling recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Tool</CardTitle>
            <CardDescription>
              Upload an image of waste for AI-powered analysis and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="upload" className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </TabsTrigger>
                <TabsTrigger value="camera" className="flex-1">
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full cursor-pointer"
                  >
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-h-48 object-contain"
                        />
                      ) : (
                        <>
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                  {previewImage && (
                    <div className="flex gap-2">
                      <Button onClick={resetAnalysis} variant="outline">
                        Clear
                      </Button>
                      <Button onClick={handleAnalyze} disabled={analyzeStatus === "analyzing"}>
                        {analyzeStatus === "analyzing" ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Analyze
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="camera" className="mt-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-muted-foreground">Camera functionality coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {analysisResults && analyzeStatus === "complete" && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-powered waste classification and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Classification</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-xl font-bold">{analysisResults.class}</span>
                  <span className="text-sm text-muted-foreground">
                    ({analysisResults.confidence.toFixed(1)}% confidence)
                  </span>
                </div>

                <h3 className="font-semibold mb-2">Material Composition</h3>
                <div className="space-y-3">
                  {Object.entries(analysisResults.probabilities)
                    .filter(([_, value]) => value > 0)
                    .sort(([, a], [, b]) => b - a)
                    .map(([material, probability]) => (
                      <div key={material}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{material}</span>
                          <span>{probability.toFixed(1)}%</span>
                        </div>
                        <Progress value={probability} className="h-2" />
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Waste Management Insights
                </h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  {analysisResults.waste_management_insights.split('\n').map((line, index) => (
                    <p key={index} className="whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIWasteRecognition;
