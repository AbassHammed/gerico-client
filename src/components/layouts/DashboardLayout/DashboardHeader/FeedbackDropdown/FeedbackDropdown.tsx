import { useState } from 'react';

import { Button, Popover_Shadcn, PopoverContent_Shadcn, PopoverTrigger_Shadcn } from '@ui';

import FeedbackWidget from './FeedbackWidget';

const FeedbackDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  return (
    <Popover_Shadcn
      modal={false}
      open={isOpen}
      onOpenChange={e => {
        setIsOpen(e);
      }}>
      <PopoverTrigger_Shadcn asChild>
        <Button asChild onClick={() => setIsOpen(isOpen => !isOpen)} type="outline">
          <span>Feedback</span>
        </Button>
      </PopoverTrigger_Shadcn>
      <PopoverContent_Shadcn side="bottom" align="end" className="w-full p-0">
        <FeedbackWidget
          onClose={() => setIsOpen(false)}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      </PopoverContent_Shadcn>
    </Popover_Shadcn>
  );
};

export default FeedbackDropdown;
