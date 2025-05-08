import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function MapEmbed() {
  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle className="text-2xl">Find Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.041739500607!2d28.187559315029034!3d-26.195069983442036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1b6e4523a5%3A0x4ecc6b3c6d5f3b8a!2sPretoria%20City%20Hall!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}