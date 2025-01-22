import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface TaskCardProps {
    key: number;
    title: string;
    content: string;
}

export const TaskCard = ({ key, title, content }: TaskCardProps) => (
    <Card key={key}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );