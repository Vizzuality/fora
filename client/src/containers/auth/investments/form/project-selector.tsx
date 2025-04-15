import { useState } from 'react';

import { Check, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useInvestmentForm } from '@/containers/auth/investments/form/index';
import { useProjects } from '@/hooks/projects';
import { cn } from '@/lib/utils';

export function ProjectSelector() {
  const form = useInvestmentForm();
  const { project_id: projectId } = form.getState().values;
  const [open, setOpen] = useState(false);

  const { data: projects } = useProjects(
    {},
    {
      select: ({ data }) =>
        data.map((project) => ({
          label: project.name,
          value: project.id,
        })),
    },
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-full justify-between border-none bg-transparent pl-0 text-2.5xl shadow-none hover:bg-transparent"
        >
          {projectId ? (
            <span className="truncate">
              {projects.find((project) => project.value === projectId)?.label}
            </span>
          ) : (
            'Select a project...'
          )}
          <ChevronDown className="ml-2 h-8 w-8 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[325px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search by project name" />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.label}
                  onSelect={() => {
                    form.change('project_id', project.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      projectId === project.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {project.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
