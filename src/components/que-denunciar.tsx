"use client";

import { useState } from "react";

import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import useIsMobile from "@/hooks/use-is-mobile";
import { Dictionary } from "@/lib/dictionary";

import QueDenunciarModal from "@/components/que-denunciar-modal";

type QueDenunciarProps = {
  dictionary: Dictionary;
};

export type Report = {
  key: string;
  title: string;
  description: string;
  arts: string;
};

const MAX_REPORTS_TO_SHOW_MOBILE = 5;
const MAX_REPORTS_TO_SHOW = 14;

export default function QueDenunciar({ dictionary }: QueDenunciarProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportListCollapsed, setReportListCollapsed] = useState(true);
  const { isMobile } = useIsMobile();

  const { menu, queDenunciar } = dictionary;
  const reports = queDenunciar ? Object.values(queDenunciar) : [];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const maxReportsToShow = isMobile
    ? MAX_REPORTS_TO_SHOW_MOBILE
    : MAX_REPORTS_TO_SHOW;

  const handleCardClick = (report: Report) => {
    setSelectedReport(report);
    setModalIsOpen(true);
  };

  return (
    <div id="whatReport">
      <div className="what-report-main w-full p-8 md:p-16 2xl:px-32 2xl:pt-32 2xl:pb-0 flex items-stretch justify-center flex-col gap-6">
        <h2 className="relative self-center mt-4 mb-8 text-xl text-center md:text-3xl sectionTitle md:mb-20">
          {menu?.whatReport}
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 mt-2 md:grid-cols-2 w-full">
          {reports
            .slice(0, reportListCollapsed ? maxReportsToShow : reports.length)
            .map((report) => (
              <button
                key={report.key}
                onClick={() => handleCardClick(report)}
                className="flex w-full flex-row justify-between bg-white shadow-md border border-stone-200 rounded-lg text-base px-4 py-2 text-left items-center md:text-lg xl:text-xg 2xl:text-[22px] hover:border-primary transition duration-300 group"
              >
                {report.title}
              </button>
            ))}
        </div>
        <button
          className="inline-flex self-center flex-col items-center justify-center w-24 mx-auto text-base md:text-lg cursor-pointer text-slate-950"
          onClick={() => setReportListCollapsed(!reportListCollapsed)}
        >
          {reportListCollapsed ? "Ver más" : "Ver menos"}
          <ChevronUpIcon
            className={`h-8 w-8 text-primary transform transition duration-500 ease-in-out ${
              reportListCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {selectedReport && (
        <QueDenunciarModal
          opened={modalIsOpen}
          report={selectedReport}
          onClose={() => setModalIsOpen(!modalIsOpen)}
          dictionary={dictionary}
        />
      )}
    </div>
  );
}
