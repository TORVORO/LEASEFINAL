"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, FilePlus, FileUp, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileDropzone } from '@/components/lease/file-dropzone';
import { BulkUploadTable } from '@/components/lease/bulk-upload-table';

export default function ImportLeasesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedLeases, setUploadedLeases] = useState<any[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate processing
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Mock successful extraction
      const mockLeases = files.map((file, index) => ({
        id: `temp-${index}`,
        name: file.name.replace('.pdf', ''),
        extractedDate: new Date().toISOString(),
        lessor: 'Automatically Extracted Lessor',
        startDate: '2023-01-01',
        endDate: '2028-12-31',
        paymentAmount: 5000 + Math.floor(Math.random() * 5000),
        confidence: Math.floor(Math.random() * 30) + 70,
        status: 'Needs Review',
      }));
      
      setUploadedLeases(mockLeases);
      setIsUploading(false);
      
      toast({
        title: "Upload complete",
        description: `Successfully processed ${files.length} lease document${files.length > 1 ? 's' : ''}`,
      });
    }, 3000);
  };

  const handleConfirmImport = () => {
    toast({
      title: "Leases imported",
      description: `${uploadedLeases.length} leases have been imported successfully`,
    });
    
    setTimeout(() => {
      router.push('/leases');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/leases">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Import Leases</h1>
      </div>
      
      <Tabs defaultValue="pdf" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="pdf">PDF Import</TabsTrigger>
          <TabsTrigger value="csv">CSV Import</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pdf" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Lease Documents</CardTitle>
              <CardDescription>
                Upload PDF lease documents to automatically extract key terms and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {uploadedLeases.length > 0 ? (
                <BulkUploadTable 
                  leases={uploadedLeases}
                  onConfirm={handleConfirmImport}
                />
              ) : (
                <>
                  <FileDropzone
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxFiles={10}
                    files={files}
                    onFilesAdded={handleFilesAdded}
                    onRemoveFile={handleRemoveFile}
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                  />
                  
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      {files.length > 0 ? (
                        <>Selected {files.length} file{files.length !== 1 ? 's' : ''}</>
                      ) : (
                        <>No files selected</>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setFiles([])}
                        disabled={files.length === 0 || isUploading}
                      >
                        Clear All
                      </Button>
                      <Button 
                        onClick={handleUpload}
                        disabled={files.length === 0 || isUploading}
                      >
                        {isUploading ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload & Process
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>PDF Processing Features</CardTitle>
              <CardDescription>
                How our OCR technology works with your lease documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Intelligent Extraction</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes your lease documents to extract key terms, dates, and amounts
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <FilePlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Auto-Classification</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically determines lease classification according to ASC 842 standards
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Bulk Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload multiple documents at once for efficient processing of your lease portfolio
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="csv" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Import</CardTitle>
              <CardDescription>
                Import multiple leases using a CSV template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg">
                <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload a CSV file</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
                <Button disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CSV
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>CSV Format Instructions</CardTitle>
              <CardDescription>
                Guidelines for preparing your CSV import file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Required Columns</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">lease_name</span> - Descriptive name for the lease</li>
                    <li><span className="font-medium">lessor</span> - Entity you are leasing from</li>
                    <li><span className="font-medium">asset_type</span> - Type of asset (e.g., building, equipment)</li>
                    <li><span className="font-medium">start_date</span> - Format: YYYY-MM-DD</li>
                    <li><span className="font-medium">end_date</span> - Format: YYYY-MM-DD</li>
                    <li><span className="font-medium">payment_amount</span> - Numeric value</li>
                    <li><span className="font-medium">payment_frequency</span> - monthly, quarterly, annually</li>
                    <li><span className="font-medium">interest_rate</span> - Percentage (e.g., 5.25)</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Optional Columns</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">description</span> - Additional details</li>
                    <li><span className="font-medium">lease_type</span> - finance or operating</li>
                    <li><span className="font-medium">gl_asset_account</span> - GL account code</li>
                    <li><span className="font-medium">gl_liability_account</span> - GL account code</li>
                    <li><span className="font-medium">notes</span> - Any special considerations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}