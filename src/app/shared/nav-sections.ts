export interface NavSection {
  id: string;
  label: string;
  fragment: string;
  pageRoute?: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'about', label: 'About', fragment: 'about' },
  { id: 'experience', label: 'Experience', fragment: 'experience', pageRoute: '/experience' },
  { id: 'projects', label: 'Projects', fragment: 'projects', pageRoute: '/projects' },
  { id: 'contact', label: 'Contact', fragment: 'contact' },
];
