import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentViewer() {
  const [location] = useLocation();
  const [documentPath, setDocumentPath] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const path = params.get("path");
    if (path) {
      setDocumentPath(`/documents/${path}`);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] p-4">
      <div className="container mx-auto">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="bg-white/50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        {documentPath && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-120px)]">
            <iframe
              src={documentPath}
              className="w-full h-full"
              title="Document Viewer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
