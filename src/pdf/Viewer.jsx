import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdf from "../pdf/resume.pdf";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Viewer.css"; // Import your custom CSS file

const Viewer = () => {
  const totalPages = 1;
  const [pageNumber, setPageNumber] = useState(1); // Default to page 1

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const changePage = (param) => {
    if (param === "prev" && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }

    if (param === "next" && pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-screen flex justify-start items-start">
      <div className="w-full h-full">
        <div className="w-full bg-slate-100 h-full">
          <div className="bg-white h-16 py-2 px-4 flex justify-between items-center">
            <div className="font-semibold text-lg">My Resume</div>
            <div className="flex justify-center items-center gap-1">
              <IoIosArrowBack
                className="cursor-pointer"
                onClick={() => changePage("prev")}
              />
              <div className="px-3 py-1 rounded">{pageNumber}</div>
              of
              <div className="px-3 py-1 rounded">{totalPages}</div>
              <IoIosArrowForward
                className="cursor-pointer"
                onClick={() => changePage("next")}
              />
            </div>
            <div>
              <button className="bg-black text-white px-6 cursor-pointer py-2 rounded">
                Download
              </button>
            </div>
          </div>
          <div className="w-full bg-slate-100 p-4 overflow-auto flex justify-center items-start custom-scrollbar">
            <Document file={pdf}>
              <Page pageNumber={pageNumber}></Page>
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
