export function LandingFooter() {
  return (
    <footer className="bg-muted py-12 md:py-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">LeaseLight</h3>
          <p className="text-sm text-muted-foreground">
            Simplifying ASC 842 lease accounting for businesses of all sizes
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Product</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                Integrations
              </a>
            </li>
            <li>
              <a href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                Roadmap
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                Guides
              </a>
            </li>
            <li>
              <a href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="/webinars" className="text-muted-foreground hover:text-foreground transition-colors">
                Webinars
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-12 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 LeaseLight, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}