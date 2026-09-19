import { Step } from "@/types";
import { AlertCircle, Info } from "lucide-react";

interface StepListProps {
  steps: Step[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 ring-1 ring-indigo-200 mt-0.5">
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

            {step.image && (
              <img
                src={step.image}
                alt={step.title}
                className="mt-1.5 rounded-lg border border-gray-200 max-w-full"
              />
            )}

            {step.note && (
              <div className="mt-1 flex gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2">
                <Info size={13} className="shrink-0 text-indigo-500 mt-0.5" />
                <p className="text-xs text-indigo-700 leading-normal">{step.note}</p>
              </div>
            )}

            {step.warning && (
              <div className="mt-1 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <AlertCircle size={13} className="shrink-0 text-amber-500 mt-0.5" />
                <p className="text-xs text-amber-700 leading-normal">{step.warning}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
