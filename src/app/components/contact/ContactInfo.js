import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactInfo() {
  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle className="text-2xl">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <MapPin className="h-5 w-5 mt-0.5 text-primary" />
          <div>
            <p className="text-sm font-medium">123 Studio Street</p>
            <p className="text-sm text-muted-foreground">Creative District, CA 90210</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <Phone className="h-5 w-5 mt-0.5 text-primary" />
          <div>
            <p className="text-sm font-medium">+27 72 123 4567</p>
            <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <Mail className="h-5 w-5 mt-0.5 text-primary" />
          <div>
            <p className="text-sm font-medium">hello@studiocreative.com</p>
            <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}