'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Image as ImageIcon, Loader2, Send, Upload, User, X, Camera, CircleDot, Video, Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { liveDentalDiagnosis } from '@/ai/flows/live-dental-diagnosis';
import { liveDentalTts } from '@/ai/flows/live-dental-tts';
import { liveDentalStt } from '@/ai/flows/live-dental-stt';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


interface Message {
  role: 'user' | 'model';
  text: string;
  imagePreview?: string;
}

export default function LiveDiagnosisPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !imagePreview) return;

    const userMessage: Message = { role: 'user', text: input };
    if (imagePreview) {
      userMessage.imagePreview = imagePreview;
    }
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }

    try {
      const result = await liveDentalDiagnosis({
        question: input,
        photoDataUri: imagePreview || undefined,
      });
      setMessages((prev) => [...prev, { role: 'model', text: result.answer }]);
    } catch (error) {
      console.error('Diagnosis failed:', error);
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'The AI assistant could not respond. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings."
        });
        setIsCameraOpen(false);
      }
    } else {
        setHasCameraPermission(false);
        toast({
            variant: "destructive",
            title: "Camera Not Supported",
            description: "Your browser does not support camera access."
        });
        setIsCameraOpen(false);
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if(context) {
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/png');
            setImagePreview(dataUrl);
        }
        stopCameraStream();
        setIsCameraOpen(false);
    }
  };

  const handleOpenVideoChat = async () => {
    setIsVideoChatOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setHasCameraPermission(false);
        toast({
            variant: "destructive",
            title: "Media Access Denied",
            description: "Please enable camera and microphone permissions in your browser settings."
        });
        setIsVideoChatOpen(false);
      }
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    } else {
      startRecording();
    }
  };

  const blobToDataUri = (blob: Blob): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
      });
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        setIsLoading(true);
        try {
            const audioDataUri = await blobToDataUri(audioBlob);
            const { text: transcribedText } = await liveDentalStt({ audioDataUri });

            if(transcribedText) {
                const diagnosis = await liveDentalDiagnosis({ question: transcribedText });
                const ttsResult = await liveDentalTts(diagnosis.answer);
                
                const audioData = ttsResult.media;
                const audio = new Audio(audioData);
                audioRef.current = audio;
                
                audio.onplaying = () => setIsSpeaking(true);
                audio.onended = () => setIsSpeaking(false);
                
                audio.play();
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Speech not detected',
                    description: 'Could not understand audio. Please try again.',
                });
            }

        } catch(e) {
            console.error(e);
             toast({
                variant: 'destructive',
                title: 'An Error Occurred',
                description: 'Could not get AI response. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }

        setIsRecording(false);
         // Stop the microphone stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        variant: 'destructive',
        title: 'Recording Error',
        description: 'Could not start audio recording. Please check microphone permissions.',
      });
    }
  };


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
      return () => {
          stopCameraStream();
          mediaRecorderRef.current?.stream?.getTracks().forEach(track => track.stop());
      }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">Live AI Diagnosis</h2>
          <p className="text-muted-foreground">
            Chat with our AI assistant for instant dental analysis and advice.
          </p>
        </div>
        <Button onClick={handleOpenVideoChat}>
            <Video className="mr-2 h-4 w-4" />
            Start Live Video Chat
        </Button>
      </div>
      <Card className="flex flex-col h-[70vh]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-primary" />
            AI Dental Assistant
          </CardTitle>
          <CardDescription>
            You can ask questions or upload an image for analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  <p>Start the conversation by sending a message or uploading an image.</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn('flex items-start gap-3', {
                    'justify-end': msg.role === 'user',
                  })}
                >
                  {msg.role === 'model' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-md rounded-lg px-4 py-3',
                      msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    {msg.imagePreview && (
                      <Image
                        src={msg.imagePreview}
                        alt="Uploaded for analysis"
                        width={200}
                        height={150}
                        className="rounded-md mb-2"
                      />
                    )}
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                  <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                          <AvatarFallback><Bot /></AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-3">
                          <Loader2 className="animate-spin" />
                      </div>
                  </div>
               )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="pt-6 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-start space-x-2">
             <div className="relative">
                {imagePreview && (
                  <div className="relative group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={48}
                      height={48}
                      className="rounded-md object-cover h-10 w-12"
                    />
                     <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleRemoveImage}
                        type="button"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                 {!imagePreview && (
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                            <Upload />
                            <span className="sr-only">Upload Image</span>
                        </Button>
                         <Button type="button" variant="outline" size="icon" onClick={handleOpenCamera}>
                            <Camera />
                            <span className="sr-only">Open Camera</span>
                        </Button>
                    </div>
                 )}
                <Input
                    id="picture-chat"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or describe your symptom..."
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || (!input.trim() && !imagePreview)}>
              <Send />
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={isCameraOpen} onOpenChange={(open) => {
          if(!open) {
              stopCameraStream();
              setIsCameraOpen(false);
          }
      }}>
          <DialogContent className="max-w-2xl">
              <DialogHeader>
                  <DialogTitle>Live Camera</DialogTitle>
                  <DialogDescription>Position your teeth or gums in the frame and capture.</DialogDescription>
              </DialogHeader>
                <div className='relative'>
                    <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
                    {hasCameraPermission === false && (
                         <Alert variant="destructive" className="mt-4">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>Please enable camera access in your browser to use this feature.</AlertDescription>
                        </Alert>
                    )}
                </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => { stopCameraStream(); setIsCameraOpen(false); }}>Cancel</Button>
                  <Button onClick={handleCaptureImage} disabled={hasCameraPermission !== true}>
                    <CircleDot className="mr-2 h-4 w-4" />
                    Capture Image
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
       <Dialog open={isVideoChatOpen} onOpenChange={(open) => {
          if(!open) {
              stopCameraStream();
              setIsVideoChatOpen(false);
          }
      }}>
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
              <DialogHeader>
                  <DialogTitle>Live Video Consultation</DialogTitle>
                  <DialogDescription>You are now talking to the AI Dental Assistant.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="relative bg-muted rounded-md overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">You</div>
                </div>
                <div className="bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                        <Bot className={cn("h-16 w-16 mx-auto text-muted-foreground transition-all", isSpeaking && "text-primary scale-110")} />
                        <p className="text-muted-foreground mt-2">
                           {isRecording ? "Listening..." : (isLoading ? "Thinking..." : (isSpeaking ? "Speaking..." : "Waiting for AI Assistant..."))}
                        </p>
                    </div>
                     {isSpeaking && (
                      <div className="absolute bottom-4 left-4 right-4 h-2 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-pulse"></div>
                      </div>
                    )}
                </div>
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => { stopCameraStream(); setIsVideoChatOpen(false); }}>End Call</Button>
                  <Button onClick={handleToggleRecording} disabled={isLoading || isSpeaking} className={cn(isRecording && "bg-destructive hover:bg-destructive/90")}>
                    {isRecording ? <Square className="mr-2" /> : <Mic className="mr-2" />}
                    {isRecording ? 'Stop Conversation' : 'Start Conversation'}
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
