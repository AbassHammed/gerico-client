/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useState } from 'react';

import { useRemindLeaveRequest } from '@/hooks/useFetchLeave';
import {
  Button,
  Input,
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
} from '@ui';
import { Search, Send } from 'lucide-react';
import { toast } from 'sonner';

import UsersView from './UsersView';

const UsersTable = () => {
  const [searchString, setSearchString] = useState('');
  const { remindLeave, loading } = useRemindLeaveRequest();

  return (
    <ScaffoldContainerLegacy>
      <ScaffoldFilterAndContent>
        <ScaffoldActionsContainer className="justify-between">
          <Input
            icon={<Search size={12} />}
            size="small"
            value={searchString}
            onChange={(e: any) => setSearchString(e.target.value)}
            name="email"
            id="email"
            placeholder="Filtrer par email"
          />
          <Button
            icon={<Send />}
            type={'default'}
            size={'tiny'}
            disabled={loading}
            onClick={async () => {
              try {
                const message = await remindLeave();
                toast.success(message);
              } catch (error: any) {
                toast.error(error.message);
              }
            }}>
            Envoi rappel de congés
          </Button>
        </ScaffoldActionsContainer>
        <ScaffoldSectionContent className="w-full">
          <UsersView searchString={searchString} />
        </ScaffoldSectionContent>
      </ScaffoldFilterAndContent>
    </ScaffoldContainerLegacy>
  );
};

export default UsersTable;
