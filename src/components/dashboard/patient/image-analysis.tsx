'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  analyzeDentalImage,
  type AnalyzeDentalImageOutput,
} from '@/ai/flows/analyze-dental-image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ImageAnalysis() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeDentalImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnalysisResult(null);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image before analyzing.',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeDentalImage({ photoDataUri: imagePreview });
      setAnalysisResult(result);
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.9) return 'text-green-600';
    if (confidence > 0.75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            New AI Assessment
        </CardTitle>
        <CardDescription>
          Upload a clear picture of your teeth or gums for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="space-y-2">
          <Label htmlFor="picture">Dental Image</Label>
          <div className="relative">
            {!imagePreview && (
              <div
                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="absolute pointer-events-none opacity-10">
                  <svg viewBox="0 0 100 60" className="w-48 h-auto text-foreground">
                      <path d="M 10,30 C 20,55 80,55 90,30" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M 10,30 C 20,5 80,5 90,30" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-center z-10 p-4">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    Ensure your image is clear and well-lit.
                  </p>
                </div>
              </div>
            )}
            <Input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="relative group">
                <Image
                  src={imagePreview}
                  alt="Teeth preview"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover aspect-video w-full"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="space-y-2 pt-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {analysisResult && !isLoading && (
          <div className="space-y-4 rounded-lg border bg-card p-4 animate-in fade-in-50">
            <h3 className="font-semibold text-lg font-headline">Analysis Result</h3>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Diagnosis</p>
              <p className="text-xl font-bold text-primary">
                {analysisResult.diagnosis}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Confidence</p>
              <div className="flex items-center gap-2">
                <Progress value={analysisResult.confidence * 100} className="w-full" />
                <span
                  className={`font-semibold text-lg ${getConfidenceColor(
                    analysisResult.confidence
                  )}`}
                >
                  {(analysisResult.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-sm">{analysisResult.description}</p>
            </div>
          </div>
        )}
        {!analysisResult && !isLoading && imagePreview && (
          <Alert>
            <AlertCircle />
            <AlertTitle>Ready to Analyze</AlertTitle>
            <AlertDescription>
              Click the "Analyze Image" button below to get your AI-powered assessment.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAnalyzeClick}
          disabled={!imagePreview || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles />
          )}
          {isLoading ? 'Analyzing...' : 'Analyze Image'}
        </Button>
      </CardFooter>
    </Card>
  );
}
