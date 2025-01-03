/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { useEffect, useState } from 'react';

import { Button, TextArea } from '@ui';
import { toast } from 'sonner';

interface FeedbackWidgetProps {
  feedback: string;
  onClose: () => void;
  setFeedback: (value: string) => void;
}

const FeedbackWidget = ({ feedback, onClose, setFeedback }: FeedbackWidgetProps) => {
  const FEEDBACK_STORAGE_KEY = 'feedback_content';

  const [isSending, setSending] = useState(false);

  useEffect(() => {
    const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (storedFeedback) {
      setFeedback(storedFeedback);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, feedback);
  }, [feedback]);

  const clearFeedback = () => {
    setFeedback('');
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  };

  const sendFeedback = async () => {
    if (feedback.length === 0) {
      return toast.error('Please include a message in your feedback.');
    } else if (feedback.length > 0) {
      setSending(true);

      console.error(feedback);
    }

    setSending(false);
  };

  return (
    <div className="text-area-text-sm">
      <TextArea
        className="w-80 p-3"
        size="small"
        placeholder="Une question, un bug, une suggestion ?"
        rows={5}
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
      />
      <div className="w-full h-px bg-border" />
      <div className="w-80 space-y-3 px-3 py-2 pb-4">
        <div className="flex justify-between space-x-2">
          <Button
            type="default"
            onClick={() => {
              clearFeedback();
              onClose();
            }}>
            Fermer
          </Button>
          <div className="flex items-center space-x-2">
            <Button type="default" onClick={clearFeedback}>
              Effacer
            </Button>

            <Button
              className="text-white"
              disabled={isSending}
              loading={isSending}
              onClick={sendFeedback}>
              Envoyer
            </Button>
          </div>
        </div>
        <p className="text-xs text-foreground-light">
          Ce formulaire vous permet de contacter directement les développeurs de l'application.
        </p>
      </div>
    </div>
  );
};

export default FeedbackWidget;
