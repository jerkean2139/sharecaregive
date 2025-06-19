import { useEffect, useState } from 'react';
import '../styles/animations.css';
import '../styles/fundraising-meter.css';

interface FundraisingMeterProps {
  currentAmount: number;
  goalAmount: number;
  communityName?: string;
  animated?: boolean;
  className?: string;
  nonprofitCount?: number;
  businessCount?: number;
}

export function FundraisingMeter({
  currentAmount,
  goalAmount,
  communityName,
  animated = true,
  className = '',
  nonprofitCount,
  businessCount
}: FundraisingMeterProps) {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const percentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  const animatedPercentage = Math.min(Math.round((animatedAmount / goalAmount) * 100), 100);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Animate the meter when it comes into view
  useEffect(() => {
    if (!animated) {
      setAnimatedAmount(currentAmount);
      return;
    }
    
    const duration = 1500; // Animation duration in ms
    const steps = 60; // Number of steps in the animation
    const stepDuration = duration / steps;
    const increment = currentAmount / steps;
    let current = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    const animate = () => {
      current += increment;
      if (current >= currentAmount) {
        setAnimatedAmount(currentAmount);
        if (timer) clearTimeout(timer);
      } else {
        setAnimatedAmount(current);
        timer = setTimeout(animate, stepDuration);
      }
    };
    
    // Start animation
    animate();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentAmount, animated]);
  
  // Determine color based on percentage
  const getColorClass = () => {
    if (percentage < 25) return 'fundraising-meter-progress-red';
    if (percentage < 50) return 'fundraising-meter-progress-orange';
    if (percentage < 75) return 'fundraising-meter-progress-yellow';
    return 'fundraising-meter-progress-green';
  };
  
  return (
    <div className={`fundraising-meter-container ${className}`}>
      <div className="flex flex-col space-y-4">
        {communityName && (
          <h3 className="fundraising-meter-label">
            {communityName} Fundraising Progress
          </h3>
        )}
        
        <div className="fundraising-meter-amount">
          {formatCurrency(animated ? animatedAmount : currentAmount)}
        </div>
        
        <div className="fundraising-meter-goal">
          Goal: {formatCurrency(goalAmount)}
        </div>
        
        <div className="fundraising-meter-track">
          <div 
            className={`fundraising-meter-progress ${getColorClass()}`}
            data-width={animated ? animatedPercentage : percentage}
          ></div>
          <div className="fundraising-meter-percentage">
            {animated ? animatedPercentage : percentage}%
          </div>
        </div>
        
        {(nonprofitCount || businessCount) && (
          <div className="fundraising-meter-stats">
            {nonprofitCount && (
              <div className="fundraising-meter-stat">
                <div className="fundraising-meter-stat-value">{nonprofitCount}</div>
                <div className="fundraising-meter-stat-label">Non-Profits</div>
              </div>
            )}
            {businessCount && (
              <div className="fundraising-meter-stat">
                <div className="fundraising-meter-stat-value">{businessCount}</div>
                <div className="fundraising-meter-stat-label">Businesses</div>
              </div>
            )}
          </div>
        )}
        
        <div className="text-sm font-medium text-[#69932f] text-right">
          {communityName ? `Supporting ${communityName} Non-Profits` : 'Supporting Local Non-Profits'}
        </div>
      </div>
    </div>
  );
}
