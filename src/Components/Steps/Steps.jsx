import React from 'react';
import useSteps from '../../hooks/useSteps';

const Steps = () => {
    const [stp] = useSteps()
    const stps = stp?.find(s => s?.status === 'pending' || 'success')
    console.log(stps);
    return (
        <div className='flex items-center justify-around'>
            <div className='flex items-center'>
                <img className='w-28' src="/images.jpg" alt="" />
                {/* <h3 className='text-3xl font-semibold'>Crazy Shop</h3> */}
            </div>
            <div>
                <ul className="steps gap-4">
                    <li data-content="✓" className="step step-accent">Shop</li>
                    <li data-content={stps?.status === 'pending' || stps?.status === 'success' ? "✓" : "✕"} className={stps?.status === 'pending' || stps?.status === 'success' ? "step step-accent" : "step"}>Shipping</li>

                    <li data-content={stps?.status === 'success' ? "✓" : "✕"} className={stps?.status === 'success' ? "step step-accent" : "step"}>Payment</li>
                    {/* <li data-content="✕" className="step"></li> */}
                </ul>
            </div>
        </div>
    );
};

export default Steps;