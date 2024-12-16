'use client';

import React, { useState } from 'react';

import {
  AlertError,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Maximize2,
  Minus,
  Plus,
  X,
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  fileName?: string;
  filePath: string;
}

const PdfViewerModal = ({ isOpen, setOpen, fileName, filePath }: PdfViewerModalProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error while loading document:', error);
    setError('Failed to load PDF. Please check if the file exists and try again.');
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages || 1));
  }

  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-4xl h-[90vh] flex flex-col p-0 bg-white"
        hideClose={false}
        centered={true}>
        <DialogHeader className="px-4 py-2 flex flex-row items-center justify-between border-b">
          <FileText className="h-6 w-6" />
          <DialogTitle className="text-lg font-medium">{fileName || filePath}</DialogTitle>
          <div className="flex items-center space-x-2">
            <Button type={'default'} size="tiny" icon={<Maximize2 />} />

            <Button type={'default'} size="tiny" icon={<Download />} />

            <Button type={'default'} size="tiny" icon={<X />} onClick={() => setOpen(false)} />
          </div>
        </DialogHeader>
        <div className="flex-grow overflow-auto">
          {error ? (
            <AlertError error={error} subject={`Erreur lors d'affichage du pdf.`} />
          ) : (
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="flex justify-center">
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          )}
        </div>
        <DialogFooter className="px-4 py-2 border-t bg-white/80 flex items-center !justify-between">
          <div className="flex items-center space-x-2">
            <Button
              type={'default'}
              size="tiny"
              onClick={() => changePage(-1)}
              icon={<ChevronLeft />}
              disabled={pageNumber <= 1}
            />

            <span className="text-sm">
              {pageNumber} / {numPages}
            </span>
            <Button
              type={'default'}
              size="tiny"
              onClick={() => changePage(1)}
              icon={<ChevronRight />}
              disabled={pageNumber >= (numPages || 1)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button type={'default'} size="tiny" icon={<Minus />} onClick={zoomOut} />
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button type={'default'} size="tiny" icon={<Plus />} onClick={zoomIn} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
