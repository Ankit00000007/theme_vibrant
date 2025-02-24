import { Facebook, Twitter, Mail, Youtube, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const policyFiles = [
    { display: "Buy Back Policy", file: "BUY BACK POLICY.pdf" },
    { display: "Cooling Off Policy", file: "COOLING OFF POLICY.pdf" },
    { display: "Direct Seller Contract", file: "DIRECT SELLER CONTRACT.pdf" },
    { display: "Grievance Redressal", file: "GRIEVANCE REDRESSAL.pdf" },
    { display: "Privacy Policy", file: "PRIVACY POLICY.pdf" },
    { display: "Shipping Policy", file: "SHIPPING POLICY.pdf" },
    { display: "Website Disclaimer", file: "WEBSITE DISCLAIMER - .pdf" },
    { display: "Website Terms of Use", file: "WEBSITE TERMS OF USE.pdf" }
  ];

  return (
    <footer className="bg-gradient-to-r from-[#7fffd4] to-[#98fb98] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Company</h2>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-700 hover:text-emerald-700">Home</Link>
              <Link href="/about" className="block text-gray-700 hover:text-emerald-700">About</Link>
              <Link href="/science" className="block text-gray-700 hover:text-emerald-700">Science</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-emerald-700">Contact Us</Link>
              <Link href="/grievance" className="block text-gray-700 hover:text-emerald-700">Grievance cell</Link>
              <Link href="/documents" className="block text-gray-700 hover:text-emerald-700">Company Documents</Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Policy</h2>
            <div className="space-y-2">
              {policyFiles.map(({ display, file }) => (
                <Link 
                  key={file}
                  href={`/document-viewer?path=${encodeURIComponent(file)}`}
                  className="block text-gray-700 hover:text-emerald-700"
                >
                  {display}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Office</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-medium mb-2">Registered Office:</h3>
                <p className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-emerald-600" />
                  <span>
                    10th Floor NESCO IT Park , Tower4,C Wing, Western Express Highway
                    ,Goregaon(E),Dindoshi - Mumbai,Maharashtra,India-400063
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Product Office:</h3>
                <p className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-emerald-600" />
                  <span>
                    No 66, 3rd cross , Kirsna colony
                    Singanalor 641005
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Media</h2>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-[#98fb98]/20 p-2 rounded-full hover:bg-[#98fb98]/30 transition-colors text-gray-700"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-[#98fb98]/20 p-2 rounded-full hover:bg-[#98fb98]/30 transition-colors text-gray-700"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-[#98fb98]/20 p-2 rounded-full hover:bg-[#98fb98]/30 transition-colors text-gray-700"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://vibrant-science.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#98fb98]/20 p-2 rounded-full hover:bg-[#98fb98]/30 transition-colors text-gray-700"
                aria-label="Website"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-emerald-200" />

        <div className="text-center text-gray-700 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Vibrant Health Science. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}