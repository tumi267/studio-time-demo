import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SocialLinks() {
  const socials = [
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" /> },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle className="text-2xl">Follow Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {socials.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label={social.name}
            >
              {social.icon}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}