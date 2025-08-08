import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps?.map((step, index) => (
        <React.Fragment key={step?.id}>
          <button
            onClick={() => onStepClick?.(step?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
              step?.id === currentStep
                ? 'bg-primary text-primary-foreground'
                : step?.id < currentStep
                ? 'bg-success text-success-foreground hover:bg-success/90'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step?.id < currentStep ? 'bg-success-foreground/20' : 'bg-current/20'
            }`}>
              {step?.id < currentStep ? (
                <Icon name="Check" size={16} />
              ) : (
                <Icon name={step?.icon} size={16} />
              )}
            </div>
            <span className="text-sm font-medium hidden sm:block">{step?.name}</span>
          </button>
          
          {index < steps?.length - 1 && (
            <div className={`hidden sm:block w-8 h-0.5 ${
              step?.id < currentStep ? 'bg-success' : 'bg-border'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;