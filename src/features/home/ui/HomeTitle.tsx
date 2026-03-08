type HomeTitleProps = {
  title: string;
};

export function HomeTitle({ title }: HomeTitleProps) {
  return <h2 className="text-xl font-bold mb-3!">{title}</h2>;
}
