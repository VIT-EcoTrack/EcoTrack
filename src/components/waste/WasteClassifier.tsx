import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload } from 'lucide-react';
import wasteService from '@/services/waste.service';

const WasteClassifier = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    classification: string;
    confidence: number;
    insights: string;
  } | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleClassify = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const result = await wasteService.classifyWaste(selectedImage);
      setResult(result);
      toast({
        title: 'Success',
        description: 'Waste classification completed successfully!'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>AI Waste Classification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Waste Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="cursor-pointer"
          />
        </div>

        {previewUrl && (
          <div className="relative aspect-video w-full max-h-[400px] overflow-hidden rounded-lg border">
            <img
              src={previewUrl}
              alt="Selected waste"
              className="object-contain w-full h-full"
            />
          </div>
        )}

        <Button
          onClick={handleClassify}
          disabled={!selectedImage || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Classifying...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Classify Waste
            </>
          )}
        </Button>

        {result && (
          <div className="space-y-4 mt-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Classification Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {result.classification}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Confidence: {(result.confidence * 100).toFixed(2)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Management Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">
                    {result.insights}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WasteClassifier;
