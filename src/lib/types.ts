export interface Holiday {
  date: string;
  name: string;
  type: 'National' | 'State';
}

export interface Event {
  id: string;
  date: string;
  title: string;
  type: 'academic' | 'administrative' | 'holiday' | 'personal';
  recurring?: boolean;
  endDate?: string;
}

export interface PlannerSettings {
  theme: string;
  fonts: {
    header: string;
    body: string;
  };
  events: Event[];
  holidays: Holiday[];
}
