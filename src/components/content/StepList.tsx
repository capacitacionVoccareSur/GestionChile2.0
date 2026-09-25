"use client";

import { useState } from "react";
import { Step } from "@/types";
import { AlertCircle, Info, Copy, Check } from "lucide-react";

const URL_REGEX = /https?:\/\/[^\s]+/g;

function CopyableTemplate({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden w-fit min-w-[200px]">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 bg-gray-100">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Plantilla</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors"
          style={{ color: copied ? "#059669" : "#6366f1" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="px-3 py-2.5 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-mono">{text}</pre>
    </div>
  );
}

function linkify(text: string) {
  const parts = text.split(URL_REGEX);
  const urls = text.match(URL_REGEX) ?? [];
  return parts.flatMap((part, i) => [
    part,
    urls[i] ? (
      <a
        key={i}
        href={urls[i]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline break-all hover:opacity-80"
      >
        {urls[i]}
      </a>
    ) : null,
  ]);
}

interface StepListProps {
  steps: Step[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-indigo-600 mt-0.5"
            style={{ background: "#e0e7ff", boxShadow: "2px 2px 5px #a5b4fc, -2px -2px 5px #ffffff" }}>
            {index + 1}
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm">{step.title}</h3>
            {step.description && (
              <p className="text-sm text-gray-500 leading-normal">{step.description}</p>
            )}

            {step.subSteps && step.subSteps.length > 0 && (
              <ul className="flex flex-col gap-1 pl-2 mt-0.5">
                {step.subSteps.map((sub, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                    {sub}
                  </li>
                ))}
              </ul>
            )}

            {step.template && <CopyableTemplate text={step.template} />}

            {step.image && (
              <img
                src={step.image}
                alt={step.title}
                className="mt-1.5 rounded-lg border border-gray-200 max-w-full"
              />
            )}

            {(step.note || step.noteItems) && (
              <div className="mt-1 flex gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2">
                <Info size={13} className="shrink-0 text-indigo-500 mt-0.5" />
                <div className="flex flex-col gap-1">
                  {step.note && (
                    <p className="text-xs text-indigo-700 leading-normal">{linkify(step.note)}</p>
                  )}
                  {step.noteItems && (
                    <ul className="flex flex-col gap-0.5">
                      {step.noteItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-indigo-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                          <span>{linkify(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {step.warning && (
              <div className="mt-1 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <AlertCircle size={13} className="shrink-0 text-amber-500 mt-0.5" />
                <p className="text-xs text-amber-700 leading-normal">{linkify(step.warning!)}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
