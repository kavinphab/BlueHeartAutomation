interface Tab {
  name: string;
  link: string;
  icon: JSX.Element;
}

interface Collapsible {
  expand: boolean;
  tabs: Tab[];
}

export type Tabs = Record<string, Collapsible>;
