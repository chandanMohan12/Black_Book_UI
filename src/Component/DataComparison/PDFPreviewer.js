import React from "react";
import { Worker, Viewer, SpecialZoomLevel  } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFPreviewer = () => {
  const renderToolbar = (Toolbar) => (
    <Toolbar>
      {(slots) => {
        const {
          CurrentPageInput,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              background: '#625F5C',
              padding: '8px 12px',
              borderRadius: '8px 8px 0 0',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ZoomOut />
              <Zoom />
              <ZoomIn />
              <ShowSearchPopover />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 4, padding: '4px 4px' }}>
              <GoToPreviousPage  />
              <CurrentPageInput />
              <span style={{ padding: '0 4px' }}>/</span>
              <NumberOfPages />
              <GoToNextPage />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: () => [],
  });

  const pdfFileUrl = 'https://bbnewcarui.s3.ap-south-1.amazonaws.com/2025-s-class-sedan-order-guide-en_us.pdf';

  return (
    <div style={{ height: "95%", borderRadius: 16 }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          theme="dark"
          fileUrl={pdfFileUrl}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={SpecialZoomLevel.PageWidth}
        />
      </Worker>
    </div>
  );
};

export default PDFPreviewer;
