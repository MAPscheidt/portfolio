export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  aboutMe: string;
  expandedBio: string[];
  competencies: string[];
  projects: Project[];
}

export function parseReadme(rawMarkdown: string): PortfolioData {
  const data: PortfolioData = {
    name: 'MATHEUS',
    role: '> SYS_ROLE: CREATIVE FULL-STACK ENGINEER // 3D SPECIALIST',
    location: 'GOLD COAST // AUS',
    aboutMe: '',
    expandedBio: [],
    competencies: [],
    projects: []
  };

  // 1. Extract Header Info (Name, Role, Location)
  const nameMatch = rawMarkdown.match(/^#\s+(.+)$/m);
  if (nameMatch) data.name = nameMatch[1].trim().toUpperCase();

  const blockquoteMatches = [...rawMarkdown.matchAll(/^>\s+(.+)$/gm)];
  if (blockquoteMatches.length >= 2) {
    data.role = `> SYS_ROLE: ${blockquoteMatches[0][1].trim()}`;
    data.location = blockquoteMatches[1][1].trim();
  }

  // Helper to extract content between two headings
  const extractSection = (heading: string, nextHeading?: string) => {
    const startRegex = new RegExp(`^##\\s+${heading}\\s*$`, 'm');
    const startMatch = rawMarkdown.match(startRegex);
    if (!startMatch) return '';
    
    const startIndex = startMatch.index! + startMatch[0].length;
    let endIndex = rawMarkdown.length;
    
    if (nextHeading) {
      const endRegex = new RegExp(`^##\\s+${nextHeading}\\s*$`, 'm');
      const endMatch = rawMarkdown.substring(startIndex).match(endRegex);
      if (endMatch) {
        endIndex = startIndex + endMatch.index!;
      }
    }
    
    return rawMarkdown.substring(startIndex, endIndex).trim();
  };

  // 2. Extract About Me
  data.aboutMe = extractSection('About Me', 'Expanded Bio');

  // 3. Extract Expanded Bio
  const expandedBioText = extractSection('Expanded Bio', 'Core Competencies');
  data.expandedBio = expandedBioText
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  // 4. Extract Core Competencies
  const competenciesText = extractSection('Core Competencies', 'Projects');
  data.competencies = competenciesText
    .split('\n')
    .map(line => line.replace(/^-\s+/, '').trim())
    .filter(line => line.length > 0 && !line.startsWith('##'));

  // 5. Extract Projects
  const projectsText = extractSection('Projects');
  if (projectsText) {
    const projectBlocks = projectsText.split('### ').filter(p => p.trim().length > 0);
    
    data.projects = projectBlocks.map(block => {
      const lines = block.trim().split('\n');
      const title = lines[0].trim();
      
      let description = '';
      let technologies: string[] = [];
      let link = '';
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.match(/^[\*_\\]*Technologies:/)) {
          const techString = line.replace(/^[\*_\\]*Technologies:\s*/, '').replace(/[\*_\\]*$/, '');
          technologies = techString.split(',').map(t => t.trim());
        } else if (line.match(/^[\*_\\]*Link:/)) {
          link = line.replace(/^[\*_\\]*Link:\s*/, '').replace(/[\*_\\]*$/, '');
        } else if (line.length > 0) {
          description += (description.length > 0 ? ' ' : '') + line;
        }
      }
      
      return {
        title,
        description,
        technologies,
        link
      };
    });
  }

  return data;
}
