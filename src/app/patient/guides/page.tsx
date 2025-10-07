import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HealthGuidesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Dental Health Guides</h2>
        <p className="text-muted-foreground">
          Information and tips for maintaining excellent oral hygiene.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Hygiene Library</CardTitle>
            <CardDescription>Click on a topic to learn more.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Proper Brushing Technique</AccordionTrigger>
                <AccordionContent>
                Use a soft-bristled brush and fluoride toothpaste. Angle the brush at 45 degrees to the gumline. Use gentle, short strokes. Brush for at least two minutes, twice a day. Don't forget to brush your tongue to remove bacteria.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>The Importance of Flossing</AccordionTrigger>
                <AccordionContent>
                Flossing removes plaque and food particles from between your teeth and under the gumline, areas your toothbrush can't reach. Aim to floss at least once a day to prevent cavities and gum disease.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Diet for Healthy Teeth</AccordionTrigger>
                <AccordionContent>
                Limit sugary foods and drinks, as sugar feeds the bacteria that cause tooth decay. Eat a balanced diet rich in fruits, vegetables, and calcium-rich foods like milk and cheese. Drink plenty of water to help rinse away food particles.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Understanding Gum Disease</AccordionTrigger>
                <AccordionContent>
                Gum disease, or gingivitis, is inflammation of the gums. Symptoms include red, swollen, and bleeding gums. It's often caused by plaque buildup and can be reversed with good oral hygiene and professional cleanings. If left untreated, it can progress to more serious periodontitis.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
