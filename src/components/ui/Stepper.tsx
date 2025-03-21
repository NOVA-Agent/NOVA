import React from 'react';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dots' | 'circles' | 'numbers';
  size?: 'sm' | 'md' | 'lg';
  onStepClick?: (index: number) => void;
  showLabels?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  onStepClick,
  showLabels = true,
  className = ''
}) => {
  // Size configuration
  const sizeConfig = {
    sm: {
      icon: 'w-5 h-5',
      dot: 'w-2 h-2',
      circle: 'w-6 h-6 text-xs',
      number: 'w-6 h-6 text-xs',
      line: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
      text: 'text-xs'
    },
    md: {
      icon: 'w-6 h-6',
      dot: 'w-3 h-3',
      circle: 'w-8 h-8 text-sm',
      number: 'w-8 h-8 text-sm',
      line: orientation === 'horizontal' ? 'h-1' : 'w-1',
      text: 'text-sm'
    },
    lg: {
      icon: 'w-8 h-8',
      dot: 'w-4 h-4',
      circle: 'w-10 h-10 text-base',
      number: 'w-10 h-10 text-base',
      line: orientation === 'horizontal' ? 'h-1' : 'w-1',
      text: 'text-base'
    }
  };

  // Step status styles
  const getStepStyles = (stepIndex: number) => {
    if (stepIndex < activeStep) {
      return 'text-primary-500 border-primary-500'; // Completed
    } else if (stepIndex === activeStep) {
      return 'text-white border-white'; // Current
    } else {
      return 'text-gray-500 border-gray-500'; // Pending
    }
  };

  // Connector line status styles
  const getConnectorStyles = (stepIndex: number) => {
    if (stepIndex < activeStep) {
      return 'bg-primary-500'; // Completed
    } else {
      return 'bg-gray-500'; // Pending or current
    }
  };

  // Render step indicator (icon/dot/circle/number)
  const renderStepIndicator = (step: Step, index: number) => {
    const stepStyles = getStepStyles(index);
    
    switch (variant) {
      case 'dots':
        return (
          <div className={`${sizeConfig[size].dot} rounded-full ${stepStyles.replace('border-', 'bg-')}`}></div>
        );
      case 'circles':
        return (
          <div className={`${sizeConfig[size].circle} flex items-center justify-center rounded-full border-2 ${stepStyles}`}>
            {index < activeStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{step.icon}</span>
            )}
          </div>
        );
      case 'numbers':
        return (
          <div className={`${sizeConfig[size].number} flex items-center justify-center rounded-full border-2 ${stepStyles}`}>
            {index < activeStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        );
      default: // default uses icon or number
        return (
          <div className={`${sizeConfig[size].icon} flex items-center justify-center rounded-full ${stepStyles}`}>
            {step.icon ? (
              <span>{step.icon}</span>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        );
    }
  };

  return (
    <div
      className={`
        flex 
        ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} 
        ${className}
      `}
    >
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`
            flex 
            ${orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row items-start'} 
            ${index === 0 ? '' : orientation === 'horizontal' ? 'flex-1' : ''}
          `}
        >
          <div 
            className={`
              flex 
              ${orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row items-center'}
              ${onStepClick ? 'cursor-pointer' : ''}
            `}
            onClick={() => onStepClick && onStepClick(index)}
          >
            {/* Step indicator */}
            {renderStepIndicator(step, index)}
            
            {/* Label and description */}
            {showLabels && (
              <div className={`
                ${orientation === 'horizontal' ? 'mt-2 text-center' : 'ml-3'}
              `}>
                <div className={`font-medium ${getStepStyles(index)} ${sizeConfig[size].text}`}>
                  {step.label}
                  {step.optional && <span className="text-gray-400 ml-1">(Optional)</span>}
                </div>
                {step.description && (
                  <div className={`text-gray-400 ${sizeConfig[size].text}`}>
                    {step.description}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div 
              className={`
                ${orientation === 'horizontal' ? 'w-full my-4' : 'h-full mx-4 my-2'}
                ${orientation === 'horizontal' ? 'flex-1' : 'flex-none'}
                ${sizeConfig[size].line}
                ${getConnectorStyles(index)}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper; 