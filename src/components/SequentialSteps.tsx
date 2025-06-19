import { ArrowRight } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface SequentialStepsProps {
  steps: Step[];
  theme?: 'green' | 'blue';
}

export function SequentialSteps({ steps, theme = 'green' }: SequentialStepsProps) {
  const themeColors = {
    green: {
      stepBg: 'bg-[#69932f]',
      textColor: 'text-[#69932f]',
      arrowColor: 'text-[#69932f]'
    },
    blue: {
      stepBg: 'bg-[#00304f]',
      textColor: 'text-[#00304f]',
      arrowColor: 'text-[#00304f]'
    }
  };

  const { stepBg, textColor, arrowColor } = themeColors[theme];

  return (
    <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-1 flex-col items-center">
          <div className={`${stepBg} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4`}>
            {step.number}
          </div>
          <h3 className={`text-lg font-semibold ${textColor} mb-2 text-center`}>{step.title}</h3>
          <p className="text-gray-600 text-center">{step.description}</p>
          
          {/* Arrow between steps (not after the last step) */}
          {index < steps.length - 1 && (
            <div className="hidden md:flex items-center justify-center mt-4 md:mt-0 md:absolute md:transform md:translate-x-[calc(100%+1rem)] md:translate-y-6">
              <ArrowRight className={`${arrowColor} w-8 h-8`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
