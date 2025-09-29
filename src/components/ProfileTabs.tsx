import { useState } from 'react';
import { Star, Mail, Phone, Globe, Instagram } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Professional } from '@/types/professional';

interface ProfileTabsProps {
  professional: Professional;
}

export const ProfileTabs = ({ professional }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="services">Servizi</TabsTrigger>
        <TabsTrigger value="reviews">Recensioni</TabsTrigger>
        <TabsTrigger value="contact">Contatti</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Chi sono</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {professional.bio}
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Specializzazioni</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Esperienza</h4>
                <p className="text-muted-foreground">{professional.experience}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="services" className="space-y-4">
        {professional.services.map((service, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <div className="text-right">
                  <div className="font-bold text-primary text-lg">
                    €{service.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {service.duration}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-3">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant={service.online ? "default" : "secondary"}>
                  {service.online ? "Online" : "In presenza"}
                </Badge>
                <Button size="sm">
                  Prenota
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="reviews" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recensioni ({professional.reviewCount})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mock reviews */}
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4 mb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-medium">Marco R.</span>
                  <span className="text-sm text-muted-foreground">2 settimane fa</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Professionista eccellente, molto preparato e disponibile. 
                  Risultati visibili già dalle prime settimane!
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Informazioni di Contatto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-muted-foreground">{professional.contact.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Telefono</div>
                <div className="text-muted-foreground">{professional.contact.phone}</div>
              </div>
            </div>

            {professional.contact.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Sito Web</div>
                  <a 
                    href={professional.contact.website}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {professional.contact.website}
                  </a>
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Social Media</h4>
              <div className="flex gap-3">
                {professional.social.instagram && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={professional.social.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Indirizzo</h4>
              <p className="text-muted-foreground">{professional.contact.address}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};