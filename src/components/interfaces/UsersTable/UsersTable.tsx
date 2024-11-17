'use client';

import { useState } from 'react';

import {
  Input,
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
} from '@ui';
import { Search } from 'lucide-react';

import UsersView from './UsersView';

const UsersTable = () => {
  const [searchString, setSearchString] = useState('');

  return (
    <ScaffoldContainerLegacy>
      <ScaffoldFilterAndContent>
        <ScaffoldActionsContainer className="justify-start">
          <Input
            icon={<Search size={12} />}
            size="small"
            value={searchString}
            onChange={(e: any) => setSearchString(e.target.value)}
            name="email"
            id="email"
            placeholder="Filter members"
          />
        </ScaffoldActionsContainer>
        <ScaffoldSectionContent className="w-full">
          <UsersView searchString={searchString} />
        </ScaffoldSectionContent>
      </ScaffoldFilterAndContent>
    </ScaffoldContainerLegacy>
  );
};

export default UsersTable;
